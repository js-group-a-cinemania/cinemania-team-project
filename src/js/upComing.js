const API_KEY = 'cacaf4fb30e4adeda0cb251474aaa7da';
const BASE_URL = 'https://api.themoviedb.org/3';

let movieLibrary = JSON.parse(localStorage.getItem('movieLibrary')) || [];

async function fetchUpcomingMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const movies = data.results;

    let movieHTML = '';
    if (movies.length > 0) {
      const movie = movies[0]; // Sadece ilk filmi alıyoruz
      const posterURL = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';
      const isInLibrary = movieLibrary.some(
        libMovie => Number(libMovie.id) === Number(movie.id)
      );

      movieHTML = `
        <div class="UpcomingMovie">
          <img class="UpdateImg" src="${posterURL}" alt="${
        movie.title
      } Poster" />
      </div>
      <div class="UpcomingMovieContent">
          <h2 class="DetailsTitle">${movie.title}</h2>
          <p class="DetailsContent">Release date <span class="SpanDate">${
            movie.release_date
          }</span></p>
          <p class="DetailsContent">Vote / Votes <span class="SpanVotes"><span class="SpanVote">${
            movie.vote_average
          }</span> / <span class="SpanVote">${
        movie.vote_count
      }</span></span></p>
          <p class="DetailsContent">Popularity <span class="SpanPopular">${
            movie.popularity
          }</span></p>
          <h3 class="DetailsAbout">ABOUT</h3>
          <p class="AboutContent">${movie.overview}</p>    
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
    console.error('Upcoming filmleri alırken hata oluştu:', error.message);
  }
}

function handleLibraryAction(event) {
  const button = event.target;
  const movieId = button.getAttribute('data-movie-id');
  const movieTitleElement = button
    .closest('.UpcomingMovie')
    ?.querySelector('.MovieTitle');
  if (!movieTitleElement) return;
  const movieTitle = movieTitleElement.innerText;

  const movie = {
    id: movieId,
    title: movieTitle,
  };

  const isInLibrary = movieLibrary.some(
    libMovie => Number(libMovie.id) === Number(movie.id)
  );

  if (isInLibrary) {
    movieLibrary = movieLibrary.filter(
      libMovie => Number(libMovie.id) !== Number(movie.id)
    );
    button.innerText = 'Add to my library';
  } else {
    movieLibrary.push(movie);
    button.innerText = 'Remove from library';
  }

  localStorage.setItem('movieLibrary', JSON.stringify(movieLibrary));
}

document.addEventListener('DOMContentLoaded', fetchUpcomingMovies);

export default fetchUpcomingMovies;

// dark-light mode için fonksyon

document
  .getElementById('darkmode-toggle')
  .addEventListener('change', function () {
    document.querySelector('.sectionUpComingTitle').style.color = this.checked
      ? ''
      : '#111111';
  });
