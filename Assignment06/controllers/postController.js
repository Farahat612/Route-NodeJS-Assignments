import Post from '../models/Post.js'

export const createPost = async (req, res) => {
  const { title, content } = req.body
  try {
    const post = await Post.create({ title, content, authorId: req.user.id })
    res.status(201).json({ message: 'Post created successfully', post })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll()
    res.status(200).json({ posts })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPostById = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findByPk(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json({ post })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  try {
    const post = await Post.findByPk(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    await post.update({ title, content })
    res.status(200).json({ message: 'Post updated successfully', post })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findByPk(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    await post.destroy()
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPostWithAuthor = async (req, res) => {
  const { postId } = req.params
  try {
    const post = await Post.findByPk(postId, {
      include: { model: User, as: 'author' },
    })
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
