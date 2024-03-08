function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}


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
    .then(res => {
        if(res.status !== 200) {
            // Se o status não for 200, mostra a mensagem de erro
            return res.json().then(data => {
                alert(data.msg);
                throw new Error(data.msg);
            });
        }
        // Se o status for 200, continua com a resposta JSON
        return res.json();
    })
    .then(res =>{
        console.log(res)
        setCookie('token', res.token, 30);
        window.location.href = '/';
    })
    .catch(err => {
        console.log(err)
    })
}