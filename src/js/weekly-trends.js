import axios from 'axios';

const API_KEY = 'cACAF4FB30E4ADEDA0CB251474AAA7DA';
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_POSTER = 'yedek-gorsel-url.jpg';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Film türlerini çekip ID → isim dönüşümü yap
async function getGenres() {
  try {
    const response = await axios.get(
      `${BASE_URL}/genre/movie/list?language=en-US`,
      options
    );
    return response.data.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
  } catch (error) {
    console.error('Türleri alırken hata oluştu:', error);
    return {};
  }
}

// Günlük trend filmleri getir
export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/all/day?language=en-US`,
      options
    );
    return response.data;
  } catch (error) {
    console.error('Trend filmleri alırken hata oluştu:', error);
    return null;
  }
};

// Filmleri Listeleme ve Modal Açma
async function renderMovies(movieCount = 3) {
  const movieContainer = document.querySelector('.weeklyTrendsContent');
  movieContainer.innerHTML = '';

  try {
    const [movies, genreMap] = await Promise.all([
      fetchTrendingMovies(),
      getGenres(),
    ]);

    if (!movies || !movies.results || movies.results.length === 0) {
      console.log('Film bulunamadı.');
      return;
    }

    movies.results.slice(0, movieCount).forEach(movie => {
      const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : DEFAULT_POSTER;
      const genres = movie.genre_ids
        .map(id => genreMap[id] || 'Unknown')
        .join(', ');

      // Film kartını oluştur
      const movieElement = document.createElement('div');
      movieElement.classList.add('MovieCard');
      movieElement.style.cursor = 'pointer';
      movieElement.dataset.movie = JSON.stringify(movie);

      movieElement.innerHTML = `
        <img class="MovieCardİmg" src="${imageUrl}" alt="${movie.title}" />
        <div class="gradient-container"></div>
        <h3>${movie.title}</h3>
        <p>${genres} / ${movie.release_date || 'Tarih bilinmiyor'}</p>
      `;

      // Film kartına tıklama event'i ekle (Modal Açma)
      movieElement.addEventListener('click', () => {
        openModal(movie);
      });

      movieContainer.appendChild(movieElement);
    });
  } catch (error) {
    console.error('Filmler yüklenirken hata oluştu:', error);
    movieContainer.innerHTML =
      '<p>Failed to load movies. Please try again later.</p>';
  }
}

// Modalı Açma Fonksiyonu
function openModal(movie) {
  const modal = document.querySelector('#WTmovieModal');
  const modalContent = document.querySelector('.WTmodal-content');

  if (!modal || !modalContent) {
    console.error('Modal elemanları bulunamadı.');
    return;
  }

  // Önce içeriği temizle
  modalContent.innerHTML = '';

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
    if (event.target === modal || event.target.classList.contains('close')) {
      modal.style.display = 'none';
      window.removeEventListener('click', closeModal);
    }
  };

  window.addEventListener('click', closeModal);
}

// Sayfa açıldığında ilk 3 filmi göster
document.addEventListener('DOMContentLoaded', () => renderMovies(3));

// "View All" Butonu → Katalog Sayfasına Yönlendirme
document.querySelector('#viewAll')?.addEventListener('click', () => {
  window.location.href = 'catalog.html';
});
