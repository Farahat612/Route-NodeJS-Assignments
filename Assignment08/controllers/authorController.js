import Author from '../models/author.js'
import Book from '../models/book.js'

// Create a new author
export const createAuthor = async (req, res) => {
  const author = new Author(req.body)
  try {
    const newAuthor = await author.save()
    res.status(201).json(newAuthor)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Get all authors
export const getAuthors = async (req, res) => {
  try {
    res.json(res.paginatedResults.results)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get an author by ID
export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate('books').exec()
    if (!author) return res.status(404).json({ message: 'Author not found' })
    res.json(author)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update an author
export const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedAuthor)
      return res.status(404).json({ message: 'Author not found' })
    res.json(updatedAuthor)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete an author
export const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id)
    if (!deletedAuthor)
      return res.status(404).json({ message: 'Author not found' })
    await Book.deleteMany({ author: req.params.id })
    res.json({ message: 'Author and their books deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
