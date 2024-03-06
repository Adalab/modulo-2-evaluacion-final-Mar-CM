'use strict';

const nameInput = document.querySelector('.js-name');
const buttonSearch = document.querySelector('.js-search');
const error = document.querySelector('.js-error');
const seriesList = document.querySelector('.js-list-series');
const buttonReset = document.querySelector('.js-reset');
const containerFavSeries = document.querySelector('.js-list-series-fav');
const buttonDeleteFav = document.querySelector('.js-delete-fav');

let favoriteSeries = [];

// No borra las series favoritas almacenadas en el localStorage
const storedFavoriteSeries = localStorage.getItem('favoriteSeries');
    if (storedFavoriteSeries) {
        favoriteSeries = JSON.parse(storedFavoriteSeries);

        // Renderizar las series favoritas en el contenedor
        containerFavSeries.innerHTML = favoriteSeries.map(series => `
            <li class="fav-series">
                ${series}
                <button class="close">X</button>
            </li>
        `).join('');
};

// Función que busca las series, incluye condicional y favoritos ya que solo podemos añadir fav cuando se pintan en la web.
function renderAnime(animesList){
    seriesList.innerHTML= '';
    
    for (const anime of animesList){//Condicional, si la foto, es un url, cambiar por la otra foto, sino, dejarlo.
        if (anime.images.jpg.image_url === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'){
            const imageUrl = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
            seriesList.innerHTML += `
                <div class= "js-seriesAnime result__anime" id="${anime.mal_id}">
                    <h3>${anime.title}</h3>
                    <img class="result__img" src="${imageUrl}">
                </div>`
        } else {
            seriesList.innerHTML += `
            <div class= "js-seriesAnime result__anime" id="${anime.mal_id}">
                <h3>${anime.title}</h3>
                <img class="result__img" src="${anime.images.jpg.image_url}">
            </div>`
        }
    };

    const seriesFav = document.querySelectorAll('.js-seriesAnime');
    for (const favorite of seriesFav){
        favorite.addEventListener('click', handleAddFav)
    };
};

//Evento sobre botón buscar - pediremos al servidor datos al clickar buscar.
function handleSearch(event){
    event.preventDefault();
    const nameSerieAnime = nameInput.value;

    if (nameSerieAnime === "" ){
        error.innerHTML = `Por favor, introduce un nombre.`;
    } else {
            // Petición al servidor de mostrar las series depende de lo q busque el usuario. He hecho esto, ya que si no pone nada, no se mostrará.
        fetch(`https://api.jikan.moe/v4/anime?q=${nameSerieAnime}`)
        .then(response => response.json())
        .then (data => {
            const animesList = data.data;
            renderAnime(animesList); //hemos sacado la función que nos mostrará la busqueda del input.
        })
    }
}

function handleDeleteFav(){
    // modificar el array de series quitar elementos y luego volver a pintar. Quitar el elemento del array.

    //pistas: localizar la posicion del elemento del array qe ha clicado y cuando tenga la posición puedes borrarlo.
}

// Función de favoritos y guardar en localstorage
function handleAddFav(event) {
    const favAnime = event.currentTarget.innerHTML;

    // Buscar si el elemento seleccionado ya existe en favoritos
    if (!favoriteSeries.includes(favAnime)) {
        favoriteSeries.push(favAnime);

        // Almacenar los datos una vez que los incluimos en favoritos
        localStorage.setItem('favoriteSeries', JSON.stringify(favoriteSeries));

        containerFavSeries.innerHTML += `
            <li class="fav-series">
                ${favAnime}
                <button class="close js-close-fav">X</button>
            </li>`;
        // Cambiar el fondo de la serie seleccionada
        event.currentTarget.style.backgroundColor = 'white';
        event.currentTarget.style.color = '#A1767A';
    }

    const buttonDeleteFav = document.querySelector('.js-close-fav');
    buttonDeleteFav.addEventListener('click', handleDeleteFav);
}

//Evento sobre el botón reset - borrará todo el contenido
function handleReset(){
    seriesList.innerHTML = "";
    containerFavSeries.innerHTML = "";
    favoriteSeries = [];
    const nameInput = "";

    // Eliminamos del local los datos tmb al dar a reset
    localStorage.removeItem('favoriteSeries');
}

//Evento sobre el botón fav - elimina los fav.
function handleClickRemoveFav() {
    containerFavSeries.innerHTML = "";
    localStorage.removeItem('favoriteSeries');
}

buttonDeleteFav.addEventListener('click', handleClickRemoveFav);
buttonReset.addEventListener('click', handleReset);
buttonSearch.addEventListener('click', handleSearch);