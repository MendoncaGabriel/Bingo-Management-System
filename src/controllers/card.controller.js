const cardSchema = require('../database/models/cardSchema')
const bingoGenerator = require('../model/bingoGenerator')
exports.create = async (req, res) => {
    try {

        const { title, category, bingosForCards, NumberOfCards, bingoPattern, background} = req.body

        //validar informações do body
        if(!title || !category || !bingosForCards || !NumberOfCards || !bingoPattern || !background){
            return res.status(400).json({msg: 'Informações faltando!'})
        }


        //verificar padrão
        if(bingoPattern != '75' && bingoPattern != '100'){
            return res.status(400).json({msg: 'Erro: padrão de bingo não aceito (75 ou 100) '})
        }


        //criar bingos
        const bingos = await bingoGenerator(NumberOfCards, bingoPattern)




        const newCard = new cardSchema({
            title, category, bingosForCards, NumberOfCards, bingoPattern, background, bingoCards: bingos
        })

        await newCard.save() 

        return res.status(200).json({msg: 'Cartela salva com sucesso!', newCard})

    




    } catch (error) {
        res.status(500).json({msg: 'Erro interno no servidor', error})
    }
}