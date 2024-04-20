require('dotenv').config()
const mongoose = require('mongoose')

const URLCONNECT_DB = 'mongodb://mongo:Gam1997SantoBingo@217.196.62.165:27017/bingo'
module.exports = mongoose.connect(URLCONNECT_DB)
.then(()=>{
	console.log('Conectado ao banco de dados!')
})
.catch((erro)=>{
	console.log(erro)
})