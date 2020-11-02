const express = require('express')


const router = express.Router()

const adminController = require('../controllers/admin')
const isAuth = require('../middlware/is-auth')

//admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProductPage)

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts)

//// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postProduct)

// /admin/edit-product => GET
router.get('/edit-product/:productId', isAuth, adminController.getEditProductPage)

router.post('/edit-product', isAuth, adminController.editProduct)

router.post('/delete-product', adminController.deleteProduct)

module.exports = router
