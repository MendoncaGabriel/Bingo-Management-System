const express = require('express')
const router = express.Router()
require('dotenv').config()
const pages = require('../controllers/pages.controller')
const jwt = require('jsonwebtoken')

router.get('/login', pages.auth.login);
router.get('/register', pages.auth.register);



router.use(async (req, res, next) => {
    try {        
        if (req.cookies.token) {
            const token = req.cookies.token;
            const SECRET = process.env.SECRET;
            const user = await jwt.verify(token, SECRET);
            req.nameUser = user.user.name || '';
            next();
        } else {
      
            res.redirect('login');
        }
    } catch (error) {
        
        req.nameUser = '';
        console.error('Erro ao salvar nameUser na request', error);
        next(error); 
    }
});



//AS ROTAS ABAIXO NECESSITAM AUTENTICAÇÃO ////////////////////////////////////
router.get('/nova-cartela', pages.home.create)
router.get('/editar-cartela', pages.home.update)
router.get('/cartelas', pages.home.list)
router.get('/cartela/:id', pages.home.renderPDF)
router.get('/registrar-cartelas-vendidas', pages.home.registerSold)
router.get('/conferir', pages.home.conferir)
router.get('/register', pages.auth.register)
router.get('/', pages.home.index);

module.exports = router