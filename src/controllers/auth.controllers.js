const User = require('../database/models/userModel.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()


//variaveis de ambientes
const SECRET = process.env.SECRET



exports.register = async (req, res) => {
    try{
        
        //capitura de dados-------------------------------------
            const {name, email, password} = req.body

        // criar senha hash-------------------------------------
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt)
        
        //salvar novo usuário-------------------------------------
            const newUser = new User({ name: name,  password: passwordHash, email: email})

            newUser.save()
            .then((user)=>{
                //assinar token-------------------------------------
                const token = jwt.sign({ id: user._id }, SECRET);
                res.status(200).json({msg: 'Usuário criado com sucesso:', newUser, token})
            })
            .catch((error)=>{
                res.status(400).json({msg: 'Erro ao criar usuário:', error})
            })
    } catch(error){
        res.status(500).json({msg: 'Erro interno no sservidor', error})
    }
    
}