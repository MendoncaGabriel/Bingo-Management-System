const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controllers')
const authValidation = require('../middlewares/auth/authValidation.js')

router.post('/register', authValidation.Registration, authController.register)
router.post('/logIn', authValidation.Login, authController.logIn)

module.exports = router