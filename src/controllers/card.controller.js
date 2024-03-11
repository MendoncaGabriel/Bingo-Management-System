const cardSchema = require('../database/models/cardSchema')

exports.create = async (req, res) => {
    try {

        const { title, category, bingosForCards, NumberOfCards, bingoPattern, background} = req.body

        //validar informações do body
        if(!title || !category || !bingosForCards || !NumberOfCards || !bingoPattern || !background){
            return res.status(400).json({msg: 'Informações faltando!'})
        }

        const newCard = new cardSchema({
            title, category, bingosForCards, NumberOfCards, bingoPattern, background
        })

        await newCard.save() 

        return res.status(200).json({msg: 'Cartela salva com sucesso!', newCard})

    




    } catch (error) {
        res.status(500).json({msg: 'Erro interno no servidor', error})
    }
}