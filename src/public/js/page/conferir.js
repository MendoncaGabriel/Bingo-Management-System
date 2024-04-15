
const bingoSelect = document.querySelector('#bingoSelect')
const insertPedra = document.querySelector('#insertPedra')
const rankList = document.querySelector('#rankList')
const pedrasDigitadas = document.querySelector('#pedrasDigitadas')
const ultimaPedra = document.querySelector('#ultimaPedra')
const btnLimpar = document.querySelector('#btnLimpar')

let bingos = []
const pedras = []
let bingoPattern = 0
var contGanhadores = 0;

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
    if(pedra > bingoPattern || pedra <= 0){
        alert('Fora de Escala!')
        insertPedra.value = ''
        return
    }

    if(!pedras.includes(Number(pedra))){
        if(pedras.length >= bingoPattern){
            alert("JOGO ENCERRADO!")
            return
        }

        // persistir
        if(!localStorage.pedras){
            localStorage.pedras = JSON.stringify([Number(e.target.value)])
        }else{
            let old = JSON.parse(localStorage.pedras)
            old.push(Number(e.target.value))
            localStorage.pedras = JSON.stringify(old)
        }

        pedras.push(Number(pedra))

        ultimaPedra.innerText = verificarColuna(pedra)
        ultimaPedra.classList.replace('text-8xl', 'text-9xl')
        insertPedra.value = ''
    }else{
        alert('Pedra ja foi inserida!')
        insertPedra.value = ''
    }

    let lista = ''
    for(let i of pedras){
        lista += `<li class="p-2  flex items-center justify-center rounded-xl bg-white text-verde font-semibold text-lg w-10 h-10 flex-none ">${verificarColuna(i)}</li>`
    }
    pedrasDigitadas.innerHTML = lista



    verificar()
})



function verificar() {
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
    console.log(ordenado)
    localStorage.rank = JSON.stringify(ordenado)
    renderRank(ordenado)
}

if(localStorage.rank){
    const ordenado = JSON.parse(localStorage.rank)
    renderRank(ordenado)
}


if(localStorage.pedras || localStorage.rank){
    btnLimpar.classList.remove('hidden')
}

btnLimpar.addEventListener('click', ()=>{
    const res = prompt('Deseha limpar memoria do jogo?: sim/não')
    if(res == 'sim'){
        localStorage.clear();
        window.location.reload()

    }
})

//renderizar top 10
function renderRank(ocorrencias){
    rankList.innerHTML = '';

    // Definindo o limite do loop com base no comprimento de ocorrencias
    const limiteLoop = Math.min(ocorrencias.length, 5);

    let ganha = []

    // Loop para renderizar até 10 elementos, ou menos se ocorrencias.length for menor que 10
    for(let i = 0; i < limiteLoop; i++){ 
        rankList.innerHTML += `<li class=" ${ocorrencias[i].cont >= 25 ? 'bg-blue-600 text-white' : 'bg-white text-verde'} px-2 py-1 rounded-full  text-center font-semibold text-lg">N: ${ocorrencias[i].cont} - ${ocorrencias[i].item.name} </li>`;
       if(ocorrencias[i].cont >= 25){
        ganha.push(ocorrencias[i])
       }  
    }

    if(ganha.length > 0){

        ganhadores(ganha)
        contGanhadores = ganha.length
    }

}



function ganhadores(data){
    console.log('Ganhadores Existentes: ', contGanhadores)
    console.log('Ganhadores Atuais: ', data.length)

    if(contGanhadores == 0){
        contGanhadores = data.length
        console.log('Atualizado Ganhadores Existentes', contGanhadores)
    }

    // verificar pois não esta aparecendo !!
    // editar ultma pedra!
    // trancar uma cartela
    // ajustar tamnaho do bingo na cartela

    if(data.lengh > contGanhadores){
       
        document.getElementById('ganhadores').classList.remove('hidden')
        document.getElementById('ganhadores').style.display = 'block'

        return
    }

}



function jogar(){

    if(bingoSelect.value != ""){
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




        if(localStorage.pedras){
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
            
            const pedrasSaved = JSON.parse(localStorage.pedras)
        
            let lista = ''
            
            for(let i of pedrasSaved){
                pedras.push(i)
                let p = verificarColuna(Number(i))
              
                lista += `<li class="p-2  flex items-center justify-center rounded-xl bg-white text-verde font-semibold text-lg w-10 h-10 flex-none ">${p}</li>`
            }
        
            pedrasDigitadas.innerHTML = lista
        
        }
    }else{
        alert('Selecione um jogo!')
    }
    
}



  



let look = true
function telacheia(){

    //ocultar navbar
    if(look == true){
        document.getElementById('navbar').style.display = 'none'
        document.getElementById('default-sidebar').style.display = 'none'
        document.getElementById('tela').style.width = '100%'
        document.getElementById('tela').classList.remove('max-w-[95%]')
        document.getElementById('tela').classList.replace('col-span-5', 'col-span-6')
        look = false

        
        return
    }
    
    //ocultar asside
    if(look == false){
        document.getElementById('navbar').style.display = 'flex'
        document.getElementById('default-sidebar').style.display = 'block'
        document.getElementById('tela').classList.add('max-w-[95%]')
        document.getElementById('tela').classList.replace('col-span-6', 'col-span-5')
        look = true
    }
    
}