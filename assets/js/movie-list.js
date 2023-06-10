'use strict';

import { api_key, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";
import { sidebar } from "./sidebar.js";
import {search} from "./search.js";


// collect genreName & urlParam from localStorage  
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");

const pageContent = document.querySelector("[page-content]");



sidebar();
search();

let currentPage = 1;
let totalPages = 0;


fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, function({results: movieList, total_pages}) {

    totalPages = total_pages;

    document.title = `${genreName} Movies - SobatFilm`;

    const movieListElem = document.createElement('section');
    movieListElem.classList.add("movie-list", "genre-list");
    movieListElem.ariaLabel = `${genreName} Movies`;

    movieListElem.innerHTML = `
        <div class="title-wrapper">
            <h3 class="title-large">All ${genreName} Movies</h3>
        </div>

        <div class="grid-list">
            
        </div>

        <button class="btn load-more" load-more>Load More</button>
    `;


    /** add movie card based on fetched genre */

    for (const movie of movieList) {
        const movieCard = createMovieCard(movie);

        movieListElem.querySelector(".grid-list").appendChild(movieCard);
    }

    pageContent.appendChild(movieListElem);


    /** Load More button functionality */

    document.querySelector("[load-more]").addEventListener("click", function() {

        if (currentPage >= totalPages) {
            this.style.display = "none"; // this == load-more-btn
            return;
        }

        currentPage++;
        this.classList.add("loading"); //this == loading-btn

        fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, ({results: movieList}) => {
            
            this.classList.remove("loading"); //  this == loading-btn

            for (const movie of movieList) {
                const movieCard = createMovieCard(movie);

                movieListElem.querySelector(".grid-list").appendChild(movieCard);

            }

        });

    })
});


