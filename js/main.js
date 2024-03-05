'use strict';

const nameInput = document.querySelector('.js-name');
const buttonSearch = document.querySelector('.js-search');
const seriesList = document.querySelector('.js-list-series');
const buttonReset = document.querySelector('.js-reset');



function renderAnime(animesList){
    seriesList.innerHTML= '';
    
    for (const anime of animesList){//Condicional, si la foto, es un url, cambiar por la otra foto, sino, dejarlo.
        if (anime.images.jpg.image_url === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'){
            const imageUrl = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
            seriesList.innerHTML += `<li class= "search">${anime.title}<img src="${imageUrl}"></li>`;
        } else {
            seriesList.innerHTML += `<li class= "search">${anime.title}<img src="${anime.images.jpg.image_url}"></li>`;
        }
    }
   
}

//Evento sobre botón buscar - pediremos al servidor datos al clickar buscar.
function handleSearch(event){
    event.preventDefault();
    const nameAnime = nameInput.value;

    if (nameAnime === "" ){
        seriesList.innerHTML = `Por favor, introduce un nombre.`;
    } else {
            // Petición al servidor de mostrar las series depende de lo q busque el usuario. He hecho esto, ya que si no pone nada, no se mostrará.
        fetch(`https://api.jikan.moe/v4/anime?q=${nameAnime}`)
        .then(response => response.json())
        .then (data => {
            const animesList = data.data;
            renderAnime(animesList); //hemos sacado la función que nos mostrará la busqueda del input.
        })

    }

   
}

//Evento sobre el botón reset - borrará todo el contenido
function handleReset(){
    seriesList.innerHTML = "";
    const nameInput = "";
}

buttonReset.addEventListener('click', handleReset)
buttonSearch.addEventListener('click', handleSearch);