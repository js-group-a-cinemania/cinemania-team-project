import axios from 'axios';
console.log("Upcoming.js dosyası yüklendi!");

const API_KEY = 'cacaf4fb30e4adeda0cb251474aaa7da';
const BASE_URL = 'https://api.themoviedb.org/3';

// UPCOMING FİLMLERİ ÇEKME FONKSİYONU
async function fetchUpcomingMovies() {
  try {
    // API'den Upcoming Filmleri Çekiyoruz
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY, // API_KEY burada kullanılıyor!
        language: 'en-US',
        page: '1'
      }
    });

    console.log("Upcoming Movies Response:", response.data); // Debug için

    // Filmleri Alıyoruz
    const movies = response.data.results;

    // HTML İçeriği Oluşturma
    let movieHTML = '';
    if (movies.length > 0) {
      const movie = movies[0];
      const posterURL = movie.poster_path 
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                        : 'https://via.placeholder.com/500x750?text=No+Image';
      movieHTML += `
        <div class="UpcomingMovie">
          <img class="MoviePoster" src="${posterURL}" alt="${movie.title} Poster" />
          <h2 class="MovieTitle">${movie.title}</h2>
          <p class="ReleaseDate">Release Date: ${movie.release_date}</p>
          <p class="Overview">${movie.overview}</p>
          <button type="button" class="addToLibraryButton">Add to my library</button>
        </div>`;
    }

    // DOM'a Ekliyoruz
    const updateDiv = document.querySelector('.movieInfoContent');
    if (updateDiv) {
      updateDiv.innerHTML = movieHTML;
    } else {
      console.error("Belirtilen .movieInfoContent div'i bulunamadı.");
    }

  } catch (error) {
    console.error('Upcoming filmleri alırken hata oluştu:', error.response ? error.response.data : error.message);
  }
}

// FONKSİYONU ÇAĞIR
const callUp = document.addEventListener('DOMContentLoaded', fetchUpcomingMovies);
export default callUp;
