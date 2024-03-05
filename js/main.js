'use strict';

const nameInput = document.querySelector('.js-name');
const buttonSearch = document.querySelector('.js-search');
const seriesList = document.querySelector('.js-list-series');
const buttonReset = document.querySelector('.js-reset');


function renderAnime(animesList){
    for (const anime of animesList){
        console.log(anime)
        seriesList.innerHTML += `<li class= "search">${anime.title}<img src="${anime.images.jpg.image_url}"></li>`;
    }
}

//Evento sobre botón buscar - pediremos al servidor datos al clickar buscar.
function handleSearch(event){
    event.preventDefault();
    const nameAnime = nameInput.value;
    // Petición al servidor de mostrar las series depende de lo q busque el usuario
    fetch(`https://api.jikan.moe/v4/anime?q=${nameAnime}`)
    .then(response => response.json())
    .then (data => {
        const animesList = data.data;
        renderAnime(animesList); //hemos sacado la función que nos mostrará la busqueda del input.
    })
}

//Evento sobre el botón reset - borrará todo el contenido
function handleReset(){
    seriesList.innerHTML = "";
    const nameInput = "";
}

buttonReset.addEventListener('click', handleReset)
buttonSearch.addEventListener('click', handleSearch);