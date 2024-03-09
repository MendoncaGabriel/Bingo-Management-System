
function removerCookie(nome) {
    document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


function logOut(){
    removerCookie('token')
    window.location.href = '/login'
}