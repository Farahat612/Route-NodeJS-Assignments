import express from 'express'
import auth from '../middleware/auth.js'

import Car from '../models/car.js'

const router = express.Router()

// Special endpoints:
// 1. Get all cars whose model is ‘Honda’ and ‘Toyota’ (using query params)
router.get('/search', async (req, res) => {
  const models = req.query.models ? req.query.models.split(',') : []
  const query = { model: { $in: models } }

  try {
    const cars = await Car.find(query)
    if (cars.length === 0) {
      return res.status(404).json({ message: 'Car not found!' })
    }
    res.status(200).send(cars)
  } catch (error) {
    res.status(500).json({ messageNew: error.message })
  }
})

// 2. Get Available Cars of a Specific Model.
router.get('/available', async (req, res) => {
  const model = req.query.model
  const query = { model: model, rentalStatus: 'available' }

  try {
    const cars = await Car.find(query)
    res.send(cars)
  } catch (error) {
    res.status(500).send(error)
  }
})

// 3. Get Cars that are Either rented or of a Specific Model
router.get('/either', async (req, res) => {
  const model = req.query.model
  const query = { $or: [{ rentalStatus: 'rented' }, { model: model }] }

  try {
    const cars = await Car.find(query)
    res.send(cars)
  } catch (error) {
    res.status(500).send(error)
  }
})

// 4. Get Available Cars of Specific Models or Rented Cars of a Specific Model
router.get('/mixed', async (req, res) => {
  const modelsAvailable = req.query.modelsAvailable
    ? req.query.modelsAvailable.split(',')
    : []
  const modelRented = req.query.modelRented

  const query = {
    $or: [
      { model: { $in: modelsAvailable }, rentalStatus: 'available' },
      { model: modelRented, rentalStatus: 'rented' },
    ],
  }

  try {
    const cars = await Car.find(query)
    res.send(cars)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
