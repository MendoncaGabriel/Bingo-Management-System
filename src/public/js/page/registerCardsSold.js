const cardsSelect = document.getElementById('cardsSelect')
const filterNumerBingo = document.getElementById('filterNumerBingo')
let dataServer = []
let listagemAtual = 0


filterNumerBingo.addEventListener('keyup', (e)=>{
    if(e.keyCode == 13){
        const listBingo = document.querySelector('tbody#listBingo')
   
        let index = Number(e.target.value)

        if(index == "", index == 0){
            handleData(dataServer)
            return
        }
        
        if(index <= dataServer.bingoCards.length){
            const info = dataServer.bingosSold.find(e => e.index ==  index - 1)

            listBingo.innerHTML = `
            <tr class="bg-white text-sm filterNumber" name="${index - 1}">
                <td class="p-2 border" >
                    <p class="text-center" name="index">${index }</p>
                </td>
    
                <td class="p-2 border">
                    <input type="text" value="${info && info.name ? info.name : ''}" name="name" class="p-2" placeholder="Nome do comprador">
                </td>
    
                <td class="p-2 border">
                    <input type="tel"  value="${info && info.contato ? info.contato : ''}" name="contato" class="p-2 w-40" placeholder="Numero para contato">
                </td>
    
                <td class="p-2 border">
                    <input type="text"  value="${info && info.endereco ? info.endereco : ''}" name="endereco" class="p-2 " placeholder="rua: N99 - Bairro ">
                </td>
    
                <td class="p-2 border">
                    <input type="text"  value="${info && info.cpf ? info.cpf : ''}" name="cpf" class="p-2  w-28 " placeholder="000.000.000-00">
                </td>
    
                <td class="p-2 border">
                    <input type="text"  value="${info && info.vendedor ? info.vendedor : ''}" name="vendedor" class="p-2  " placeholder="Nome do Vendedor">
                </td>
    
                <td class="border">
                    <select class="p-2 text-sm w-full h-full" name="status">
                        <option value="true" ${info && info.status === true ? 'selected' : ''}>VENDIDO</option>
                        <option value="false" ${info && info.status == true ? '' : 'selected'}>NÃO VENDIDO</option>
                    </select>
                </td>
    
                <td class="p-2 border">
                    <button onclick="updateData(this)" class="p-2 m-auto block bg-blue-600 hover:bg-blue-500 rounded-sm hover:shadow text-white">SALVAR</button>
                </td>
            </tr>`
        }else{
            listBingo.innerHTML = ""
        }

    }
})

cardsSelect.addEventListener('change', (e)=>{
    getListCardBingo(e.target.value)

  
    setTimeout(() => {
        document.getElementById('paginacao').classList.replace('hidden', 'flex')
        
    }, 500);
})


