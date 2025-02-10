import './js/init';
import axios from 'axios';
import './js/library.js';
import './js/filters.js';
import './js/scrollUp.js';
import './js/loader.js';
import './js/catalog.js';
import {
  getGenres,
  fetchTrendingMovies,
  renderMovies,
  openModal,
} from './js/weekly-trends.js';

renderMovies(3);

document
  .querySelector('#viewAll')
  .addEventListener('click', () => renderMovies());
