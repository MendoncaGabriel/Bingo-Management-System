module.exports = function checkBingos(cartelas, pedras){
    try{
        if(!cartelas) return 'Passe o array com as cartelas!'
        if(!pedras) return 'Passe o array com as pedras sorteadas!'
        
        let cartelaVencedora = null;
        let numerosMaisProximos = 0;
        
        for (const cartela of cartelas) {
            const numerosSorteadosNaCartela = cartela.filter(numero => pedras.includes(numero)).length;
        
            if (numerosSorteadosNaCartela >= 25) {
            return {msg: 'Cartela vencedora!',  cartela: cartela, ocorrencias: numerosSorteadosNaCartela }; // Vence imediatamente se tiver 25 ou mais números
            }
        
            if (numerosSorteadosNaCartela > numerosMaisProximos) {
            numerosMaisProximos = numerosSorteadosNaCartela;
            cartelaVencedora = {msg: 'Cartela mais proxima de vencer e:', cartela: cartela, ocorrencias: numerosSorteadosNaCartela};
            }
        }
        
        return cartelaVencedora;
        
        
    }catch(err){
        return 'Erro em verificação de bingo!'
    }
}