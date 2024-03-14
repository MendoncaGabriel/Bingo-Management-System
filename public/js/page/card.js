function deleteCard(id){
    const res = prompt('Deseja apagar esta cartela?: sim, não')

    if(res == 'sim'){
        fetch('/card/delete/'+id, {
            method: 'DELETE',
        })
        .then(res => {
            if(res.status == 200){
                window.location.reload()
            }
            res.json()
        })
        .then(res => {
            console.log(res)
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
    imageData.append('background', imageInput.files[0]);

    // Adicione outras informações no formato JSON ao objeto FormData
    imageData.append('title', document.querySelector('#title').value);
    imageData.append('category', document.querySelector('#category').value);
    imageData.append('bingosForCards', document.querySelector('#bingosForCards').value);
    imageData.append('NumberOfCards', document.querySelector('#NumberOfCards').value);
    imageData.append('bingoPattern', document.querySelector('input[name="bordered-radio"]:checked').value);

    // Faça a requisição PATCH com 'multipart/form-data'
    fetch(`/card/update/${cardId}`, {
        method: 'PATCH',
        body: imageData,
    })
        .then((res) => {
            if (res.status === 200) {
                console.log(res.status);
                window.location.href = '/cartelas';
            }
            return res.json();
        })
        .then((res) => {
            console.log(res);
            // Lógica adicional após a atualização, se necessário
        })
        .catch((err) => {
            console.error('Error during fetch:', err);
        });
}

function createNewCard() {
    // Obtenha a referência para o input de arquivo de imagem
    var imageInput = document.querySelector('#background');
    var imageData = new FormData();

    // Adicione a imagem ao objeto FormData
    imageData.append('background', imageInput.files[0]);

    // Adicione outras informações no formato JSON ao objeto FormData
    imageData.append('title', document.querySelector('#title').value);
    imageData.append('category', document.querySelector('#category').value);
    imageData.append('bingosForCards', document.querySelector('#bingosForCards').value);
    imageData.append('NumberOfCards', document.querySelector('#bingosForCards').value);
    console.log(document.querySelector('input[name="bordered-radio"]:checked').value)
    imageData.append('bingoPattern', document.querySelector('input[name="bordered-radio"]:checked').value);


    // Faça a requisição POST com 'multipart/form-data'
    fetch('/card/create', {
        method: 'POST',
        body: imageData
    })
    .then(res => {
        if(res.status == 200){
            window.location.href = '/cartelas'
        }
        res.json()
    })
    .then(res => {
        console.log(res)
    })
    .catch((err) => {
        console.error('Error during fetch:', err);
    });
}


function downloadPdf(id) {
    fetch(`/pdf/create/${id}`, {
        method: 'POST',

    })
    .then(res => {
        if (res.status === 200) {
            // Faça uma segunda requisição para baixar o arquivo
            fetch(`/pdf/meupdf.pdf`, {
                method: 'GET',
            })
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'meupdf.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(err => console.error('Erro durante a requisição do arquivo PDF:', err));
        }
    })
    .catch(err => console.error('Erro durante a criação do PDF:', err));
}
