const multer = require('multer');
const path = require('path');
const fs = require('fs')


// Configuração do multer para lidar com o upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'public/images'

        // Verifique se o diretório existe
        if (!fs.existsSync(uploadDir)) {
            // Se não existir, imprima uma mensagem ou tome outra ação apropriada
            console.error(`O diretório '${uploadDir}' não existe.`);
            // Se desejar, você pode criar o diretório aqui
            // fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Gere um nome de arquivo único
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});


module.exports  = multer({ storage: storage });