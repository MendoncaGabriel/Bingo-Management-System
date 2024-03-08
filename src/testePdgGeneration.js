const pdf = require('html-pdf')
const ejs = require('ejs')






ejs.renderFile('./src/views/templates/cartela.ejs', {text: 'Gabriel'}, (err, html) => {
    if(err){
        console.log('ERRO!', err)
    }else{
        const opcoesPdf = {
            format: 'A4',
            orientation: 'portrait', // ou 'landscape' para paisagem
            border: {
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        };
        pdf.create(html, opcoesPdf).toFile("./meupdf.pdf", (err, res) => {
            if(err){
                console.log('Um erro aconteceu', err)
            }else{
                console.log(res)
            }
        })
    }
})



