// //MODELO APRIMODARO
const ejs = require('ejs');
const pdf = require('html-pdf');
const cardSchema = require('../database/models/cardSchema')
const path = require('path');
require('dotenv').config()
const fs = require('fs');



// // MODELO FUNCIONAL
exports.create = async (id) => {
    try {
        const data = await cardSchema.findById(id)
        const name = data.title.replace(/ /g, '-')
        const templatePath = path.resolve('src', 'views','templates', 'cartela2.ejs')
        const caminhoArquivoSalvo = path.resolve('src','public', 'pdf', `${name}.pdf`)

        const metadata = {
            bingos: data.bingoCards,
            bingoQuantity: data.bingosForCards,
            background: `${process.env.DOMINIO}/images/${data.background}`,
            pages: data.NumberOfCards
        }
        const config = {
            format: 'A4',
            orientation: 'portrait',
            border: '0',
            type: 'pdf',
            quality: '50',
            timeout: 1800000
        };

                            
        
        // Cria um arquivo de destino vazio
        fs.writeFileSync(caminhoArquivoSalvo, '');

        const arquivoStream = fs.createWriteStream(caminhoArquivoSalvo);
        arquivoStream.on('open', async () => {


            ejs.renderFile(templatePath, metadata, async (err, html) => {
                if (err) {
                    console.error('Erro ao renderizar o template EJS:', err);
                    return;
                }


                pdf.create(html, config).toStream((err, stream) => {
                    if (err) {
                        console.error('Erro ao criar stream do PDF:', err);
                        return;
                    }

                    stream.pipe(arquivoStream);

                    arquivoStream.on('finish', () => {
                        arquivoStream.end();
                    });

                    arquivoStream.on('error', (err) => {
                        console.error('Erro ao salvar PDF:', err);
                    });
                });
            });
        });
  
    } catch (error) {
        throw console.error('Erro ao criar exportar PDF.', error)
    }
}



