const cardSchema = require('../database/models/cardSchema')
const bingoGenerator =  require('../model/bingoGenerator')

const model = {
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
    getByListSold: async (id) => {
        try {
            const card = await cardSchema.findById(id)
            const cardSold = card.bingosSold.filter(e => e.status == true)
            return {bingoPattern: card.bingoPattern, cardSold}

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
    trancar: async (id) => {
        try {
            
            const res = await cardSchema.findByIdAndUpdate(id, {trancado: true}, { new: true })
            if(res){
                return 'ok'
            }
        } catch (error) {
            console.log(error)
            throw console.error('Erro no model update ao atualizar item na base de dados!', error);
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
           console.log('DATA:', data)
           // Verificar se o item com o mesmo índice já está no array 'bingosSold'
           const existingItem = await cardSchema.findOne({ _id: data.cartela_id, 'bingosSold.index': data.index });
           console.log('existingItem:', existingItem)

            const bingo = await cardSchema.findById(data.cartela_id)
         
        
            // Atualizar dados
            if (existingItem) {
                // Atualizar os dados do item existente
                const updatedDoc = await cardSchema.findOneAndUpdate(
                    { _id: data.cartela_id, 'bingosSold.index': data.index },
                    { 
                        $set: {
                            'bingosSold.$.name': data.name || '',
                            'bingosSold.$.contato': data.contato || '',
                            'bingosSold.$.endereco': data.endereco || '',
                            'bingosSold.$.status': data.status || '',
                            // 'bingosSold.$.bingo': bingo.bingoCards[data.index],
                            'bingosSold.$.cpf': data.cpf || '',
                            'bingosSold.$.vendedor': data.vendedor || ''
                        }
                    },
                    { new: true }
                );
                return updatedDoc;
            } else {
                // Adicionar um novo item ao array 'bingosSold'

                const updatedDoc = await cardSchema.findByIdAndUpdate(
                    data.cartela_id,
                    { $push: { bingosSold: { 
                        index: data.index, 
                        name: data.name || '',
                        contato: data.contato || '',
                        endereco: data.endereco || '',
                        cpf: data.cpf || '',
                        vendedor: data.vendedor || '',
                        status: data.status || false,
                        bingo: bingo.bingoCards[data.index] || '',
                    }}},
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
module.exports = model;