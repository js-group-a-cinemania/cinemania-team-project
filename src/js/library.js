const LIBRARY_KEY = 'myLibrary';

export function getLibraryMovies() {
  return JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
}

export function addMovieToLibrary(movie) {
  console.log(`📌 Film ekleniyor: ${movie.title}`); // ✅ **Test Logu**
  let movies = getLibraryMovies();
  if (!movies.some(m => m.id === movie.id)) {
    movies.push(movie);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(movies));
    console.log('✅ Film başarıyla eklendi!', getLibraryMovies()); // ✅ **Test Logu**
    alert(`${movie.title} added to My Library! 🎬`);

    displayLibraryMovies(); // 📌 Library'yi güncelle
  } else {
    console.log('⚠️ Film zaten kütüphanede!', getLibraryMovies()); // ✅ **Test Logu**
    alert(`${movie.title} is already in My Library!`);
  }
}
export function removeMovieFromLibrary(movieId) {
  let movies = getLibraryMovies().filter(m => m.id !== movieId);
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(movies));
  console.log(`❌ Movie ID ${movieId} removed from Library!`);
}

export function displayLibraryMovies() {
  const libraryContainer = document.querySelector('.library-movies'); // ✅ Doğru class kullanılıyor mu?
  const emptyLibraryMessage = document.querySelector('.empty-library-message');

  if (!libraryContainer || !emptyLibraryMessage) {
    console.error('❌ Library container veya boş mesaj elementi bulunamadı!');
    return;
  }

  let libraryMovies = getLibraryMovies();

  if (libraryMovies.length === 0) {
    emptyLibraryMessage.style.display = 'block';
    libraryContainer.innerHTML = '<p>No movies in My Library yet!</p>';
    return;
  } else {
    emptyLibraryMessage.style.display = 'none';
  }

  // 📌 **Filmleri Listeye Ekleme**
  libraryContainer.innerHTML = libraryMovies
    .map(
      movie => `
        <li class="movie-card" data-id="${movie.id}>
            <img class ="library-movies-img" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}">
            <div class="library-movies-overlay" data-id="${movie.id}></div>
            <div class="library-movies-description" ><h3 class="library-movies-title">${movie.title}</h3>
            <p class="library-movies-details"><strong>Release Date:</strong> ${movie.release_date}</p></div>
            <div class="library-remove-btn"><button class="library-btn" data-id="${movie.id}">Remove Add Library</button></div>
        </li>
    `
    )
    .join('');

  // 📌 **Remove butonlarına event listener ekle**
  document.querySelectorAll('.library-btn').forEach(button => {
    button.addEventListener('click', event => {
      const movieId = Number(event.target.dataset.id);
      removeMovieFromLibrary(movieId);
      displayLibraryMovies(); // Listeyi güncelle
    });
  });
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

// 📌 Tür Filtresini Dolduran Fonksiyon
function populateGenreFilter() {
  const genreFilter = document.getElementById('genreFilter');
  if (!genreFilter) return; // 📌 Eğer Library sayfasında değilsek çalışmasın

  let movies = JSON.parse(localStorage.getItem('myLibrary')) || [];
  let genres = new Set();

  // 📌 Kayıtlı Filmlerin Türlerini Al
  movies.forEach(movie => {
    if (movie.genres) {
      movie.genres.forEach(g =>
        genres.add(JSON.stringify({ id: g.id, name: g.name }))
      );
    }
  });

  // 📌 Dropdown'u Temizle ve Yeni Seçenekleri Ekle
  genreFilter.innerHTML = `<option value="all">All Genres</option>`;
  genres.forEach(g => {
    let genre = JSON.parse(g);
    genreFilter.innerHTML += `<option value="${genre.id}">${genre.name}</option>`;
  });

  // 📌 Tür seçildiğinde filtreyi uygula
  genreFilter.addEventListener('change', filterLibraryByGenre);
}

// 📌 Seçilen Türe Göre Filmleri Filtrele
function filterLibraryByGenre() {
  const selectedGenre = document.getElementById('genreFilter').value;
  let movies = JSON.parse(localStorage.getItem('myLibrary')) || [];

  if (selectedGenre !== 'all') {
    movies = movies.filter(movie =>
      movie.genres.some(g => g.id == selectedGenre)
    );
  }

  displayFilteredMovies(movies);
}

// 📌 Filtrelenen Filmleri Göster
function displayFilteredMovies(movies) {
  const libraryContainer = document.querySelector('.library-movies');
  const emptyLibraryMessage = document.querySelector('.empty-library-message');

  if (!libraryContainer || !emptyLibraryMessage) {
    console.error('❌ Library container veya boş mesaj elementi bulunamadı!');
    return;
  }

  if (movies.length === 0) {
    emptyLibraryMessage.style.display = 'block';
    libraryContainer.innerHTML = '<p>No movies found in this genre!</p>';
    return;
  } else {
    emptyLibraryMessage.style.display = 'none';
  }

  // 📌 **Filmleri Listele**
  libraryContainer.innerHTML = movies
    .map(
      movie => `
        <li class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
            <button class="library-btn" data-id="${movie.id}">Remove Add Library</button>
        </li>
    `
    )
    .join('');

  // 📌 **Remove butonlarına event listener ekle**
  document.querySelectorAll('.library-btn').forEach(button => {
    button.addEventListener('click', event => {
      const movieId = Number(event.target.dataset.id);
      removeMovieFromLibrary(movieId);
      filterLibraryByGenre(); // 📌 Filtreyi güncelle
    });
  });
}

// 📌 Sayfa Yüklendiğinde Çalıştır
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('genreFilter')) {
    populateGenreFilter();
    filterLibraryByGenre(); // 📌 Varsayılan olarak tüm filmleri göster
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.querySelector('.search-button');

  if (searchButton) {
    searchButton.addEventListener('click', function () {
      window.location.href = 'catalog.html'; // 📌 Catalog sayfasına yönlendir
    });
  }
});
