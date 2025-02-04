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
        <img class="hero-img" src="${IMG_URL}${backdrop_path}" alt="${title}">
        <div class="gradient-container"></div>
    </div>
    <div class="hero-content">
        <h1 class="title hero-title">${title}</h1>
        <p class="star-rating">${starRatingCalc(vote_average)}</p>
        <p class="text hero-text">${overview}</p>
        <ul class="btn-list">
            <li><button class="btn js-trailer-btn" data-id="${id}">Watch trailer</button></li>
            <li><button class="btn-details js-details-btn" data-id="${id}">More details</button></li>
        </ul>
        <div class="background-container"></div>
    </div>
  `;
}

// ! **Trend Filmleri Listeye Ekle**

async function fetchTrendingMovies() {
  try {
    const response = await fetch(
      `${baseUrl}/trending/movie/week?api_key=${apiKey}`
    );
    const data = await response.json();
    displayMovies(data.results);

    if (movie.length === 0) {
    }
  } catch (error) {
    console.error('Hata:', error);
  }
}

function displayMovies(movies) {
  const container = document.querySelector('.gallery-movies');
  container.innerHTML = movies
    .map(
      ({ title, poster_path, vote_average, id, release_date, genre_ids }) => {
        const year = release_date ? release_date.split('-')[0] : 'Unknown';
        const starRating = starRatingCalc(vote_average);

        return `
        <li class="gallery-movies-item" data-id="${id}">
          <img class="gallery-movies-img" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${title}" loading="lazy">
          <div class="gallery-movies-overlay js-modal-info" data-id="${id}"></div>
          <div class="gallery-movies-description">
            <h3 class="gallery-movies-title">${title}</h3>
            <div class="gallery-movies-wrap">
              <p class="gallery-movies-details">${genre_ids} | ${year}</p>
              <p class="star-rating">${starRating}</p>
            </div>
          </div>
        </li>
      `;
      }
    )
    .join('');
}

// ! **Yıldız Puanı Hesapla**
function starRatingCalc(vote_average) {
  const stars = Math.round(vote_average / 2);
  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}

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
