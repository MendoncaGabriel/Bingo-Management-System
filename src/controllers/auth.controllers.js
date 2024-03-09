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
				if(error.keyPattern.name == 1){
					res.status(400).json({msg: 'Erro ao criar usuário, nome ja foi registrado!', error})
				}else{
					res.status(400).json({msg: 'Erro ao criar usuário:', error})
				}
            })
    } catch(error){
        res.status(500).json({msg: 'Erro interno no sservidor', error})
    }
    
}


exports.logIn = async (req, res) => {
	const {email, password} = req.body
    console.log(email, password)

	//validações
	if(!email){
		return res.status(422).json({msg: 'O email obrigatorio!'})
	}	
	if(!password){
		return res.status(422).json({msg: 'A senha obrigatorio!'})
	}	

	//checar se usuario existe
	const user = await User.findOne({email: email})

	if(!user){
		return res.status(404).json({msg: 'usuario não encontrado!'})
	}

	//verificar senha confere com cadastro
	const checkPassword = await bcrypt.compare(password, user.password)

	if(!checkPassword ){
		return res.status(422).json({msg: 'Senha invalida'})
	}

	try{
		const secret = process.env.SECRET
		const token = jwt.sign(
			{
				id: user._id
			}, secret
		)

        res.status(200).json({msg: 'Autenticação realizada com sucesso!', token})

		
	}catch(erro){
		console.log(erro)
		res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'})
	}

}