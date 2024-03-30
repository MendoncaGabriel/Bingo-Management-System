function gerarBingo75() {
    // Função para gerar números aleatórios sem repetição em um intervalo específico
    function gerarNumerosSemRepeticao(min, max, quantidade) {
        let numeros = [];
        while (numeros.length < quantidade) {
            let numero = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!numeros.includes(numero)) {
                numeros.push(numero);
            }
        }
        return numeros.sort((a, b) => a - b); // Ordena do menor para o maior
    }

    let bingo = [];
    // Gerar números para cada faixa e adicionar ao array do bingo
    bingo.push(...gerarNumerosSemRepeticao(1, 15, 5));
    bingo.push(...gerarNumerosSemRepeticao(16, 30, 5));
    bingo.push(...gerarNumerosSemRepeticao(31, 45, 5));
    bingo.push(...gerarNumerosSemRepeticao(46, 60, 5));
    bingo.push(...gerarNumerosSemRepeticao(61, 75, 5));

    return bingo;
}

function gerarBingo100() {
    // Função para gerar números aleatórios sem repetição em um intervalo específico
    function gerarNumerosSemRepeticao(min, max, quantidade) {
        let numeros = [];
        while (numeros.length < quantidade) {
            let numero = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!numeros.includes(numero)) {
                numeros.push(numero);
            }
        }
        return numeros.sort((a, b) => a - b); // Ordena do menor para o maior
    }

    let bingo = [];
    // Gerar números para cada faixa e adicionar ao array do bingo
    bingo.push(...gerarNumerosSemRepeticao(1, 20, 5));
    bingo.push(...gerarNumerosSemRepeticao(21, 40, 5));
    bingo.push(...gerarNumerosSemRepeticao(41, 60, 5));
    bingo.push(...gerarNumerosSemRepeticao(61, 80, 5));
    bingo.push(...gerarNumerosSemRepeticao(81, 100, 5));

    return bingo;
}


module.exports = async function bingoGenerator(amount, range) {
    
    try {
        let cont = 0;
        const bingos = [];

        for (let i = 0; i < amount; i++) {
            let bingo = [];

            if (range == 75) {
                bingo = await gerarBingo75();
            } else if (range == 100) {
                bingo = await gerarBingo100();
            }

            // Converter o array bingo em uma string para verificação de inclusão
            let bingoString = JSON.stringify(bingo);

            if (!bingos.some(b => JSON.stringify(b.bingo) === bingoString)) {
                cont++;
                bingos.push( bingo );
            } else {
                i -= 1;
            }
        }
        return bingos;
    } catch (err) {
        return 'Erro no gerador de bingos!', err;
    }
}






// module.exports = function bingoGenerator(amount, range){
//     try{
//         if(!amount) return "Passe a quantidade de bingos"
//         if(!range) return "passe o modelo de bingo - 75 ou 100 ('Numero aleatorio de 1 a 75 ou 1 a 100')"
        
//         let cont = 0
//         const bingos = []

//         for(let i = 0; i < amount; i++){
//             let bingo = []
//             for(let j = 0; j < 25; j++){
//                 let num = Math.floor(Math.floor(Math.random() * (range - 1 + 1)) + 1)
//                 if(!bingo.includes(num)){
//                     bingo.push(num)
//                 }else{
//                     j -= 1
//                 }
//             }
//             if(!bingos.includes(bingo)){
//                 const order = bingo.sort((a, b) => a - b) 
//                 cont++
//                 bingos.push({number: cont, bingo: order, status: false, buyersName: "", contact: "", date: Date.now()})

        
//             }else{
//                 i -= 1
//             }
//         }
//         return bingos
//     }catch(err){
//         return 'Erro no gerador de bingos!', err
//     }
// }









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


