

function register(){
    const data = {
        name: document.querySelector('input#name').value,
        email: document.querySelector('input#email').value,
        password: document.querySelector('input#password').value,
    }

    fetch('/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res =>{
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}