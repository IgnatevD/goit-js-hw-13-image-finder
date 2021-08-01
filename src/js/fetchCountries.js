
import _ from 'lodash';
import countryCard from '../templates/countrys';
import countryList from '../templates/countryList';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { error } from "@pnotify/core";

const BASE_URL = 'https://restcountries.eu/rest/v2/name/';
const cardNode = document.querySelector('.country_card');
const inputNode = document.querySelector('.country_input');

inputNode.addEventListener('input', _.debounce(fetchCountries, 500));

function fetchCountries(searchQuery) {
  fetch(BASE_URL + searchQuery.target.value)
    .then(response => response.json())
    .then(countrys => {
        if (countrys.length === 1) {
            cardNode.innerHTML = countryCard(countrys[0]);
        }
        else if (countrys.length <= 10 && countrys.length >= 2) {
            const obj = {};
            obj.country = countrys.map(country => country.name);
            cardNode.innerHTML = countryList(obj);}
        else {errorFn()}
    })
}

function errorFn () {
    error({
          title: "Ошибка ввода",
          text: "Введите полное и верное название страны",
        })
}

