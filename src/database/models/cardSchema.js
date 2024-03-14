const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
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
    background: {  // Caminho para imagem de fundo
        type: String, 
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    },
    bingoCards: [{
    
        number: {
            type: Number,
            required: true
        },
        bingo: {
            type: [Number],
            required: true
        },
        status: {
            type: Boolean,
            default: false
        },
        buyersName: {
            type: String,
            default: "",
            required: false
        },
        contact: {
            type: String,
            required: false
        },
        date: {
            type: String,
            default: Date.now()
        }
    }]
 
});




const bingoCard = mongoose.model('card', cardSchema);
module.exports = bingoCard;
