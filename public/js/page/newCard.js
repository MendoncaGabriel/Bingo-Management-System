

function createNewCard(){
    fetch('/card/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            {
                title: document.querySelector('#title').value,
                category: document.querySelector('#category').value,
                bingosForCards: document.querySelector('#category').value,
                NumberOfCards: document.querySelector('#bingosForCards').value,
                bingoPattern: document.querySelector('input[name="bordered-radio"]:checked').value,
                background: "https://i.pinimg.com/564x/71/d6/fa/71d6fa7b5b6ecfa5ef17594774391cf6.jpg"
            }
            
        })
    })
}