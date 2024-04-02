const cardSchema = require('../database/models/cardSchema')
const bingoGenerator =  require('../model/bingoGenerator')

module.exports = {
    create: async (data) => {
        try {
            const newObject = data
            newObject.bingoCards = await bingoGenerator(data.NumberOfCards, data.bingoPattern)
            
            
            const newCard = new cardSchema(newObject)
            await newCard.save();
        } catch (error) {
            
            throw console.error('Erro no model create ao salvar na base de dados novo bingo!', error);
        }
        
    },
    getById: async (id) => {
        try {
            const card = await cardSchema.findById(id)
            return card

        
        } catch (error) {
            throw console.error('Erro pegar item na base de dados!', error);
        }
    },
    getByList: async () => {
        try {
            const card = await cardSchema.find()
            return card

        
        } catch (error) {
            throw console.error('Erro pegar item na base de dados por lista!', error);
        }
    },
    getListSort: async () => {
        try {
            const list = await cardSchema.find({}).sort({ date: 1 });
           
            return list

        
        } catch (error) {
            throw console.error('Erro pegar item na base de dados por lista sort!', error);
        }
    },
    update: async (id, data) => {
        try {
            //verificar se a quantidade de cartelas mudou
            let datacard = await cardSchema.findById(id)
            if(datacard.NumberOfCards != data.NumberOfCards){
                data.bingoCards = []
                data.bingoCards =  await bingoGenerator(data.NumberOfCards, data.bingoPattern);
                console.log('Numero de cartelas por pagina mudou!, gerando novos Bingos')
            }
     

            return await cardSchema.findByIdAndUpdate(id,data,{ new: true });

        } catch (error) {
            throw console.error('Erro no model update ao atualizar item na base de dados!', error);
        }
    },
    delete: async (id) => {
        try {
            await cardSchema.findByIdAndDelete(id)
        } catch (error) {
            throw console.error('Erro deletar item na base de dados!', error);
        }
    }

}