const bingoSelect = document.querySelector('#bingoSelect')
const insertPedra = document.querySelector('#insertPedra')
const rankList = document.querySelector('#rankList')
const pedrasDigitadas = document.querySelector('#pedrasDigitadas')
const ultimaPedra = document.querySelector('#ultimaPedra')

let bingos = []
const pedras = []
let bingoPattern = 0


//selecionar deck de cartelas
bingoSelect.addEventListener('change', (e)=>{
    const id = bingoSelect.value

    fetch(`/card/vendidos/${id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(res => {
        bingos = res.cardSold
        bingoPattern = res.bingoPattern
    })
})



//inserir pedras
insertPedra.addEventListener('change', (e)=>{
    if(bingoSelect.value == ''){
        alert('Selecione Um Jogo!')
        insertPedra.value = ''
        return
    }

    const pedra =  insertPedra.value
    if(pedra > bingoPattern){
        alert('Fora de Escala!')
        insertPedra.value = ''
        return
    }

    if(!pedras.includes(Number(pedra))){
        console.log(pedras.length)

        if(pedras.length >= bingoPattern){
            alert("JOGO ENCERRADO!")
            return
        }

        pedras.push(Number(pedra))
        ultimaPedra.innerText = verificarColuna(pedra)
        insertPedra.value = ''
    }else{
        alert('Pedra ja foi inserida!')
        insertPedra.value = ''
    }




    let lista = ''
    

    for(let i of pedras){
        lista += `<li class="p-5  flex items-center justify-center rounded-xl bg-white text-verde font-semibold text-lg w-10 h-10 flex-none ">${verificarColuna(i)}</li>`
    }
    pedrasDigitadas.innerHTML = lista


    verificar()
})

function verificarColuna(i){
    if(bingoPattern == 75){
        if(i >= 1 && i <= 15) return 'B' + i
        if(i >= 16 && i <= 30) return 'I' + i
        if(i >= 31 && i <= 45) return 'N' + i
        if(i >= 46 && i <= 60) return 'G' + i
        if(i >= 61 && i <= 75) return 'O' + i
        
    }else if(bingoPattern == 100){
        if(i >= 1 && i <= 20) return 'B' + i
        if(i >= 21 && i <= 40) return 'I' + i
        if(i >= 41 && i <= 60) return 'N' + i
        if(i >= 61 && i <= 80) return 'G' + i
        if(i >= 81 && i <= 100) return 'O' + i

    }


    return i
}

function verificar() {
    
    console.log('BINGOS: ', bingos); 
    console.log('PEDRAS DIGITADAS: ', pedras);

    const ocorrencias = []

    for (let b of bingos){

        let ocorrencia = {cont: 0, item: []}
        for(let pb of b.bingo){

            for(let p of pedras){
                if(pb  == p){
                    ocorrencia.cont += 1
                    ocorrencia.item = b
                }
            }
            
            
        }
        if(ocorrencia.cont > 0){
            ocorrencias.push(ocorrencia)
        } 
    }

    const ordenado = ocorrencias.sort((a, b) => b.cont - a.cont)
    console.log('OCORRENCIAS: ' + ordenado.length)
    renderRank(ordenado)

    
}

//renderizar top 10
function renderRank(ocorrencias){
    rankList.innerHTML = '';

    // Definindo o limite do loop com base no comprimento de ocorrencias
    const limiteLoop = Math.min(ocorrencias.length, 10);

    // Loop para renderizar até 10 elementos, ou menos se ocorrencias.length for menor que 10
    for(let i = 0; i < limiteLoop; i++){ 
        rankList.innerHTML += `<li class="text-verde px-2 py-1 rounded-full bg-white text-center font-semibold text-lg">N: ${ocorrencias[i].cont} - ${ocorrencias[i].item.name} </li>`;
    }
}


function jogar(){
    document.querySelector('#modalPlay').classList.add('hidden')
    document.querySelector('#conferencia').classList.replace('hidden', 'block')
 
    

   
    // Obtém o elemento <select> pelo ID
    const selectElement = document.getElementById("bingoSelect");

    // Obtém o índice da opção selecionada
    const selectedIndex = selectElement.selectedIndex;

    // Obtém o texto da opção selecionada
    const selectedOptionText = selectElement.options[selectedIndex].textContent;

    let upperCase = selectedOptionText.toUpperCase()
    //Escreve o titulo
    document.querySelector('#tituloJogo').innerText = upperCase
}