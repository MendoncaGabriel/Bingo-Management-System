function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}


function logIn(){
    const data = {
        email: document.querySelector('input#email').value,
        password: document.querySelector('input#password').value,
    }

    fetch('/auth/logIn', {
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
 
        const rememberCheckBox = document.querySelector('input#remember')
        if (rememberCheckBox.checked) {
            setCookie('token', res.token, 30);
        } else {
            setCookie('token', res.token, 1);
        }
        window.location.href = '/';
    })
    .catch(err => {
        console.log(err)
    })
}