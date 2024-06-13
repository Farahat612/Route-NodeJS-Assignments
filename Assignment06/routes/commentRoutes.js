import express from 'express'
import {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/create', authMiddleware, createComment)
router.get('/', getComments)
router.get('/:id', getComment)
router.put('/:id', authMiddleware, updateComment)
router.delete('/:id', authMiddleware, deleteComment)

export default router
