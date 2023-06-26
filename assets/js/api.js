'use strict';

const api_key = '8367b5b226d32b7bcd07f585ee724277';
const imageBaseURL = 'https://image.tmdb.org/t/p/';


/**
 * fetch data dari server menggunakan `url` dan menaruh
 * hasilnya kedalam data berbentuk JSON ke dalam `callback`,
 * bersamaan dengan parameter optional (jika ada) ke dalam `optionalParam`.
*/

const fetchDataFromServer = function(url, callback, optionalParam) {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data, optionalParam));
}


export { imageBaseURL,api_key, fetchDataFromServer };
