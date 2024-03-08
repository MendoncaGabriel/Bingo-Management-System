const pdf = require('html-pdf')
const fs = require('fs');

const caminhoArquivoHtml = './teste.html';
const conteudoHtml = fs.readFileSync(caminhoArquivoHtml, 'utf8');


// Configuração para o tamanho A4 (210mm x 297mm)
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

pdf.create(conteudoHtml, opcoesPdf).toFile("./meupdf.pdf", (err, res) => {
    if(err){
        console.log('Um erro aconteceu', err)
    }else{
        console.log(res)
    }
})