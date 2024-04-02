function buildPDF(id){
    console.log('iniciado..')
    fetch(`/cartela/${id}`, {
        method: 'GET',
        
    })
    .then(res => res.json())
    .then(res => {
        window.location.href = res
        console.log('Fim')
    })
    .catch(error => {
        console.log( error)
    })
}