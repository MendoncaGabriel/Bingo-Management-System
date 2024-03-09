const express = require('express')
const router = express.Router()
const pages = require('../controllers/pages.controller')



router.get('/', pages.home)
router.get('/login', pages.login)
router.get('/register', pages.register)
router.get('/novo-bingo', pages.newBingo)

module.exports = router