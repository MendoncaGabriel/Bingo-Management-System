const pdfModel = require('../model/pdfModel')
const cardSchema = require('../database/models/cardSchema')
require('dotenv').config()
const path = require('path')

exports.home = (req, res) =>{
    res.render('index')
}
exports.login = (req, res) => {
    res.render('login')
}
exports.register = (req, res) => {
    res.render('register')
}

exports.newCard = (req, res) => {
    res.render('newCard')
}
exports.editcard = async (req, res) => {
    const id = req.query.id
    const card = await cardSchema.findById(id)
    res.render('editCard', {card, id})
}
exports.cardsList = async (req, res) => {
    const list = await cardSchema.find({}).sort({ date: 1 });
    res.render('cardsList', {cards: list})
}
exports.renderPDF = async (req, res) => {
    const id = req.params.id
    await pdfModel.create(id, res)
    
}
exports.registerCardsSold = async (req, res) => {
    const cards = await cardSchema.find()
    res.render('registerCardsSold', {cards})
}