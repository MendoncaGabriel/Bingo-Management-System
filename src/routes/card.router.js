const express = require('express')
const router = express.Router()
const cardController = require('../controllers/card.controller')

const upload = require('../middlewares/upload/upload')



router.get('/getCard/:id', cardController.getCard)
router.post('/create', upload.single('background'), cardController.create)
router.patch('/update/:id', upload.single('background'), cardController.update)
router.delete('/delete/:id', cardController.delete)



module.exports = router