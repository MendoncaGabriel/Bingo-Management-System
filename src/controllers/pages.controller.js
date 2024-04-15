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
            
            res.render('layouts/home', { root: 'home', nameUser: req.nameUser || ''   });
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
            await pdfModel.create(id, res);
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

   


