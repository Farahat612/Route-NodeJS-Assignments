const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router()

router.post('/add', productController.addProduct)
router.get('/revenue', productController.getTotalRevenueByCategory)
router.get('/items-sold', productController.getTotalItemsSoldByProduct)

module.exports = router
