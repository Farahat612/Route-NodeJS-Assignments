import Book from '../models/book.js'

// Create a new book
export const createBook = async (req, res) => {
  const book = new Book(req.body)
  try {
    const newBook = await book.save()
    res.status(201).json(newBook)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author').exec()
    res.json(books)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get a book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author').exec()
    if (!book) return res.status(404).json({ message: 'Book not found' })
    res.json(book)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update a book
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' })
    res.json(updatedBook)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id)
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' })
    res.json({ message: 'Book deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
