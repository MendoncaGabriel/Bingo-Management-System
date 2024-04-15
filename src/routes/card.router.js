const express = require('express')
const router = express.Router()
const cardController = require('../controllers/card.controller')
const upload = require('../middlewares/upload/upload')
const jwt = require('jsonwebtoken')

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
router.post('/sold', cardController.sold)
router.post('/',  upload.single('background'), cardController.create)
router.get('/cards/:id', cardController.getById)
router.get('/vendidos/:id', cardController.getByListSold)
router.patch('/:id', upload.single('background'), cardController.update)
router.delete('/:id', cardController.delete)

module.exports = router