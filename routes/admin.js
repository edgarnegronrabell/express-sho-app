const express = require('express')


const router = express.Router()

const adminController = require('../controllers/admin')

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProductPage)

// /admin/products => GET
router.get('/products', adminController.getProducts)

// /admin/add-product => POST
router.post('/add-product', adminController.postProduct)

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProductPage)

router.get('/edit-product', adminController.editProduct)

module.exports = router
