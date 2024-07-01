import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()

app.use(express.json())

dotenv.config()

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err)
  })

export default app
