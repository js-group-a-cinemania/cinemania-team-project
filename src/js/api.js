import axios from 'axios';


const apiKey = '9a0d30072ad38e4a4c69d8b167f5dfc1';
const baseUrl = 'https://api.themoviedb.org/3';

// Popüler filmler
export async function fetchTrendingMoviesForThisWeek(page = 1) {
  const response = await axios.get(`${baseUrl}/trending/movie/week`, {
    params: {
      api_key: apiKey,
      page: page,
    },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
}
