const mongoose = require('mongoose')
const URLCONNECT_DB = process.env.URLCONNECT_DB

module.exports = mongoose.connect(URLCONNECT_DB)
.then(()=>{
	console.log('Conectado ao banco de dados!')
})
.catch((erro)=>{
	console.log('===> ', URLCONNECT_DB)
	console.log('Erro ao se conectar no banco de dados', erro)
})