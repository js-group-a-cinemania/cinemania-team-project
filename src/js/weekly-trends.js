import axios from 'axios';

const API_KEY = 'cACAF4FB30E4ADEDA0CB251474AAA7DA';
const BASE_URL = 'https://api.themoviedb.org/3';
const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWNhZjRmYjMwZTRhZGVkYTBjYjI1MTQ3NGFhYTdkYSIsIm5iZiI6MTczODM1NDIxMy4zNDgsInN1YiI6IjY3OWQyZTI1MTc2ZmRiMjI0NGNiMjkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ug0aezZ5htnawKCPoADR0i-JxcDzj43sBX4NiKOKbvg',
  },
};

//  Film türlerini çekip ID → isim dönüşümü yap
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

//  Günlük trend filmleri getir
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

//  Filmleri Listeleme ve Modal Açma
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
        : 'yedek-gorsel-url.jpg';

      const genres = movie.genre_ids
        .map(id => genreMap[id] || 'Unknown')
        .join(', ');

      //  Film kartını oluştur
      const movieElement = `
        <div class="MovieCard" data-movie='${JSON.stringify(
          movie
        )}' style="cursor: pointer;">
          <img class="MovieCardİmg" src="${imageUrl}" alt="${movie.title}" />
          <div class="gradient-container"></div>
          <h3>${movie.title}</h3>
          <p>${genres} / ${movie.release_date}</p>
        </div>
      `;

      movieContainer.insertAdjacentHTML('beforeend', movieElement);
    });

    //  Film kartlarına tıklama event'i ekle (Modal Açma)
    document.querySelectorAll('.MovieCard').forEach(card => {
      card.addEventListener('click', () => {
        const movieData = JSON.parse(card.getAttribute('data-movie'));
        openModal(movieData);
      });
    });
  } catch (error) {
    console.error('Filmler yüklenirken hata oluştu:', error);
    movieContainer.innerHTML =
      '<p>Failed to load movies. Please try again later.</p>';
  }
}

//  Modalı Açma Fonksiyonu
function openModal(movie) {
  const modal = document.querySelector('#WTmovieModal');
  const modalContent = document.querySelector('.WTmodal-content');

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'yedek-gorsel-url.jpg';

  modalContent.innerHTML = `
    <span class="close">&times;</span>
    <img src="${posterUrl}" alt="${movie.title}" class="WTmodal-img"/>
    <h2>${movie.title}</h2>
    <p><strong>Release Date:</strong> ${movie.release_date}</p>
    <p><strong>Popularity:</strong> ${movie.popularity}</p>
    <p><strong>Overview:</strong> ${movie.overview}</p>
  `;

  modal.style.display = 'block';

  //  Modalı kapatma
  document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

//  Sayfa açıldığında ilk 3 filmi göster
renderMovies(3);

//  "View All" Butonu → Tüm Filmleri Göster
document
  .querySelector('#viewAll')
  .addEventListener('click', () => renderMovies());
