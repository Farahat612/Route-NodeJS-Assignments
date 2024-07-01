import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Customer from '../models/customer.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body

    let customer = await Customer.findOne({ email: email })
    if (customer) return res.status(400).send('Customer already registered.')

    customer = new Customer({
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    })

    const salt = await bcrypt.genSalt(10)

    customer.password = await bcrypt.hash(customer.password, salt)

    await customer.save()

    res.status(201).send({
      message: 'Customer registered successfully.',
      customer: customer,
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(`Attempting sign-in with email: ${email}`) // Debug log

    const customer = await Customer.findOne({ email: email })
    if (!customer) {
      console.log('Customer not found') // Debug log
      return res.status(400).send('Invalid email or password.')
    }

    const validPassword = bcrypt.compare(password, customer.password)
    if (!validPassword) {
      console.log('Invalid password') // Debug log
      return res.status(400).send('Invalid email or password.')
    }

    const token = jwt.sign({ _id: customer._id }, process.env.JWT_SECRET)
    console.log('Sign-in successful') // Debug log

    res.send({ token: token })
  } catch (error) {
    console.error('Error during sign-in:', error.message) // Error log
    res.status(500).send({ error: error.message })
  }
})

router.get('/', auth, async (req, res) => {
  const customers = await Customer.find()
  res.send(customers)
})

router.get('/:id', auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id)
  if (!customer) return res.status(404).send('Customer not found.')
  res.send(customer)
})

router.patch('/:id', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'phoneNumber']

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    )
    if (!isValidOperation)
      return res.status(400).send({ error: 'Invalid updates!' })

    const salt = await bcrypt.genSalt(10)

    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send('Customer not found.')

    if (customer._id.toString() !== req.user._id) {
      return res
        .status(403)
        .send({ error: 'You do not have permission to update this user.' })
    }

    updates.forEach(async (update) => {
      customer[update] =
        update === 'password'
          ? await bcrypt.hash(req.body[update], salt)
          : req.body[update]
    })

    await customer.save()

    res.status(200).send({
      message: 'Customer updated successfully.',
      customer: customer,
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send('Customer not found.')

    if (customer._id.toString() !== req.user._id) {
      return res
        .status(403)
        .send({ error: 'You do not have permission to delete this user.' })
    }

    res.status(200).send({
      message: 'Customer deleted successfully.',
      customer: customer,
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

export default router
