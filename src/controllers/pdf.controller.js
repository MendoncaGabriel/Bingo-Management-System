const ejs = require('ejs');
const pdf = require('html-pdf');
const cardSchema = require('../database/models/cardSchema')
const path = require('path');
require('dotenv').config()


exports.create = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await cardSchema.findById(id);

        const metadata = {
            bingos: data.bingoCards,
            bingoQuantity: data.bingosForCards,
            background: `${process.env.DOMINIO}/images/${data.background}`,
            pages: data.NumberOfCards,
        };

        console.log(data.bingoCards)

        ejs.renderFile('src/views/templates/cartela.ejs', metadata, (err, html) => {
            if (err) {
                console.log('ERRO!', err);
                res.status(500).json({ msg: 'Erro ao renderizar o template EJS.' });
            } else {
                const optionsPdf = {
                    format: 'A4',
                    orientation: 'portrait',
                    border: {
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                    },
                };
                pdf.create(html, optionsPdf).toFile('./public/pdf/meupdf.pdf', (err, result) => {
                    if (err) {
                        console.log('Um erro aconteceu', err);
                        res.status(500).json({ msg: 'Erro ao gerar o arquivo PDF.' });
                    } else {
                        console.log(result);
                        // Envie o arquivo PDF como resposta ao cliente
                        res.sendFile(path.resolve(__dirname, '../../public/pdf/meupdf.pdf'));
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: 'Erro ao criar exportar PDF.' });
    }
};
