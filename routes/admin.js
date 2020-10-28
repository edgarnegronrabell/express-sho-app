const express = require('express')


const router = express.Router()

const adminController = require('../controllers/admin')

//admin/add-product => GET
router.get('/add-product', adminController.getAddProductPage)

// /admin/products => GET
router.get('/products', adminController.getProducts)

//// /admin/add-product => POST
router.post('/add-product', adminController.postProduct)

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProductPage)

router.post('/edit-product', adminController.editProduct)

router.post('/delete-product', adminController.deleteProduct)

module.exports = router
