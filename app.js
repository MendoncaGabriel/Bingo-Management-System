const cookieParser = require('cookie-parser')
const compression = require('compression')
const express = require('express')
const morgan = require('morgan') // Analise
const cors = require('cors')
require('dotenv').config()
require('./src/database/connect.js')
const path = require('path')
const PORT = process.env.PORT

const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev')) //combined ou 'dev' para uma saída mais simplificada

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

const pages = require('./src/routes/pages.router.js')
const auth = require('./src/routes/auth.router.js')
const admin = require('./src/routes/admin.router.js')
const card = require('./src/routes/card.router.js')
const teste = require('./src/routes/teste.router.js')
app.use('/', pages)
app.use('/auth', auth)
app.use('/admin', admin)
app.use('/teste', teste)
app.use('/card', card)

app.listen(PORT, ()=>{
    console.log('Servidor aberto na porta: ' + PORT)
})