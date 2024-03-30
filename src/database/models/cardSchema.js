const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
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
    bingoCards: [[Number]]
 
});




const bingoCard = mongoose.model('card', cardSchema);
module.exports = bingoCard;
