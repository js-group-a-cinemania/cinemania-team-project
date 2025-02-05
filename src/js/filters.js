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
