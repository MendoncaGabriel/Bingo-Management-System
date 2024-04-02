const ejs = require('ejs');
const pdf = require('html-pdf');
const cardSchema = require('../database/models/cardSchema')
const path = require('path');
require('dotenv').config()


exports.create = async (id, res) => {
    try {
        const data = await cardSchema.findById(id);
        
        const name = data.title
    
        const metadata = {
            bingos: data.bingoCards,
            bingoQuantity: data.bingosForCards,
            background: `${process.env.DOMINIO}/images/${data.background}`,
            pages: data.NumberOfCards,
        };

        ejs.renderFile(path.resolve('src', 'views','templates', 'cartela2.ejs'), metadata,async (err, html) => {
            if (err) {
                return console.log('Erro ao renderizar o template EJS.', err)
              
            } else {
                const optionsPdf = {
                    timeout: 3000000,
                    format: 'A4',
                    orientation: 'portrait',
                    border: {
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                    },
                };
                console.log('buildando pdf...')
                await pdf.create(html, optionsPdf).toFile(path.resolve('src','public', 'pdf', `${name}.pdf`), async (err, result) => {
                    if (err) {
              
                        console.log('Erro ao gerar o arquivo PDF.', err )
                    } 
                    if(result){
                        //salvar caminho do arquivo
                       await cardSchema.findByIdAndUpdate(id, {pdf:  `${name}.pdf`})

                        res.sendFile( path.resolve('public', 'pdf', `${name}.pdf`))
                        console.log('PDF buildado!')

                    }
                });
            }
        });
    } catch (error) {
        throw console.error('Erro ao criar exportar PDF.', error)
    }
};
