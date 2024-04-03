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
    },
    markAsSold: async (data) => {
        try {
            // Verificar se o item com o mesmo índice já está no array 'bingosSold'
            const existingItem = await cardSchema.findOne({ _id: data.cartela_id, 'bingosSold.index': data.index });
        
            // Se o item existir, atualize seus dados; caso contrário, adicione um novo item ao array
            if (existingItem) {
                // Atualizar os dados do item existente
                const updatedDoc = await cardSchema.findOneAndUpdate(
                    { _id: data.cartela_id, 'bingosSold.index': data.index },
                    { 
                        $set: {
                            'bingosSold.$.name': data.name,
                            'bingosSold.$.contato': data.contato,
                            'bingosSold.$.endereco': data.endereco,
                            'bingosSold.$.status': data.status
                        }
                    },
                    { new: true }
                );
                return updatedDoc;
            } else {
                // Adicionar um novo item ao array 'bingosSold'
                const updatedDoc = await cardSchema.findByIdAndUpdate(
                    data.cartela_id,
                    { $push: { bingosSold: { index: data.index, name: data.name } } },
                    { new: true }
                );
                return updatedDoc;
            }
        } catch (error) {
            console.error('Erro ao marcar como vendido:', error);
            throw error;
        }
    }

}