import { getLibraryMovies, toggleLibrary } from './storage.js';
import { addMovieToLibrary } from './library.js';

document.addEventListener('DOMContentLoaded', async () => {
  await fetchGenres();
  // Türleri yükle
});

console.log('📌 library.js yüklendi mi?', getLibraryMovies()); // ✅ TEST LOGU
//! DARK MODE-LIGHT MODE

document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('darkmode-toggle');
  const body = document.body;

  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', function () {
    if (this.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const yearDropdown = document.querySelector('.year-dropdown');
  if (!yearDropdown) {
    console.error('Hata: Year dropdown elementi HTML içinde bulunamadı!');
    return;
  }
  yearDropdown.addEventListener('change', async function () {
    const selectedYear = this.value;
    console.log(`📅 ${selectedYear} yılına ait filmler listeleniyor...`);
    await fetchMoviesByYear(selectedYear);
  });
});
//! DARK MODE-LIGHT MODE SONU

const apiKey = '9a0d30072ad38e4a4c69d8b167f5dfc1';
const baseUrl = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', async () => {
  await fetchTrendingMovies(); // Filmleri çek
  await populateYearDropdown(); // Yılları çek
});
document.addEventListener('DOMContentLoaded', () => {
  populateYearDropdown(); // Sayfa yüklendiğinde yılları ekle
});

function populateYearDropdown() {
  const yearDropdown = document.querySelector('.year-dropdown');
  if (!yearDropdown) {
    console.error('Year dropdown elementi bulunamadı!');
    return;
  }

  const currentYear = new Date().getFullYear(); // Şu anki yıl
  const startYear = 1900; // Filmler için en erken yıl

  // Varsayılan seçeneği ekle
  yearDropdown.innerHTML = `<option value="">Year</option>`;

  for (let year = currentYear; year >= startYear; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearDropdown.appendChild(option);
  }
}
document
  .querySelector('.year-dropdown')
  .addEventListener('change', async function () {
    const selectedYear = this.value;

    if (selectedYear) {
      console.log(`📅 ${selectedYear} yılına ait filmler listeleniyor...`);
      await fetchMoviesByYear(selectedYear);
    }
  });

