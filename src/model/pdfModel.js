// const ejs = require('ejs');
// const pdf = require('html-pdf');
// const cardSchema = require('../database/models/cardSchema')
// const path = require('path');
// require('dotenv').config()

// // // MODELO FUNCIONAL
// exports.create = async (id, res) => {
//     try {
//         const data = await cardSchema.findById(id);
        
//         const name = data.title.replace(/ /g, '-');

//         const metadata = {
//             bingos: data.bingoCards,
//             bingoQuantity: data.bingosForCards,
//             background: `${process.env.DOMINIO}/images/${data.background}`,
//             pages: data.NumberOfCards
//         };

//         ejs.renderFile(path.resolve('src', 'views','templates', 'cartela2min.ejs'), metadata,async (err, html) => {
//             if (err) {
//                 return console.log('Erro ao renderizar o template EJS.', err)
              
//             } else {
//                 const optionsPdf = {
//                     timeout: 3000000,
//                     format: 'A4',
//                     orientation: 'portrait',
//                     border: {
//                         top: '0px',
//                         right: '0px',
//                         bottom: '0px',
//                         left: '0px',
//                     },
//                 };
//                 console.log('buildando pdf...')
//                 await pdf.create(html, optionsPdf).toFile(path.resolve('src','public', 'pdf', `${name}.pdf`), async (err, result) => {
//                     if (err) {
              
//                         console.log('Erro ao gerar o arquivo PDF.', err )
//                     } 
//                     if(result){
//                         //salvar caminho do arquivo
//                        await cardSchema.findByIdAndUpdate(id, {pdf:  `${name}.pdf`})

//                         res.sendFile( path.resolve('src','public', 'pdf', `${name}.pdf`))
//                         console.log('PDF buildado!')

//                     }
//                 });
//             }
//         });
//     } catch (error) {
//         throw console.error('Erro ao criar exportar PDF.', error)
//     }
// };












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
        const templatePath = path.resolve('src', 'views','templates', 'cartela2min.ejs')
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

        console.log('Iniciando processo de criação do PDF...');
        
        // Cria um arquivo de destino vazio
        fs.writeFileSync(caminhoArquivoSalvo, '');

        const arquivoStream = fs.createWriteStream(caminhoArquivoSalvo);
        arquivoStream.on('open', async () => {
            console.log('Arquivo de destino aberto para escrita.');

            ejs.renderFile(templatePath, metadata, async (err, html) => {
                if (err) {
                    console.error('Erro ao renderizar o template EJS:', err);
                    return;
                }

                console.log('Template EJS renderizado com sucesso.');

                pdf.create(html, config).toStream((err, stream) => {
                    if (err) {
                        console.error('Erro ao criar stream do PDF:', err);
                        return;
                    }

                    console.log('Stream do PDF criado com sucesso.');
                    stream.pipe(arquivoStream);

                    arquivoStream.on('finish', () => {
                        console.log('PDF salvo com sucesso!');
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



