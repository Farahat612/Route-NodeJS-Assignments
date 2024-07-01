import express from 'express'
import auth from '../middleware/auth.js'

import Car from '../models/car.js'
import Customer from '../models/customer.js'
import Rental from '../models/rental.js'

const router = express.Router()

router.post('/', auth, async (req, res) => {
  const { car, customer, rentalDate, returnDate } = req.body

  try {
    const carToRent = await Car.findById(car)
    if (carToRent.rentalStatus === 'rented') {
      return res.status(400).send({ error: 'Car is already rented.' })
    }

    const rental = new Rental({ car, customer, rentalDate, returnDate })
    await rental.save()

    carToRent.rentalStatus = 'rented'
    await carToRent.save()

    res.status(201).json({
      message: 'Rental added successfully!',
      rental,
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/:id', auth, async (req, res) => {
  const rental = await Rental.findById(req.params.id)
  if (!rental) return res.status(404).send({ error: 'Rental not found.' })
  res.send(rental)
})

router.get('/', auth, async (req, res) => {
  const rentals = await Rental.find().populate('car customer')
  res.send(rentals)
})

router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['rentalDate', 'returnDate']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' })

  try {
    const rental = await Rental.findById(req.params.id)
    if (!rental) return res.status(404).send({ error: 'Rental not found.' })

    updates.forEach((update) => (rental[update] = req.body[update]))
    await rental.save()

    res.status(200).json({
      message: 'Rental updated successfully!',
      rental,
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id)
    if (!rental) return res.status(404).send({ error: 'Rental not found.' })

    const car = await Car.findById(rental.car)
    car.rentalStatus = 'available'
    await car.save()

    res.status(200).json({
      message: 'Rental deleted successfully!',
      rental,
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
