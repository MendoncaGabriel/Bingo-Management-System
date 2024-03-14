const cardSchema = require('../database/models/cardSchema')


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