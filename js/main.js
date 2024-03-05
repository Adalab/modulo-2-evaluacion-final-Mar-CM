'use strict';

const nameInput = document.querySelector('.js-name');
const buttonSearch = document.querySelector('.js-search');
const error = document.querySelector('.js-error');
const seriesList = document.querySelector('.js-list-series');
const buttonReset = document.querySelector('.js-reset');
const containerFavSeries = document.querySelector('.js-list-series-fav');

// Función que busca las series, incluye condicional y favoritos ya que solo podemos añadir fav cuando se pintan en la web.
function renderAnime(animesList){
    console.log(animesList);
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


//función de favoritos y guardar en localstorage
function handleAddFav(event){
    const favAnime = event.currentTarget.innerHTML;
    containerFavSeries.innerHTML += `<li class= "fav-series">${favAnime}</li>`;
    
    //Obtenemos la lista de fav del local
    const storedFavorites = localStorage.getItem('favoritos');
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    //Agregamos nuevo fav al array
    favorites.push(favAnime);
    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('favoritos', JSON.stringify(favorites));
}


//Evento sobre el botón reset - borrará todo el contenido
function handleReset(){
    seriesList.innerHTML = "";
    const nameInput = "";
}

buttonReset.addEventListener('click', handleReset);
buttonSearch.addEventListener('click', handleSearch);