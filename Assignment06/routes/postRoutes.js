import express from 'express'
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostWithAuthor,
} from '../controllers/postController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/create', authMiddleware, createPost)
router.get('/', getPosts)
router.get('/:id', getPostById)
router.put('/:id', authMiddleware, updatePost)
router.delete('/:id', authMiddleware, deletePost)
router.get('/:postId/author', getPostWithAuthor)

export default router
