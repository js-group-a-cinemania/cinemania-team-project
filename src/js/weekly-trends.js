import axios from 'axios';

const API_KEY = '9a0d30072ad38e4a4c69d8b167f5dfc1';
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_POSTER = 'yedek-gorsel-url.jpg';

let movieLibrary = JSON.parse(localStorage.getItem('movieLibrary')) || [];

const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { api_key: API_KEY, language: 'en-US', ...params },
    });
    return response.data;
  } catch (error) {
    console.error(
      `API isteği başarısız (${endpoint}):`,
      error.response?.data || error.message
    );
    return null;
  }
};

const getGenres = async () => {
  const data = await fetchFromAPI('/genre/movie/list');
  return (
    data?.genres?.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {}) || {}
  );
};

const fetchTrendingMovies = async () => {
  const data = await fetchFromAPI('/trending/movie/day');
  return data?.results || [];
};

const renderMovies = async (movieCount = 3) => {
  const movieContainer = document.querySelector('.weeklyTrendsContent');
  movieContainer.innerHTML = '';

  try {
    const [movies, genreMap] = await Promise.all([
      fetchTrendingMovies(),
      getGenres(),
    ]);

    if (!movies.length) {
      console.warn('Film bulunamadı.');
      movieContainer.innerHTML = '<p>Film bulunamadı.</p>';
      return;
    }

    movies.slice(0, movieCount).forEach(movie => {
      const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : DEFAULT_POSTER;
      const genres =
        movie.genre_ids?.map(id => genreMap[id] || 'Unknown').join(', ') ||
        'Bilinmiyor';
      const releaseDate = movie.release_date || 'Tarih bilinmiyor';

      const movieElement = document.createElement('div');
      movieElement.classList.add('MovieCard');
      movieElement.style.cursor = 'pointer';
      movieElement.dataset.movie = JSON.stringify(movie);

      movieElement.innerHTML = `
        <img class="MovieCardİmg" src="${imageUrl}" alt="${movie.title}" />
        <div class="weekly-gradient-container"></div>
        <h3>${movie.title}</h3>
        <p>${genres} / ${releaseDate}</p>
        <div class="stars">${getStarRating(movie.vote_average)}</div>
      `;

      movieElement.addEventListener('click', () => openModal(movie, genreMap));
      movieContainer.appendChild(movieElement);
    });
  } catch (error) {
    console.error('Filmler yüklenirken hata oluştu:', error);
    movieContainer.innerHTML =
      '<p>Failed to load movies. Please try again later.</p>';
  }
};

const getStarRating = vote => {
  const fullStars = Math.round(vote) / 2;
  return '⭐'.repeat(Math.floor(fullStars));
};

const openModal = (movie, genreMap) => {
  const modal = document.querySelector('#WTmovieModal');
  const modalContent = document.querySelector('.WTmodal-content');

  if (!modal || !modalContent) {
    console.error('Modal elemanları bulunamadı.');
    return;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : DEFAULT_POSTER;
  const isInLibrary = movieLibrary.some(libMovie => libMovie.id === movie.id);
  const genres =
    movie.genre_ids?.map(id => genreMap[id] || 'Unknown').join(', ') ||
    'Bilinmiyor';

  modalContent.innerHTML = `
    <span class="close">&times;</span>
    <img src="${posterUrl}" alt="${movie.title}" class="WTmodal-img"/>
    <h2>${movie.title}</h2>
    <p><strong>Vote / Votes:</strong> ${movie.vote_average.toFixed(1)} / ${
    movie.vote_count
  }</p>
    <p><strong>Popularity:</strong> ${movie.popularity}</p>
    <p><strong>Genre:</strong> ${genres}</p>
    <p><strong>About:</strong> ${movie.overview || 'Açıklama mevcut değil.'}</p>
    <button class="addToLibraryButton" data-movie-id="${movie.id}">
      ${isInLibrary ? 'Remove from library' : 'Add to my library'}
    </button>
  `;

  modal.style.display = 'block';

  const closeModal = event => {
    if (
      event.target === modal ||
      event.target.classList.contains('close') ||
      event.key === 'Escape'
    ) {
      modal.style.display = 'none';
      window.removeEventListener('click', closeModal);
      window.removeEventListener('keydown', closeModal);
    }
  };

  window.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);

  const button = modalContent.querySelector('.addToLibraryButton');
  button.addEventListener('click', () => handleLibraryAction(movie, button));
};

const handleLibraryAction = (movie, button) => {
  const isInLibrary = movieLibrary.some(libMovie => libMovie.id === movie.id);

  if (isInLibrary) {
    movieLibrary = movieLibrary.filter(libMovie => libMovie.id !== movie.id);
    button.innerText = 'Add to my library';
  } else {
    movieLibrary.push(movie);
    button.innerText = 'Remove from library';
  }

  localStorage.setItem('movieLibrary', JSON.stringify(movieLibrary));
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => renderMovies(3), 100);
});

document.querySelector('#viewAll')?.addEventListener('click', () => {
  window.location.href = `${window.location.origin}/cinemania-team-project/catalog.html`;
});

// dark-light mode için fonksyon

document
  .getElementById('darkmode-toggle')
  .addEventListener('change', function () {
    document.querySelector('.weeklyTrendsTitle').style.color = this.checked
      ? ''
      : '#111111';
  });