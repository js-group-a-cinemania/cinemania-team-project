import { fetchTrendingMoviesForThisWeek } from './api.js';

document.getElementById('view-all').addEventListener('click', async () => {
  try {
    const movies = await fetchTrendingMoviesForThisWeek(1);
    const movieContainer = document.getElementById('trend-movies');
    movieContainer.innerHTML = '';

    if (!movies || !movies.results || movies.results.length === 0) {
      movieContainer.innerHTML = '<p>No movies found.</p>';
      return;
    }

    movies.results.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'yedek-gorsel-url.jpg';

      movieElement.innerHTML = `
        <img src="${imageUrl}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <p>${movie.overview}</p>
      `;

      movieContainer.appendChild(movieElement);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    movieContainer.innerHTML =
      '<p>Failed to load movies. Please try again later.</p>';
  }
});
