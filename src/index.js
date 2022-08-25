import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import templateInfoCard from './js/templatesCard';
import fetchSearchQuery from './js/fetchSearch';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.button--load-more'),
};

// let it ems = [];
let query = null;
let currentPage = 1;
const HITS_PER_PAGE = 40;
let totalPages = 0;
let isLoading = false;
let items = [];

const loaderOn = () => refs.loader.classList.add('visible');

const loaderOff = () => refs.loader.classList.remove('visible');
loaderOff();

const handleSubmit = e => {
  e.preventDefault();
  refs.gallery.innerHTML = ``;
  query = e.target.search.value;
  fetchSearchQuery(query, currentPage)
    .then(response => {
      renderList(response);
      loaderOn();
      // const {
      //   data: { hits, totalHits },
      // } = response;
      // items = hits;
      // totalPages = totalHits / hits.length;
      // renderList(hits);
    })
    .catch(error => console.log(error));
};

function renderList(response) {
  const {
    data: { hits, totalHits },
  } = response;
  items = hits;
  //
  totalPages = totalHits / hits.length;
  const templates = items.map(hit => templateInfoCard(hit)).join('');
  refs.gallery.insertAdjacentHTML(`beforeend`, templates);
}

function handleMoreSubmit() {
  console.log('click');
  currentPage += 1;
  fetchSearchQuery(query, currentPage).then(response => renderList(response));
}

// const handleLoadMoreClick = () => {
//   currentPage += 1;
//   fetchSearchQuery(query, currentPage);
// };

// const handleWindowScroll = ({ target }) => {
//   if (
//     target.scrollTop + target.clientHeight + 10 >= target.scrollHeight &&
//     isLoading
//   ) {
//     handleLoadMoreClick();
//   }
// };

refs.form.addEventListener('submit', handleSubmit);
refs.loader.addEventListener('click', handleMoreSubmit);
// refs.gallery.addEventListener('scroll', handleWindowScroll);

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

// console.log(totalPages);
// for (let i = 0; i < hits.length; i += 1) {
// console.log(hits.length);
// console.log(totalHits);
// refs.gallery.insertAdjacentHTML(`beforeend`, templateInfoCard(hits[i]));
// isLoading = true;
// }
