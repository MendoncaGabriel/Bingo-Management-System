const express = require('express')
const router = express.Router()
const cardController = require('../controllers/card.controller')

router.post('/create', cardController.create)


module.exports = router