// BUSCA JOGO POR ID
function getListCardBingo(id){
    try {
        fetch(`card/cards/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            dataServer = res
            handleData(res)
        })
    } catch (error) {
        console.log(error)
    }
}

function dividirArray(array, tamanhoPedaco) {
    const pedacos = [];
    for (let i = 0; i < array.length; i += tamanhoPedaco) {
        pedacos.push(array.slice(i, i + tamanhoPedaco));
    }
    return pedacos;
}

function handleData(data){
    const pedaco = dividirArray(data.bingoCards, 50)
    listagem(pedaco.length)
    renderList(pedaco[listagemAtual], data.bingosSold)
}
    
function formatarData(timestamp) {
    if (!timestamp) {
        return "Timestamp não definido";
    }

    const date = new Date(timestamp);

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();

    const hora = String(date.getHours()).padStart(2, '0');
    const minuto = String(date.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} - ${hora}:${minuto}`;
}


function listagem() {
    const qtdItens = dataServer.bingoCards.length; //5000
    const inicio = listagemAtual; //99
    const comprimento = 5;
    let fim = Math.min(inicio + comprimento - 1, 100); // Limitando o fim ao máximo de 100

    // Se 'inicio' for maior que 95, ajustamos o fim para garantir que 100 esteja presente
    if (inicio > 95 && fim < 100) {
        fim = 100;
    }

    let listagemComponent = '';
    for (let i = inicio; i <= fim; i++) {
        // Adicionando 1 a 'i' para obter o número real
        const numeroReal = i + 1;
        // Verificando se 'numeroReal' excede o limite de 100
        if (numeroReal > 100) break;

        listagemComponent += `
            <li class="">
                <button onclick="mudarListagem(${i})" class="p-2 ${i === listagemAtual ? 'bg-verde text-white' : ''} hover:text-white rounded-full hover:bg-verde">${numeroReal}</button>
            </li>
        `;
    }

    document.getElementById("btnNext").setAttribute('onclick', `mudarListagem(${listagemAtual + 5})` )
    document.getElementById("btnPrevious").setAttribute('onclick', `mudarListagem(${ listagemAtual >= 5 ? listagemAtual - 5 : 0})` )

    document.getElementById('listagem').innerHTML = listagemComponent;
}





function mudarListagem(n){
    listagemAtual = n
    handleData(dataServer)
}

function renderList(data, bingosSold){
    const listBingo = document.querySelector('tbody#listBingo')
    let lista = ''

    data.map((e, index) => {
        const i = listagemAtual == 0 ? index : listagemAtual * 50 + index
        const info = bingosSold.find(e => e.index ==  i)

        lista += `
            <tr class="bg-white text-sm filterNumber" name="${i + 1}">
                <td class="p-2 border" >
                    <p class="text-center" name="index">${i + 1}</p>
                </td>

                <td class="p-2 border">
                    <input type="text" value="${info && info.name ? info.name : ''}" name="name" class="p-2" placeholder="Nome do comprador">
                </td>

                <td class="p-2 border">
                    <input type="tel"  value="${info && info.contato ? info.contato : ''}" name="contato" class="p-2 w-40" placeholder="Numero para contato">
                </td>

                <td class="p-2 border">
                    <input type="text"  value="${info && info.endereco ? info.endereco : ''}" name="endereco" class="p-2 " placeholder="rua: N99 - Bairro ">
                </td>
    
                <td class="p-2 border">
                    <input type="text"  value="${info && info.cpf ? info.cpf : ''}" name="cpf" class="p-2  w-28 " placeholder="000.000.000-00">
                </td>

                <td class="p-2 border">
                    <input type="text"  value="${info && info.vendedor ? info.vendedor : ''}" name="vendedor" class="p-2  " placeholder="Nome do Vendedor">
                </td>
    
                <td class="border">
                    <select class="p-2 text-sm w-full h-full" name="status">
                        <option value="true" ${info && info.status === true ? 'selected' : ''}>VENDIDO</option>
                        <option value="false" ${info && info.status == true ? '' : 'selected'}>NÃO VENDIDO</option>
                    </select>
                </td>

                <td class="p-2 border">
                    <button onclick="updateData(this)" class="p-2 m-auto block bg-blue-600 hover:bg-blue-500 rounded-sm hover:shadow text-white">SALVAR</button>
                </td>
            </tr>
        `
    
        listBingo.innerHTML = lista
    });

}

function updateData(button) {
    const tr = button.parentNode.parentNode
    const item = {
        cartela_id: document.getElementById('cardsSelect').value,
        index: Number(tr.querySelector('p[name="index"]').innerHTML) - 1,
        name: tr.querySelector('input[name="name"]').value,
        contato: tr.querySelector('input[name="contato"]').value,
        endereco: tr.querySelector('input[name="endereco"]').value,
        status: tr.querySelector('select[name="status"]').value,
        cpf: tr.querySelector('input[name="cpf"]').value,
        vendedor: tr.querySelector('input[name="vendedor"]').value,
    }


    fetch('card/sold',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then(res => {
        button.classList.replace('bg-blue-600', 'bg-green-600')
        setTimeout(() => {
            button.classList.replace('bg-green-600', 'bg-blue-600')
        }, 1000);
    })
}
