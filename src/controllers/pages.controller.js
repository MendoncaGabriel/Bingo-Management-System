exports.home = (req, res) =>{
    res.render('index')
}

exports.login = (req, res) => {
    res.render('login')
}

exports.register = (req, res) => {
    res.render('register')
}

exports.newCard = (req, res) => {
    res.render('newCard')
}

exports.cardsList = (req, res) => {
    res.render('cardsList')
}