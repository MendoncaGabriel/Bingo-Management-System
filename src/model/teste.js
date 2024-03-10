const bingoGenerator = require('./bingoGenerator')
const checkBingos = require('./checkBingos')

const cartelas = bingoGenerator(10, 75)

//pedras sorteadas
const pedras = [
    1, 15, 17, 19, 21, 26, 27, 35,
    39, 44, 46, 48, 50, 51, 52, 54,
    55, 56, 63, 65, 67, 69, 70, 74,
    75
]; 



const cartelaVencedora = checkBingos(cartelas, pedras);
console.log("Cartela vencedora:", cartelaVencedora);