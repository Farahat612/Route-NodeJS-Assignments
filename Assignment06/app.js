import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import sequelize from './config/config.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)

const PORT = process.env.PORT || 5000

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
})
