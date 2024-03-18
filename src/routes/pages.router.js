const express = require('express')
const router = express.Router()
const pages = require('../controllers/pages.controller')



router.get('/', pages.home)
router.get('/login', pages.login)
router.get('/register', pages.register)
router.get('/nova-cartela', pages.newCard)
router.get('/editar-cartela', pages.editcard)
router.get('/cartelas', pages.cardsList)
router.get('/cartela/:id', pages.cardPrint)
router.get('/registrar-cartelas-vendidas', pages.registerCardsSold)

module.exports = router