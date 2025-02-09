import axios from 'axios';

const API_KEY = 'cACAF4FB30E4ADEDA0CB251474AAA7DA';
const BASE_URL = 'https://api.themoviedb.org/3';
const headers = {
  accept: 'application/json',
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWNhZjRmYjMwZTRhZGVkYTBjYjI1MTQ3NGFhYTdkYSIsIm5iZiI6MTczODM1NDIxMy4zNDgsInN1YiI6IjY3OWQyZTI1MTc2ZmRiMjI0NGNiMjkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ug0aezZ5htnawKCPoADR0i-JxcDzj43sBX4NiKOKbvg`,
};

async function getGenres() {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { language: 'en-US' },
      headers,
    });

    return response.data.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
  } catch (error) {
    console.error('Türleri alırken hata oluştu:', error);
    return {};
  }
}

async function fetchAndUpdateMovie() {
  try {
    const genreMap = await getGenres();

    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: { language: 'en-US', page: '1' },
      headers,
    });

    const movie = response.data.results[0];
    if (!movie) {
      console.error('Film verisi bulunamadı.');
      return;
    }

    const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const genres = movie.genre_ids
      .map(id => genreMap[id] || 'Unknown')
      .join(', ');

    const updateElement = `
    <img class="UpdateImg" src="${posterURL}" alt="movie poster"/>
    <div class="UpdateElementDetails">
      <h2 class="DetailsTitle">${movie.original_title}</h2>
      <p class="DetailsContent">Release date <span class="SpanDate">${movie.release_date}</span></p>
      <p class="DetailsContent">Vote / Votes <span class="SpanVotes"><span class="SpanVote">${movie.vote_average}</span> / <span class="SpanVote">${movie.vote_count}</span></span></p>
      <p class="DetailsContent">Popularity <span class="SpanPopular">${movie.popularity}</span></p>
      <p class="DetailsContent">Genre <span class="SpanGenre">${genres}</span></p>
      <h3 class="DetailsAbout">ABOUT</h3>
      <p class="AboutContent">${movie.overview}</p>
      <button type="button" class="addToLibraryButton">Add to my library</button>
    </div>`;

    const updateDiv = document.querySelector('.movieInfoContent');
    if (updateDiv) {
      updateDiv.insertAdjacentHTML('beforeend', updateElement);
    } else {
      console.error("Belirtilen .movieInfoContent div'i bulunamadı.");
    }
  } catch (error) {
    console.error('Hata oluştu:', error);
  }
}

fetchAndUpdateMovie();
