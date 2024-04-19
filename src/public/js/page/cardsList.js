

const tempoEntreCliques = 3 * 60 * 1000; // 3 minutos em milissegundos
const ultimosCliquesPorId = new Map();

function buildPDF(id) {
    const agora = Date.now();
    
    // Verifica se o ID foi clicado recentemente
    if (ultimosCliquesPorId.has(id)) {
        const ultimoClique = ultimosCliquesPorId.get(id);
        const diferencaTempo = agora - ultimoClique;
        
        // Se o tempo desde o último clique for menor que o tempo mínimo entre cliques, retorna
        if (diferencaTempo < tempoEntreCliques) {
            alert("Aguarde um momento antes de clicar novamente.");
            return;
        }
    }

    // Registra o novo clique para o ID
    ultimosCliquesPorId.set(id, agora);



    fetch(`/cartela/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(res => {
        alert(res.msg);
    })
    .catch(error => {
        console.error(error);
    });
}



async function trancar(id){
    const resposta = prompt('Deseja realmente trancar isto? Uma vez trancado, não será mais possível editar, nem gerar um PDF novamente. Confirmar: sim/não')
    if(resposta == 'sim'){

        const res = await fetch('/card/trancar/' + id, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}
        }) 
        const resJson = await res.json()
        if(res.status == 200){
            alert('Item trancado com sucesso!')
            window.location.reload()
        }else{
            alert('Erro ao trancar item!')
        }

    }
}