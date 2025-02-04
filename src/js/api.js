const options = {
  method: 'GET',
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

fetch(apiUrl, options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
