import { fetchTrendingMovies } from './api';

async function weekly() {
  const weeklyMovies = await fetchTrendingMovies();
  const movieContainer = document.querySelector('.weeklyTrendsContent');
  weeklyMovies.results.slice(0, 3).forEach(movie => {
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'yedek-gorsel-url.jpg';

    const movieElement = `
        <div class="MovieCard">
          <img class="MovieCardİmg" src="${imageUrl}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>${movie.vote_average} / ${movie.popularity}</p>
        </div>
      `;

    movieContainer.insertAdjacentHTML('beforeend', movieElement);
  });
}
weekly();

const buttonSelector = document.querySelector('#viewAll');

buttonSelector.addEventListener('click', async () => {
  const movieContainer = document.querySelector('.weeklyTrendsContent');
  movieContainer.innerHTML = '';

  try {
    const movies = await fetchTrendingMovies();

    if (!movies || !movies.results || movies.results.length === 0) {
      console.log('Film bulunamadı.');
      return;
    }

    movies.results.forEach(movie => {
      const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'yedek-gorsel-url.jpg';

      const movieElement = `
        <div class="movie-card">
          <img src="${imageUrl}" alt="${movie.title}" />
          <h3>${movie.original_title}</h3>
          <p>${movie.vote_average} / ${movie.popularity}</p>
        </div>
      `;

      movieContainer.insertAdjacentHTML('beforeend', movieElement);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    movieContainer.innerHTML =
      '<p>Failed to load movies. Please try again later.</p>';
  }
});
