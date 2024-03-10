module.exports = function bingoGenerator(amount, range){
    try{

        if(!amount) return "Passe a quantidade de bingos"
        if(!range) return "passe o modelo de bingo - 75 ou 100 ('Numero aleatorio de 1 a 75 ou 1 a 100')"

        const bingos = []

        for(let i = 0; i < amount; i++){
            let bingo = []
            for(let j = 0; j < 25; j++){
                let num = Math.floor(Math.floor(Math.random() * (range - 1 + 1)) + 1)
                if(!bingo.includes(num)){
                    bingo.push(num)
                }else{
                    j -= 1
                }
            }
            if(!bingos.includes(bingo)){
                const order = bingo.sort((a, b) => a - b) 
                bingos.push(order)
        
            }else{
                i -= 1
            }
        }
        return bingos
    }catch(err){
        return 'Erro no gerador de bingos!', err
    }
}









// //verificar se tem bingos iguais------------------------------------
// function arraysSaoIguais(arr1, arr2) {
//     return arr1.every((element, index) => element === arr2[index]);
// }
// function temArrayIgual(bingos) {
//     const amount = bingos.length;

//     for (let i = 0; i < amount - 1; i++) {
//         for (let j = i + 1; j < amount; j++) {
//             if (arraysSaoIguais(bingos[i], bingos[j])) {
//                 return true; // Encontrou dois arrays iguais
//             }
//         }
//     }

//     return false; // Não há dois arrays iguais
// }

// const existeArrayIgual = temArrayIgual(bingos);

// if (existeArrayIgual) {
//     console.log("Há pelo menos dois arrays iguais em bingos.", bingos.length);
// } else {
//     console.log("Não há dois arrays iguais em bingos.", bingos.length);
// }


