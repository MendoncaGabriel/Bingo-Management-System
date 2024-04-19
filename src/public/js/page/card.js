function deleteCard(id){
    const res = prompt('Deseja apagar esta cartela?: sim, não')

    if(res == 'sim'){
        fetch('/card/'+id, {
            method: 'DELETE',
        })
        .then(res => {
            if(res.status == 200){
                window.location.reload()
            }
            res.json()
        })
        .catch((err) => {
            console.error('Error during fetch:', err);
        });
    }
}

function updateCard(cardId) {
    // Obtenha a referência para o input de arquivo de imagem
    var imageInput = document.querySelector('#background');
    var imageData = new FormData();

    // Adicione a imagem ao objeto FormData
    if(imageInput.files[0]){

        imageData.append('background', imageInput.files[0]);
    }

    // Adicione outras informações no formato JSON ao objeto FormData
    imageData.append('title', document.querySelector('#title').value);
    imageData.append('category', document.querySelector('#category').value);
    imageData.append('bingosForCards', document.querySelector('#bingosForCards').value);
    imageData.append('NumberOfCards', document.querySelector('#NumberOfCards').value);
    imageData.append('bingoPattern', document.querySelector('input[name="bordered-radio"]:checked').value);

    // Faça a requisição PATCH com 'multipart/form-data'
    fetch(`/card/${cardId}`, {
        method: 'PATCH',
        body: imageData,
    })
        .then((res) => {
            if (res.status === 200) {
                window.location.href = '/cartelas';
            }
            return res.json();
        })
        .catch((err) => {
            console.error('Error during fetch:', err);
        });
}

function loadCreate(){
    document.querySelector('#btnSpanCreate').classList.add('hidden')
    document.querySelector('#loadSpin').classList.remove('hidden')
}

function stopLoadCreate(){
    document.querySelector('#btnSpanCreate').classList.remove('hidden')
    document.querySelector('#loadSpin').classList.add('hidden')
}

function createNewCard() {
    loadCreate()
    // Obtenha a referência para o input de arquivo de imagem
    var imageInput = document.querySelector('#background');
    var imageData = new FormData();

    // Adicione a imagem ao objeto FormData
    imageData.append('background', imageInput.files[0]);

    // Adicione outras informações no formato JSON ao objeto FormData
    imageData.append('title', document.querySelector('#title').value);
    imageData.append('category', document.querySelector('#category').value);
    imageData.append('bingosForCards', document.querySelector('#bingosForCards').value);
    imageData.append('NumberOfCards', document.querySelector('#NumberOfCards').value);
    imageData.append('bingoPattern', document.querySelector('input[name="bordered-radio"]:checked').value);


    // Faça a requisição POST com 'multipart/form-data'
    fetch('/card', {
        method: 'POST',
        body: imageData
    })
    .then(res => {
        if(res.status == 200){
            window.location.href = '/cartelas'
            stopLoadCreate()
        }
    })
    .catch((err) => {
        stopLoadCreate()
        alert('Erro durante a criação do bindo, Porfavor verifique o formulario!')
        console.error('Error during fetch:', err);
    });
}