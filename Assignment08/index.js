import dotenv from 'dotenv'
import express from 'express'

import connectDB from './config/db.js'

// Load env vars
dotenv.config()
// Connect to database
connectDB()
// Initialize express app
const app = express()
// Middleware
app.use(express.json())

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