// **Belirli bir yılın filmlerini API'den çek**
async function fetchMoviesByYear(year) {
  const apiKey = '9a0d30072ad38e4a4c69d8b167f5dfc1';
  const baseUrl = 'https://api.themoviedb.org/3';

  try {
    const response = await fetch(
      `${baseUrl}/discover/movie?api_key=${apiKey}&primary_release_year=${year}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      displayMovies(data.results); // Filmleri ekrana yazdır
    } else {
      console.warn(`❌ ${year} yılına ait film bulunamadı.`);
      document.querySelector(
        '.gallery-movies'
      ).innerHTML = `<p>No movies found for ${year}</p>`;
    }
  } catch (error) {
    console.error("API'den film listesi alınırken hata oluştu:", error);
  }
}

// **API’de gerçekten film olan yılları getir**

document.addEventListener('DOMContentLoaded', () => {
  const galleryMovies = document.querySelector('.gallery-movies'); // Film listesi
  const modal = document.getElementById('movie-modal'); // Modal arkaplan
  const modalContent = document.querySelector('.modal-movie-info-container'); // Modal içeriği
  const closeModalButton = document.getElementById('close-modal'); // Modal kapatma butonu

  if (!galleryMovies || !modal || !modalContent || !closeModalButton) {
    console.error('Modal veya film galerisi elementi bulunamadı!');
    return;
  }

  // **Filme tıklama event listener ekle**
  // **Filme tıklama event listener ekle**
  galleryMovies.addEventListener('click', async event => {
    event.preventDefault();

    const movieCard = event.target.closest('.gallery-movies-item'); // Film kartını bul
    if (!movieCard) {
      console.warn('Tıklanan öğe bir film kartı değil!');
      return;
    }

    const movieId = movieCard.dataset.id; // Filmin ID'sini al
    if (!movieId) {
      console.error('Film ID bulunamadı!');
      return;
    }

    console.log('Tıklandı, film ID:', movieId); // **Hata Ayıklama İçin**

    try {
      const movieData = await fetchMovieDetails(movieId); // API'den film detaylarını çek
      showModal(movieData);
    } catch (error) {
      console.error('Film detayları yüklenirken hata oluştu:', error);
    }
  });

  // **Modal açma fonksiyonu**
  function showModal(movie) {
    const modal = document.getElementById('movie-modal');
    const modalContent = document.querySelector('.modal-movie-info-container');

    modalContent.innerHTML = `
    <h2 class="modal-title">${movie.title || 'Unknown Title'}</h2>
    <img height="500" class="modal-poster" src="${
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : './img/no-image.png'
    }" alt="${movie.title}" />
    <p><strong>Overview:</strong> ${
      movie.overview || 'No description available.'
    }</p>
    <p><strong>Genres:</strong> ${
      movie.genres?.map(g => g.name).join(', ') || 'Unknown'
    }</p>
    <p><strong>Release Date:</strong> ${movie.release_date || 'Unknown'}</p>
    <button id="add-to-library-btn" class="library-button">${
      getLibraryMovies().some(m => m.id === movie.id)
        ? '❌ Remove from Library'
        : '📚 Add to Library'
    }</button>
  `;

    modal.style.display = 'flex';
    modal.classList.add('open');

    // 📌 Butona event listener ekle
    const addToLibraryBtn = document.getElementById('add-to-library-btn');
    if (addToLibraryBtn) {
      addToLibraryBtn.addEventListener('click', () => {
        console.log('📌 Add to Library butonuna tıklandı!');
        toggleLibrary(movie, addToLibraryBtn);
      });
    } else {
      console.error('❌ Add to Library butonu bulunamadı!');
    }
  }

  // **Hero kısmındaki 'More details' butonuna tıklama event listener ekle**
  document
    .querySelector('.hero-text-container')
    .addEventListener('click', async event => {
      if (event.target && event.target.classList.contains('js-details-btn')) {
        const movieId = event.target.dataset.id; // Film ID'sini al
        if (!movieId) {
          console.error('Film ID bulunamadı!');
          return;
        }

        try {
          const movieData = await fetchMovieDetails(movieId); // API'den film detaylarını çek
          showModal(movieData); // Film detayları ile modalı göster
        } catch (error) {
          console.error('Film detayları yüklenirken hata oluştu:', error);
        }
      }
    });

  // **Modalı kapatma event'leri**
  closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.classList.remove('open');
  });

  // **Modal dışına tıklanınca kapatma**
  modal.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
      modal.classList.remove('open');
    }
  });

  // **Escape tuşuna basınca modalı kapat**
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
      modal.classList.remove('open');
    }
  });

  // **Film detaylarını API'den al**
  async function fetchMovieDetails(movieId) {
    const apiKey = '9a0d30072ad38e4a4c69d8b167f5dfc1';
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    );
    const data = await response.json();

    console.log("🎥 API'den Gelen Film Verisi:", data); // **EKLENDİ**

    return data;
  }
});

// ! **Hero kısmını göster**

function displayHeroMovie(movie) {
  const { title, backdrop_path, vote_average, overview, id } = movie;
  const container = document.querySelector('.hero-text-container');
  container.innerHTML = `
    <div class="image-container">
        <img class="section-hero-img" src="${IMG_URL}${backdrop_path}" alt="${title}">
        <div class="gradient-container"></div>
    </div>
    <div class="section-hero-content">
        <h1 class="title section-hero-title">${title}</h1>
        <p class="star-rating-hero">${starRatingCalc(vote_average)}</p>
        <p class="text hero-text">${overview}</p>
        <ul class="btn-list">
            <li><button class="btn js-trailer-btn" data-id="${id}">Watch trailer</button></li>
            <li><button class="btn-details js-details-btn" data-id="${id}">More details</button></li>
        </ul>
        <div class="background-container"></div>
    </div>
  `;
}

let genreMap = {};

// **Film türlerini çek ve kaydet**
async function fetchGenres() {
  try {
    const response = await fetch(
      `${baseUrl}/genre/movie/list?api_key=${apiKey}`
    );
    const data = await response.json();

    data.genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });
  } catch (error) {
    console.error('Film türleri alınırken hata oluştu:', error);
  }
}

// **Trend Filmleri Listele**
async function fetchTrendingMovies() {
  await fetchGenres(); // Türleri çek
  const response = await fetch(
    `${baseUrl}/trending/movie/week?api_key=${apiKey}`
  );
  const data = await response.json();

  if (data.results.length > 0) {
    displayHeroMovie(data.results[0]); // İlk filmi Hero bölümüne ekle
    displayMovies(data.results); // Filmleri listele
  }
}

// **Filmleri Ekrana Yazdır**
function displayMovies(movies) {
  const container = document.querySelector('.gallery-movies');
  container.innerHTML = movies
    .map(
      ({ title, poster_path, vote_average, id, release_date, genre_ids }) => {
        const year = release_date ? release_date.split('-')[0] : 'Unknown';
        const starRating = starRatingCalc(vote_average);

        // **Tür ID'lerini isimlere çevir**
        const genres = genre_ids
          .map(id => genreMap[id] || 'Unknown')
          .join(', ');

        return `
        <li class="gallery-movies-item" data-id="${id}">
          <img class="gallery-movies-img" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${title}" loading="lazy">
          <div class="gallery-movies-overlay js-modal-info" data-id="${id}"></div>
          <div class="gallery-movies-description">
            <h3 class="gallery-movies-title">${title}</h3>
            <div class="gallery-movies-wrap">
              <p class="gallery-movies-details">${genres} | ${year}</p>
            </div>
          </div>
          <div class="star-rating">${starRating}</div>
        </li>
      `;
      }
    )
    .join('');
}

// **Yıldız Puanı Hesapla**
export function starRatingCalc(vote_average) {
  const stars = Math.round(vote_average / 2);
  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}

// **Sayfa Yüklendiğinde Çalıştır**
document.addEventListener('DOMContentLoaded', () => {
  fetchTrendingMovies();
});

//! MOBIL MENU
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const mobilMenu = document.getElementById('mobil');
  const backdrop = document.getElementById('backdrop');
  const mobilNav = document.getElementById('mobil-nav');

  menuToggle.addEventListener('click', function (event) {
    event.preventDefault();
    mobilMenu.classList.add('active');
    backdrop.classList.add('active');
    mobilNav.style.display = 'block';
  });

  document.addEventListener('click', function (event) {
    const isClickInsideMenu = mobilMenu.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuToggle) {
      mobilMenu.classList.remove('active');
      backdrop.classList.remove('active');
    }
  });
});

//! MOBIL MENU SON

//!MOVIE SEARCH

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('form-input');
  const searchInput2 = document.querySelector('.search-input2');
  const closeIcon = document.querySelector('.close-icon');
  const movieContainer = document.querySelector('.catalog-movie-container');

  searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      await searchMovies(query);
      searchInput2.value = query;
    }
  });

  closeIcon.addEventListener('click', function () {
    searchInput2.value = '';
  });

  async function searchMovies(query) {
    try {
      const response = await fetch(
        `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        displayMovies(data.results);
      } else {
        movieContainer.innerHTML =
          '<p class="no-results">OOPS...<br>We are very sorry!<br>We don’t have any results matching your search.</p>';
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  }
});

