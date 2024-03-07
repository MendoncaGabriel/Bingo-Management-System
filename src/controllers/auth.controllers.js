exports.register = (req, res) =>{
    const {name, email, password} = req.body

    if(!name){
        res.status(400).json({msg: 'name não enviado'})
    }
    if(!email){
        res.status(400).json({msg: 'email não passado'})
    }
    if(!password){
        res.status(400).json({msg: 'password não passado'})
    }


    console.log(    'teste')
    res.status(200).json({msg: 'ok'})
}