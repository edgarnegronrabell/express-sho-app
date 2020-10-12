const express = require('express')


const router = express.Router()

const productsController = require('../controllers/products')

router.get('/add-product', productsController.getAddProductPage)

router.post('/add-product', productsController.postProduct)

module.exports = router