//!MOVIE SEARCH SONU

//! PAGINATION KISMI

const paginationContainer = document.getElementById('pagination-container');
let currentPage = 1;
const maxPagesToFetch = 500;
let totalPages = 1;

async function fetchMovies(page = 1) {
  try {
    if (page > maxPagesToFetch) {
      console.error(`Maksimum ${maxPagesToFetch} sayfayı geçemezsiniz.`);
      return;
    }

    const response = await fetch(
      `${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`
    );
    const data = await response.json();

    totalPages = Math.min(data.total_pages, maxPagesToFetch);
    displayMovies(data.results);
    renderPagination();
  } catch (error) {
    console.error("API'den veri alınırken hata oluştu:", error);
  }
}

function renderPagination() {
  paginationContainer.innerHTML = '';

  let paginationHTML = ``;
  if (currentPage > 1) {
    paginationHTML += `
      <button class="pagination-btn" onclick="changePage(1)">&laquo;</button>
    `;
  }

  if (currentPage > 1) {
    paginationHTML += `
      <button class="pagination-btn" onclick="changePage(${
        currentPage - 1
      })">&lt;</button>
    `;
  }

  if (currentPage > 3) {
    paginationHTML += `<span class="pagination-dots">...</span>`;
  }

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    paginationHTML += `
      <button class="pagination-btn ${
        currentPage === i ? 'active' : ''
      }" onclick="changePage(${i})">${i}</button>
    `;
  }

  if (currentPage < totalPages - 2) {
    paginationHTML += `<span class="pagination-dots">...</span>`;
  }

  if (currentPage < totalPages) {
    paginationHTML += `
      <button class="pagination-btn" onclick="changePage(${
        currentPage + 1
      })">&gt;</button>
    `;
  }

  if (currentPage < totalPages) {
    paginationHTML += `
      <button class="pagination-btn" onclick="changePage(${totalPages})">&raquo;</button>
    `;
  }

  paginationContainer.innerHTML = paginationHTML;
}

window.changePage = function (page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  fetchMovies(page);
};

document.addEventListener('DOMContentLoaded', () => {
  fetchMovies();
});

//! PAGINATION SONU

//! TRAILER MODAL
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', async event => {
    const trailerBtn = event.target.closest('.js-trailer-btn');
    if (trailerBtn) {
      const movieId = trailerBtn.dataset.id;
      console.log(`🎬 Fragman açılıyor, Film ID: ${movieId}`);
      await openTrailerModal(movieId);
    }
  });

  async function openTrailerModal(movieId) {
    const modal = document.querySelector('.trailer-modal');
    const iframe = document.getElementById('trailer-frame');
    const backdrop = document.querySelector('.backdrop-trailer');

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
      );
      const data = await response.json();

      const trailer = data.results.find(video => video.type === 'Trailer');
      if (trailer) {
        iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
        modal.style.display = 'flex';
        backdrop.style.display = 'block';
        modal.classList.add('show');
      } else {
        alert('Fragman bulunamadı!');
      }
    } catch (error) {
      console.error('Fragman yüklenirken hata oluştu:', error);
    }
  }

  function closeModal() {
    const modal = document.querySelector('.trailer-modal');
    const iframe = document.getElementById('trailer-frame');
    const backdrop = document.querySelector('.backdrop-trailer');

    modal.classList.remove('show');
    backdrop.style.display = 'none';
    iframe.src = '';
  }

  document.addEventListener('click', closeModal);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  document.querySelector('.trailer-modal').addEventListener('click', event => {
    event.stopPropagation();
  });
});
