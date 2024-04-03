const express = require('express')
const router = express.Router()
const pages = require('../controllers/pages.controller')
const jwt = require('jsonwebtoken')

// INTERCEPTA A REQUISIÇÃO E SALVA O TOKEN
router.use(async (req, res, next) => {
    if(req.cookies.token){
        const token = req.cookies.token
        const user = await jwt.verify(token, process.env.SECRET);
        req.nameUser = user.user.name
    }
    next()
})

router.get('/nova-cartela', pages.home.create)
router.get('/editar-cartela', pages.home.update)
router.get('/cartelas', pages.home.list)
router.get('/cartela/:id', pages.home.renderPDF)
router.get('/registrar-cartelas-vendidas', pages.home.registerSold)
router.get('/conferir', pages.home.conferir)
router.get('/login', pages.auth.login)
router.get('/register', pages.auth.register)
router.get('/', pages.home.index);

module.exports = router