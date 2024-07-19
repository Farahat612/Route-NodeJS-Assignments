import express from 'express'
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js'
import Author from '../models/author.js'

import pagination from '../middleware/pagination.js'
import Book from '../models/book.js'

const router = express.Router()

const specialSearchFields = {
  author: {
    model: Author,
    searchField: 'name',
    resultField: 'author',
  },
}

router.post('/', createBook)
router.get(
  '/',
  pagination(Book, 'author', ['title'], specialSearchFields),
  getBooks
)
router.get('/:id', getBookById)
router.patch('/:id', updateBook)
router.delete('/:id', deleteBook)

export default router
