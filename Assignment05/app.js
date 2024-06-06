// importing the express module and the routes for customers, products, and orders
const express = require('express')

const customerRoutes = require('./routes/customerRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

// Middleware for parsing JSON
app.use(express.json())

// connecting the routes to the app
app.use('/customers', customerRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

// setting the port and starting the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
