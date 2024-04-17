const mongoose = require('mongoose');

const cartela = new mongoose.Schema({
    cartela_id: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
    },
    vendedor: {
        type: String,
    },
    contato: {
        type: String,
        default: ''
    },
    endereco: {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: false
    },
    bingo: {
        type: Array,
        default: []
    }
});

const cardSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    trancado: {
        type: Boolean,
        default: false
    },
    pdf: {
        type: String
    },
    category: { 
        type: String, 
        required: false 
    },
    bingosForCards: { //Quantidades de bingos por cartelas
        type: Number, 
        required: true
    },
    NumberOfCards: {  //Quantidade de cartelas por pdf
        type: Number, 
        required: true
    },
    bingoPattern: {  // Padrão de bingo 25/75 ou 22/100
        type: Number, 
        required: true
    },
    background: {  
        type: String, 
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    },
    bingoCards: [[Number]],
    bingosSold: [cartela]
 
});






const bingoCard = mongoose.model('card', cardSchema);
module.exports = bingoCard;
