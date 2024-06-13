import express from 'express'
import {
  register,
  login,
  logout,
  getUserWithPostAndComments,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/:userId/posts/:postId', getUserWithPostAndComments)

export default router
