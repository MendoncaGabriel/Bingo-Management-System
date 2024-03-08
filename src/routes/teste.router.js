const express = require('express');
const router = express.Router();
const pdf = require('../controllers/pdf.controller');

router.post('/', pdf.create);

router.get('/', pdf.render)

module.exports = router;
