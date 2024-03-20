const cardSchema = require('../database/models/cardSchema')
require('dotenv').config()

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
exports.cardPrint = async (req, res) => {
    const id = req.params.id
    const data = await cardSchema.findById(id);
    
    const metadata = {
        background: `${process.env.DOMINIO}/images/${data.background}`,
        data: data
    }
    
    res.render('cardPrintMin', metadata)
}
exports.registerCardsSold = async (req, res) => {
    const cards = await cardSchema.find()
    res.render('registerCardsSold', {cards})
}