import express from 'express'
import auth from '../middleware/auth.js'

import Car from '../models/car.js'
import Customer from '../models/customer.js'

const router = express.Router()

export default router
