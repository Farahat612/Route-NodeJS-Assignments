import express from 'express'
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js'

import pagination from '../middleware/pagination.js'
import Book from '../models/book.js'

const router = express.Router()

router.post('/', createBook)
router.get('/', pagination(Book, 'author'), getBooks)
router.get('/:id', getBookById)
router.patch('/:id', updateBook)
router.delete('/:id', deleteBook)

export default router
