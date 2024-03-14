const express = require('express')
const router = express.Router()
const pdf = require('../controllers/pdf.controller');


router.post('/create/:id', pdf.create);


module.exports = router