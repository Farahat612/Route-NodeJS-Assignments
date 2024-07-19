import dotenv from 'dotenv'
import express from 'express'

import connectDB from './config/db.js'

import bookRoutes from './routes/bookRoutes.js'
import authorRoutes from './routes/authorRoutes.js'

// Load env vars
dotenv.config()
// Connect to database
connectDB()
// Initialize express app
const app = express()
// Middleware
app.use(express.json())

// Routes
app.use('/api/books', bookRoutes)
app.use('/api/authors', authorRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
