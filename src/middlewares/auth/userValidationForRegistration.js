const validator = require('validator');
const User = require('../../database/models/userModel')

module.exports = async function userValidationForRegistration(req, res, next){
  const { name, email, password } = req.body;

  // Validação de dados
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Por favor, forneça nome, e-mail e senha.' });
    }


  // Validação de nome
    const isValidName = (name) => {
        if (!name) return false;
        if (name.length < 3 || name.length > 30) return false;
        if (!/^[a-zA-Z\s]+$/.test(name)) return false;
        return true;
    }
    if (!isValidName(name)) {
        return res.status(400).json({ msg: 'Nome inválido. Certifique-se de que tenha entre 3 e 30 caracteres e contenha apenas letras e espaços.' });
    }

  // Validação de e-mail
    if (!validator.isEmail(email)) {
        return res.status(400).json({ msg: 'E-mail inválido.' });
    }


  //validar senha
    if (password.length < 3 || password.length > 20) {
        return res.status(400).json({ msg: 'Por favor, escolha uma senha diferente. A senha deve ter entre 4 e 20 caracteres, preferencialmente incluindo letras e números.' });
    }


    try {
        // Verificar se o usuário já existe
        const userExists = await User.findOne({ email: email });

        if (userExists) {
        return res.status(422).json({ msg: 'Usuário já cadastrado. Por favor, utilize outro e-mail.' });
        }

        // Se tudo estiver correto, chame next()
        next();
    } catch (error) {
        // Tratar erros de findOne, se necessário
        console.error('Erro ao verificar usuário existente:', error);
        return res.status(500).json({ msg: 'Erro interno do servidor.' });
    }
};
