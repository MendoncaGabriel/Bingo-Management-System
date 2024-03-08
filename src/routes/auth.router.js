const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controllers')
const userValidationForRegistration = require('../middlewares/auth/userValidationForRegistration.js')

//middlewares
router.use(userValidationForRegistration)


router.post('/register', authController.register)


module.exports = router