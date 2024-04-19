const cardModel = require('../model/cardModel')

const controller = {
    create: async (req, res) => {
        try {
            if (!req.file || !req.file.filename) {
                return res.status(400).json({ msg: 'Arquivo de imagem não recebido ou inválido.' });
            }
    
            const data = req.body;
    
            if (!data.title  || !data.bingosForCards || !data.NumberOfCards || !data.bingoPattern) {
                return res.status(400).json({ msg: 'Informações faltando!' });
            }
    
            if (data.bingoPattern != '75' && data.bingoPattern != '100') {
                return res.status(400).json({ msg: 'Erro: padrão de bingo não aceito. (75 ou 100)' });
            }
            data.background = req.file.filename,
            await cardModel.create(data)
       
            return res.status(200).json({ msg: 'Cartela salva com sucesso!' });
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno no servidor', error });
        }
    },
    getById: async (req, res) => {
        const id = req.params.id
        const card = await  cardModel.getById(id)

        res.status(200).json(card)
    },
    update: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({ msg: 'ID não fornecido na consulta.' });
            }
    
            const data = req.body;
            if (data.bingoPattern !== '75' && data.bingoPattern !== '100') {
                return res.status(400).json({ msg: 'Erro: padrão de bingo não aceito (75 ou 100).' });
            }
            
            if(req.file){
                data.background = req.file.filename
            }
  
      
            const updatedCard = await cardModel.update(req.params.id, data)
            if (!updatedCard) {
                return res.status(404).json({ msg: 'Cartela não encontrada.' });
            }
    
            return res.status(200).json({ msg: 'Cartela atualizada com sucesso!', updatedCard });
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno no servidor', error });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({ msg: 'ID não fornecido na consulta.' });
            }
            await cardModel.delete(id)
            res.status(200).json({ msg: 'Cartela Apagada com sucesso!'});
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno no servidor', error });
        }
    },
    sold: async (req, res) => {
        const data = req.body
        const result = await cardModel.markAsSold(data)
       
        res.status(200).json(result)
    },
    getByListSold: async (req, res) => {
        const id = req.params.id
        const result = await cardModel.getByListSold(id)
       
        res.status(200).json(result)
    },
    trancar: async (req, res) => {
        try {
            const id = req.params.id
            const resposta = await cardModel.trancar(id)
            if(resposta == 'ok'){
                res.status(200).json({msg: 'Item trancado com sucesso!'})
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Erro interno no servidor', error });
        }
    }
}

module.exports = controller;