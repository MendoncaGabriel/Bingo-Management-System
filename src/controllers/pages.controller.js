const pdfModel = require('../model/pdfModel')
const cardModel = require('../model/cardModel')

module.exports = {
    home: {
        layout: 'home',
        conferir: async (req, res) => {
            let bingos = await cardModel.getByList()
            
            res.render('layouts/home', { root: 'conferir', nameUser: req.nameUser || '', bingos, title: 'CONFERÊNCIA'   });
        },
        index: (req, res) => {
            
            res.render('layouts/home', { root: 'home', nameUser: req.nameUser || '' , title: 'SANTO BINGO'  });
        },
        create: (req, res) => {
            res.render('layouts/home', { root: 'newCard', nameUser: req.nameUser || '', title: 'CADASTRAR NOVA CARTELA'  });
        },
        update: async (req, res) => {
            const id = req.query.id;
            const card = await cardModel.getById(id)
            res.render('layouts/home', { card, id, root: 'editCard',nameUser: req.nameUser || ''  });
        },
        list: async (req, res) => {
            const list = await cardModel.getListSort()
            res.render('layouts/home', { cards: list, root: 'list', nameUser: req.nameUser || '', title: 'MINHAS CARTELAS'  });
        },
        renderPDF: async (req, res) => {
            const id = req.params.id;
            
            // Responder imediatamente ao cliente
            res.status(200).json({ msg: "Seu PDF está em construção, isso pode levar um tempo. Por favor, aguarde!" });

        
            // Iniciar o processo de criação do PDF em segundo plano
            try {
                pdfModel.create(id);
            } catch (error) {
                console.error("Erro ao criar PDF:", error);
            }
        },
        registerSold: async (req, res) => {
            try {                
                const cards = await cardModel.getByList()
                res.render('layouts/home', { cards, root: 'registerCardsSold' , nameUser: req.nameUser || '', title: 'VALIDAR CARTELAS VENDIDAS'  });
            } catch (error) {
                console.log(error)
            }
        }
    },
    auth: {
        layout: 'auth',
        login: (req, res) => {
            res.render('login');
        },
        register: (req, res) => {
            res.render('register');
        }
    }
};

   


