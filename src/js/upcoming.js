import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/upcoming',
  params: { language: 'en-US', page: '1' },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWNhZjRmYjMwZTRhZGVkYTBjYjI1MTQ3NGFhYTdkYSIsIm5iZiI6MTczODM1NDIxMy4zNDgsInN1YiI6IjY3OWQyZTI1MTc2ZmRiMjI0NGNiMjkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ug0aezZ5htnawKCPoADR0i-JxcDzj43sBX4NiKOKbvg',
  },
};

async function fetchAndUpdateMovie() {
  try {
    const res = await axios.request(options);
    const movie = res.data.results[0];
    console.log(movie);

    if (!movie) {
      console.error('Film verisi bulunamadı.');
      return;
    }

    const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const updateElement = `<img class="UpdateImg" src="${posterURL}" alt="movie poster"/>
    <div class="UpdateElementDetails">
    <h2 class="DetailsTitle">${movie.original_title}</h2>
    <p class="DetailsContent">Release date <span class="SpanDate">${movie.release_date}</span></p>
    <p class="DetailsContent">Vote / Votes <span class="SpanVotes"><span class="SpanVote">${movie.vote_average}</span> / <span class="SpanVote"> ${movie.vote_count}</span></span></p>
    <p class="DetailsContent">Popularity <span class="SpanPopular">${movie.popularity}</span></p>
    <p class="DetailsContent">Genre <span class="SpanGenre">${movie.genre_ids}</span></p>
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
  } catch (err) {
    console.error('Hata oluştu:', err);
  }
}

fetchAndUpdateMovie();
