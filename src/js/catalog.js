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

//! DARK MODE-LIGHT MODE SONU

const apiKey = '9a0d30072ad38e4a4c69d8b167f5dfc1';
const baseUrl = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
  fetchRandomMovie();
  fetchTrendingMovies();
});

// ! **Hero kısmına rastgele bir film getir**

async function fetchRandomMovie() {
  try {
    const response = await fetch(
      `${baseUrl}/trending/movie/week?api_key=${apiKey}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const randomMovie =
        data.results[Math.floor(Math.random() * data.results.length)];
      displayHeroMovie(randomMovie);
    }
  } catch (error) {
    console.error('Hata:', error);
  }
}

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
  try {
    await fetchGenres();
    const response = await fetch(
      `${baseUrl}/trending/movie/week?api_key=${apiKey}`
    );
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Hata:', error);
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
function starRatingCalc(vote_average) {
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


async function fetchMovies(page = 1, year = '') {
  try {
    if (page > maxPagesToFetch) {
      console.error(`Maksimum ${maxPagesToFetch} sayfayı geçemezsiniz.`);
      return;
    }

    let url = `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}`;
    if (year) {
      url += `&primary_release_year=${year}`;
    }

    const response = await fetch(url);
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



//! YILLARA GÖRE MOVIE SEARCH

const yearDropdown = document.querySelector('.year-dropdown');

async function fetchYears() {
  try {
    let years = new Set();
    for (let page = 1; page <= 5; page++) {
      const response = await fetch(
        `${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`
      );
      const data = await response.json();

      data.results.forEach(movie => {
        if (movie.release_date) {
          const year = movie.release_date.split('-')[0];
          years.add(year);
        }
      });
    }

    populateYearDropdown([...years].sort((a, b) => b - a));
  } catch (error) {
    console.error('Yıllar alınırken hata oluştu:', error);
  }
}

function populateYearDropdown(years) {
  yearDropdown.innerHTML =
    '<option value="">All Movies</option>' +
    years.map(year => `<option value="${year}">${year}</option>`).join('');
}

yearDropdown.addEventListener('change', function () {
  const selectedYear = this.value;
  fetchMovies(1, selectedYear);
});


document.addEventListener('DOMContentLoaded', fetchYears);



//! YILLARA GÖRE MOVIE SEARCH SONU