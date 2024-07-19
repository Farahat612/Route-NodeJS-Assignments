import express from 'express'
import {
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  updateAuthor,
} from '../controllers/authorController.js'

const router = express.Router()

router.post('/', createAuthor)
router.get('/', getAuthors)
router.get('/:id', getAuthorById)
router.patch('/:id', updateAuthor)
router.delete('/:id', deleteAuthor)

export default router
