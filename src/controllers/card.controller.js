const cardSchema = require('../database/models/cardSchema')
const bingoGenerator = require('../model/bingoGenerator')


exports.create = async (req, res) => {
    try {
        // Verifique se req.file é definido e tem o campo filename
        if (!req.file || !req.file.filename) {
            return res.status(400).json({ msg: 'Arquivo de imagem não recebido ou inválido.' });
        }

        // Obtenha apenas o nome do arquivo (filename)
        const imagePath = req.file.filename;

        const { title, category, bingosForCards, NumberOfCards, bingoPattern } = req.body;

        // validar informações do body
        if (!title || !category || !bingosForCards || !NumberOfCards || !bingoPattern) {
            return res.status(400).json({ msg: 'Informações faltando!' });
        }

        // verificar padrão
        if (bingoPattern != '75' && bingoPattern != '100') {
            return res.status(400).json({ msg: 'Erro: padrão de bingo não aceito (75 ou 100) ' });
        }

        // criar bingos
        const bingos = await bingoGenerator(NumberOfCards, bingoPattern);

        const newCard = new cardSchema({
            title,
            category,
            bingosForCards,
            NumberOfCards,
            bingoPattern,
            background: imagePath, // Agora é apenas o nome do arquivo
            bingoCards: bingos,
        });

        await newCard.save();

        return res.status(200).json({ msg: 'Cartela salva com sucesso!', newCard });
    } catch (error) {
        res.status(500).json({ msg: 'Erro interno no servidor', error });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id || '';
        if (!id) {
            return res.status(400).json({ msg: 'ID não fornecido na consulta.' });
        }

        const { title, category, bingosForCards, NumberOfCards, bingoPattern } = req.body;

        // Verificar padrão de bingo
        if (bingoPattern !== '75' && bingoPattern !== '100') {
            return res.status(400).json({ msg: 'Erro: padrão de bingo não aceito (75 ou 100).' });
        }




        

        // Atualizar documento no MongoDB
        const dataUpdate = {
            title,
            category,
            bingosForCards,
            NumberOfCards,
            bingoPattern,
        }
        req.file ? dataUpdate.background = req.file.filename : ''

        //verificar se a quantidade de cartelas mudou
        let datacard = await cardSchema.findById(id)
        if(datacard.NumberOfCards != NumberOfCards){
            // criar bingos
            const bingos = await bingoGenerator(NumberOfCards, bingoPattern);
            dataUpdate.bingoCards = bingos
            console.log('Numero de cartelas mudou!, gerando novos Bingos & Cartelas')
        }

 

        const updatedCard = await cardSchema.findByIdAndUpdate(id,dataUpdate,{ new: true });

        if (!updatedCard) {
            return res.status(404).json({ msg: 'Cartela não encontrada.' });
        }

        return res.status(200).json({ msg: 'Cartela atualizada com sucesso!', updatedCard });
    } catch (error) {
        res.status(500).json({ msg: 'Erro interno no servidor', error });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id || ''; // Inicializa como uma string vazia se não for fornecido
        if (!id) {
            return res.status(400).json({ msg: 'ID não fornecido na consulta.' });
        }
        
        const deletecard = await cardSchema.findByIdAndDelete(id)
        return res.status(200).json({ msg: 'Cartela Apagada com sucesso!',  deletecard});
    } catch (error) {
        res.status(500).json({ msg: 'Erro interno no servidor', error });
    }
};