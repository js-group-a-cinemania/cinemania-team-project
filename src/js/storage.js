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