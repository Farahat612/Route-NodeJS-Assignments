import Comment from '../models/Comment.js'

export const createComment = async (req, res) => {
  const { content, postId } = req.body
  try {
    const comment = await Comment.create({
      content,
      postId,
      userId: req.user.id,
    })
    res.status(201).json({ message: 'Comment created successfully', comment })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll()
    res.status(200).json({ comments })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getComment = async (req, res) => {
  const { id } = req.params
  try {
    const comment = await Comment.findByPk(id)
    res.status(200).json({ comment })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateComment = async (req, res) => {
  const { id } = req.params
  const { content } = req.body
  try {
    const comment = await Comment.findByPk(id)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }
    await comment.update({ content })
    res.status(200).json({ message: 'Comment updated successfully', comment })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteComment = async (req, res) => {
  const { id } = req.params
  try {
    const comment = await Comment.findByPk(id)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }
    await comment.destroy()
    res.status(200).json({ message: 'Comment deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
