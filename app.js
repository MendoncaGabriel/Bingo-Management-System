const cookieParser = require('cookie-parser')
const compression = require('compression')
const express = require('express')
const morgan = require('morgan') // Analise
const helmet = require('helmet') // Proteção
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT

const app = express()

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
// }
// app.use(cors(corsOptions))
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "https://cdn.tailwindcss.com/", "http://localhost:3000/"],
//     },
// }));
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev')) //combined ou 'dev' para uma saída mais simplificada
app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

const pages = require('./src/routes/pages.router.js')
const auth = require('./src/routes/pages.router.js')
const admin = require('./src/routes/admin.router.js')
app.use('/', pages)
app.use('/auth', auth)
app.use('/admin', admin)



app.listen(PORT, ()=>{
    console.log('Servidor aberto na porta: ' + PORT)
})