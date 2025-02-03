import { fetchTrendingMoviesForThisWeek } from './api.js';

document.getElementById('view-all').addEventListener('click', async () => {
 
  const movies = await fetchTrendingMoviesForThisWeek(1); 
 
  const movieContainer = document.getElementById('trend-movies');
  movieContainer.innerHTML = '';


  movies.results.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    movieElement.innerHTML = `
      const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'yedek-gorsel-url.jpg';

      <h3>${movie.title}</h3>
      <p>${movie.overview}</p>
    `;

    movieContainer.appendChild(movieElement);
  });
});
