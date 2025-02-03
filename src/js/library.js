import { fetchTrendingMovies } from "./api.js";
import { getLibraryMovies, toggleLibrary } from "./storage.js";

const libraryContainer = document.querySelector("#library-container");
const loadMoreBtn = document.querySelector("#load-more");
const emptyLibraryMessage = document.querySelector(".empty-library");

let loadedMovies = 0;
const moviesPerPage = 9;

async function loadMovies() {
    let allMovies = await fetchTrendingMovies();
    let libraryMovies = getLibraryMovies();
    let filteredMovies = allMovies.filter(movie => libraryMovies.some(libMovie => libMovie.id === movie.id));

    if (filteredMovies.length === 0) {
        emptyLibraryMessage.style.display = "block";
        loadMoreBtn.style.display = "none";
        return;
    } else {
        emptyLibraryMessage.style.display = "none";
    }

    let moviesToShow = filteredMovies.slice(loadedMovies, loadedMovies + moviesPerPage);

    moviesToShow.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie-card");
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
            <button class="library-btn" data-id="${movie.id}">${toggleLibrary(movie)}</button>
        `;
        libraryContainer.appendChild(movieElement);
    });

    loadedMovies += moviesToShow.length;
    if (loadedMovies >= filteredMovies.length) {
        loadMoreBtn.style.display = "none";
    }
}

loadMoreBtn.addEventListener("click", loadMovies);

document.addEventListener("DOMContentLoaded", loadMovies);
