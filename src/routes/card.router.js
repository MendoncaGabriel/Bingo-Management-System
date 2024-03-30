const express = require('express')
const router = express.Router()
const cardController = require('../controllers/card.controller')
const upload = require('../middlewares/upload/upload')

router.post('/',  upload.single('background'), cardController.create)
router.get('/:id', cardController.getById)
router.patch('/:id', upload.single('background'), cardController.update)
router.delete('/:id', cardController.delete)

module.exports = router