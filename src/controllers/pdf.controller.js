const ejs = require('ejs');
const pdf = require('html-pdf');

exports.create = (req, res) => {
    try{
        const { text, bingoQuantity,  background, pages } = req.body

        ejs.renderFile('src/views/templates/cartela.ejs', {text: 'Gabriel', bingoQuantity, background, pages}, (err, html) => {
            if (err) {
                console.log('ERRO!', err);
            } else {
                const opcoesPdf = {
                    format: 'A4',
                    orientation: 'portrait',
                    border: {
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                    },
                };
                pdf.create(html, opcoesPdf).toFile('./meupdf.pdf', (err, res) => {
                    if (err) {
                        console.log('Um erro aconteceu', err);
                       
                    } else {
                        console.log(res);
                       
                    }
                });
            }
        });

        res.status(200).json({msg: "pdf exportado com sucesso!"})
    }catch(err){
        res.status(400).json({msg: "Erro ao criar exportar pdf"})
    }
};


exports.render = (req, res) => {
    res.render('../views/templates/cartela.ejs', {
        pages: 1,
        bingoQuantity: 2,
        background: 'https://png.pngtree.com/png-clipart/20210627/original/pngtree-simple-color-bingo-night-party-poster-png-image_6461161.jpg'
    })
    
}