import express from 'express'
import auth from '../middleware/auth.js'

import Car from '../models/car.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const cars = await Car.find()
    res.json(cars)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    res.json(car)
  } catch (err) {
    res.status(404).json({ message: 'Car not found!' })
  }
})

router.post('/', auth, async (req, res) => {
  const car = new Car(req.body)

  try {
    const newCar = await car.save()
    res.status(201).json({
      message: 'Car added successfully!',
      newCar,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'model', 'rentalStatus']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' })

  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).send({ error: 'Car not found.' })

    updates.forEach((update) => (car[update] = req.body[update]))

    const updatedCar = await car.save()
    res.status(200).json({
      message: 'Car updated successfully!',
      updatedCar,
    })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).send({ error: 'Car not found.' })

    await car.remove()
    res.json({ message: 'Car deleted successfully!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
