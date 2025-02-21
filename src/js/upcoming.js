import axios from 'axios';

const API_KEY = 'cacaf4fb30e4adeda0cb251474aaa7da';
const BASE_URL = 'https://api.themoviedb.org/3';

let movieLibrary = JSON.parse(localStorage.getItem('movieLibrary')) || [];

async function fetchUpcomingMovies() {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: '1',
      },
    });

    const movies = response.data.results;

    let movieHTML = '';
    if (movies.length > 0) {
      const movie = movies[0]; // Sadece ilk filmi alıyoruz
      const posterURL = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';
      const isInLibrary = movieLibrary.some(
        libMovie => libMovie.id === movie.id
      );

      movieHTML = `
        <div class="UpcomingMovie">
          <img class="MoviePoster" src="${posterURL}" alt="${
        movie.title
      } Poster" />
          <h2 class="MovieTitle">${movie.title}</h2>
          <p class="ReleaseDate">Release Date: ${movie.release_date}</p>
          <p class="Overview">${movie.overview}</p>
          <button type="button" class="addToLibraryButton" data-movie-id="${
            movie.id
          }">
            ${isInLibrary ? 'Remove from library' : 'Add to my library'}
          </button>
        </div>`;
    }

    const updateDiv = document.querySelector('.movieInfoContent');
    if (updateDiv) {
      updateDiv.innerHTML = movieHTML;
    }

    document.querySelectorAll('.addToLibraryButton').forEach(button => {
      button.addEventListener('click', handleLibraryAction);
    });
  } catch (error) {
    console.error(
      'Upcoming filmleri alırken hata oluştu:',
      error.response ? error.response.data : error.message
    );
  }
}

function handleLibraryAction(event) {
  const button = event.target;
  const movieId = button.getAttribute('data-movie-id');
  const movieTitle = button
    .closest('.UpcomingMovie')
    .querySelector('.MovieTitle').innerText;

  const movie = {
    id: movieId,
    title: movieTitle,
  };

  const isInLibrary = movieLibrary.some(libMovie => libMovie.id === movie.id);

  if (isInLibrary) {
    movieLibrary = movieLibrary.filter(libMovie => libMovie.id !== movie.id);
    button.innerText = 'Add to my library';
  } else {
    movieLibrary.push(movie);
    button.innerText = 'Remove from library';
  }

  localStorage.setItem('movieLibrary', JSON.stringify(movieLibrary));
}

const callUp = document.addEventListener(
  'DOMContentLoaded',
  fetchUpcomingMovies
);
export default callUp;
