var btnEnviar = document.querySelector('#enviar');
btnEnviar.addEventListener('click',() =>{

    //validar los campos
    const name = document.querySelector("#nombre").value;
    const rate = document.querySelector("#rating").value;

    if(nombre === '' && rating === '') return false;

    fetch(
        "/new",{
            method :'POST',
            headers :{'Content-Type':'application/json'},
            body: JSON.stringify({nombre:name,rating: rate})
        }
        
    ).then(res =>res.text()).then(respuesta =>{
        loadPeliculas();
        alert(respuesta);
    });
    

});
    




loadPeliculas();

function loadPeliculas(){

    fetch("/get-peliculas")
    .then(responce =>  responce.json())
    .then(data => {
    const containerPeliculas = document.querySelector('#container-peliculas');
    let html = '';
    data.peliculas.forEach(pelicula => {
        html += `<div>${pelicula.nombre} ${" ===== "}  ${pelicula.rating} </div>`;
    });
    containerPeliculas.innerHTML = html;


    });
}


