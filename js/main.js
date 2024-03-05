'use strict';

const nameInput = document.querySelector('.js-name');
const buttonSearch = document.querySelector('.js-search');
const seriesList = document.querySelector('.js-list-series');



const buttonReset = document.querySelector('.js-reset');

//Evento sobre botón buscar - pediremos al servidor datos al clickar buscar.

const handleSearch = (event) => {
    event.preventDefault();
    const nameAnime = nameInput.value;
    console.log(nameAnime);

}


buttonSearch.addEventListener('click', handleSearch);