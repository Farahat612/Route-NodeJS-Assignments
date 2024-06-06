const express = require('express')
const orderController = require('../controllers/orderController')

const router = express.Router()

router.post('/create', orderController.createOrder)
router.get('/average-value', orderController.getAverageOrderValue)
router.get('/no-orders', orderController.getCustomersWithNoOrders)
router.get('/most-items', orderController.getCustomerWithMostItems)
router.get('/top-spending', orderController.getTopCustomersBySpending)
router.get(
  '/at-least-five-orders',
  orderController.getCustomersWithAtLeastFiveOrders
)
router.get(
  '/repeat-customers-percentage',
  orderController.getPercentageOfRepeatCustomers
)
router.get('/earliest-order', orderController.getCustomerWithEarliestOrder)

module.exports = router
