import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Post from '../models/Post.js'
import Comment from '../models/Comment.js'

export const register = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    res.status(201).json({ message: 'User registered successfully', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' })
}

export const getUserWithPostAndComments = async (req, res) => {
  const { userId, postId } = req.params
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Post,
        as: 'posts',
        where: { id: postId },
        include: [{ model: Comment, as: 'comments' }],
      },
    })
    if (!user) {
      return res.status(404).json({ message: 'User or Post not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
