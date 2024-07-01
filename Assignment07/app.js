import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import carRouter from './routes/car.js'
import customerRouter from './routes/customer.js'
import rentalRouter from './routes/rental.js'

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

app.use('/api/customers', customerRouter)
app.use('/api/cars', carRouter)
app.use('/api/rentals', rentalRouter)

export default app
