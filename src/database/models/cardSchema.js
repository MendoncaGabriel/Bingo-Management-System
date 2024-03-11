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
        type: String, 
        required: true
    },
    background: {  // Caminho para imagem de fundo
        type: String, 
        required: true
    },
    bingoCards: [{
    
        number: {
            type: String,
            required: true
        },
        bingo: {
            type: [Number],
            required: true
        },
        status: {
            type: String,
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
            required: false
        }
    }]
 
});




const bingoCard = mongoose.model('card', cardSchema);
module.exports = bingoCard;
