import express from 'express'
import {
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  updateAuthor,
} from '../controllers/authorController.js'

import pagination from '../middleware/pagination.js'
import Author from '../models/author.js'

const router = express.Router()

router.post('/', createAuthor)
router.get('/', pagination(Author, 'books'), getAuthors)
router.get('/:id', getAuthorById)
router.patch('/:id', updateAuthor)
router.delete('/:id', deleteAuthor)

export default router
