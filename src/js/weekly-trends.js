import axios from 'axios';

const API_KEY = '9a0d30072ad38e4a4c69d8b167f5dfc1';
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_POSTER = 'yedek-gorsel-url.jpg';

// API İsteklerini Doğru Formatta Yap
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

// Film türlerini çekip ID → isim dönüşümü yap
const getGenres = async () => {
  const data = await fetchFromAPI('/genre/movie/list');
  return (
    data?.genres?.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {}) || {}
  );
};

// Günlük trend filmleri getir
const fetchTrendingMovies = async () => {
  const data = await fetchFromAPI('/trending/movie/day');
  return data?.results || [];
};

// Filmleri Listeleme ve Modal Açma
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

      // Film kartını oluştur
      const movieElement = document.createElement('div');
      movieElement.classList.add('MovieCard');
      movieElement.style.cursor = 'pointer';
      movieElement.dataset.movie = JSON.stringify(movie);

      movieElement.innerHTML = `
        <img class="MovieCardİmg" src="${imageUrl}" alt="${movie.title}" />
        <div class="gradient-container"></div>
        <h3>${movie.title}</h3>
        <p>${genres} / ${releaseDate}</p>
      `;

      // Film kartına tıklama event'i ekle (Modal Açma)
      movieElement.addEventListener('click', () => openModal(movie));

      movieContainer.appendChild(movieElement);
    });
  } catch (error) {
    console.error('Filmler yüklenirken hata oluştu:', error);
    movieContainer.innerHTML =
      '<p>Failed to load movies. Please try again later.</p>';
  }
};

// Modalı Açma Fonksiyonu
const openModal = movie => {
  const modal = document.querySelector('#WTmovieModal');
  const modalContent = document.querySelector('.WTmodal-content');

  if (!modal || !modalContent) {
    console.error('Modal elemanları bulunamadı.');
    return;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : DEFAULT_POSTER;

  modalContent.innerHTML = `
    <span class="close">&times;</span>
    <img src="${posterUrl}" alt="${movie.title}" class="WTmodal-img"/>
    <h2>${movie.title}</h2>
    <p><strong>Release Date:</strong> ${
      movie.release_date || 'Tarih bilinmiyor'
    }</p>
    <p><strong>Popularity:</strong> ${movie.popularity || 'Bilinmiyor'}</p>
    <p><strong>Overview:</strong> ${
      movie.overview || 'Açıklama mevcut değil.'
    }</p>
  `;

  modal.style.display = 'block';

  // Modal kapatma event'leri
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
  window.addEventListener('keydown', closeModal); // ESC tuşu ile kapatma
};

// Sayfa açıldığında ilk 3 filmi göster
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => renderMovies(3), 100);
});

// "View All" Butonu → Katalog Sayfasına Yönlendirme
document.querySelector('#viewAll')?.addEventListener('click', () => {
  window.location.href = 'catalog.html';
});
