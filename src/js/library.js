import { fetchTrendingMovies } from "./api.js";
import { getLibraryMovies, toggleLibrary } from "./storage.js";

const libraryContainer = document.querySelector("#library-container");
const loadMoreBtn = document.querySelector("#load-more");
const emptyLibraryMessage = document.querySelector(".empty-library-message");

let loadedMovies = 0;
const moviesPerPage = 9;

async function loadMovies() {
    if (!libraryContainer || !loadMoreBtn || !emptyLibraryMessage) return;
    
    try {
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
    } catch (error) {
        console.error("Error loading library movies:", error);
    }
}

if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadMovies);
}

document.addEventListener("DOMContentLoaded", loadMovies);

document.addEventListener("DOMContentLoaded", () => {
    const genreFilter = document.getElementById("genreFilter");
    if (window.genresList && window.genresList.length > 0) {
        updateGenreFilter(window.genresList);
    } else {
        fetchGenres();
    }
});

function updateGenreFilter(genres) {
    const genreFilter = document.getElementById("genreFilter");
    if (!genreFilter) return;
    
    genreFilter.innerHTML = `<option value="all">All Genres</option>`;
    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.name;
        genreFilter.appendChild(option);
    });
}

async function fetchGenres() {
    try {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=9a0d30072ad38e4a4c69d8b167f5dfc1&language=en-US");
        const data = await response.json();

        if (data.genres) {
            window.genresList = data.genres;
            updateGenreFilter(data.genres);
        }
    } catch (error) {
        console.error("Error fetching genres:", error);
    }
}

const loader = document.querySelector(".loader");

export function showLoader() {
    loader.style.display = "block";
}

export function hideLoader() {
    loader.style.display = "none";
}

export function loadMoviesWithLoader(callback) {
    showLoader();
    setTimeout(() => {
        callback();
        hideLoader();
    }, 1000);
}

const scrollUpBtn = document.querySelector("#scroll-up");

if (scrollUpBtn) {
    scrollUpBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollUpBtn.style.display = "block";
        } else {
            scrollUpBtn.style.display = "none";
        }
    });
} 

const LIBRARY_KEY = "myLibrary";

export function getLibraryMovies() {
    return JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
}

export function addMovieToLibrary(movie) {
    let movies = getLibraryMovies();
    if (!movies.some(m => m.id === movie.id)) {
        movies.push(movie);
        localStorage.setItem(LIBRARY_KEY, JSON.stringify(movies));
    }
}

export function removeMovieFromLibrary(movieId) {
    let movies = getLibraryMovies().filter(m => m.id !== movieId);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(movies));
}

export function toggleLibrary(movie) {
    let movies = getLibraryMovies();
    if (movies.some(m => m.id === movie.id)) {
        removeMovieFromLibrary(movie.id);
        return "Add to My Library";
    } else {
        addMovieToLibrary(movie);
        return "Remove from My Library";
    }
}
