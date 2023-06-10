'use strict';

/** 
 * Add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
    for(const elem of elements) elem.addEventListener(eventType, callback);
}

/** 
 * Toogle search box in mobile device || small screen devices
 */

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers, "click", function () {
    searchBox.classList.toggle("active");
});



/** menyimpan movieId di localStorage ketika  user mengklik suatu movie card */

const getMovieDetail = function(movieId) {
    window.localStorage.setItem("movieId", String(movieId));
}


const getMovieList = function(urlParam, genreName){
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("genreName", genreName);
}
