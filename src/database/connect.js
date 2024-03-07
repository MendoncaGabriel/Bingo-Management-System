require('dotenv').config()
const mongoose = require('mongoose')

const URLCONNECT_DB = process.env.URLCONNECT_DB

module.exports = mongoose.connect(URLCONNECT_DB)
.then(()=>{
	console.log('Conectado ao banco de dados!')
})
.catch((erro)=>{
	console.log(erro)
})