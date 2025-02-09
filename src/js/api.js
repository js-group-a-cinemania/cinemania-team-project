import axios from 'axios';

const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWNhZjRmYjMwZTRhZGVkYTBjYjI1MTQ3NGFhYTdkYSIsIm5iZiI6MTczODM1NDIxMy4zNDgsInN1YiI6IjY3OWQyZTI1MTc2ZmRiMjI0NGNiMjkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ug0aezZ5htnawKCPoADR0i-JxcDzj43sBX4NiKOKbvg',
  },
};
let page = 1;
const searchParams = new URLSearchParams({
  page: page,
  language: 'en-US',
});
const apiUrl = `https://api.themoviedb.org/3/trending/all/day?${searchParams}`;

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(apiUrl, options);
    return response.data;
  } catch (error) {
    return null;
  }
};

// Fonksiyonu çağırma
export default fetchTrendingMovies;
// console.log(fetchTrendingMovies())
