const express = require('express')

const router = express.Router()

const authController = require('../controllers/auth')

router.get('/login', authController.getLoginPage)

router.post('/login', authController.postLogin)

router.get('/signup', authController.getSignupPage)

router.post('/signup', authController.postSignup)

router.get('/reset', authController.getResetPasswordPage)

router.post('/reset', authController.postResetPassword)

module.exports = router
