import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import templateInfoCard from './js/templatesCard';
import fetchSearchQuery from './js/fetchSearch';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.button--load-more'),
};

// let it ems = [];
let query = null;

const HITS_PER_PAGE = 40;
let totalPages = null;
let currentPage = null;
let lightbox;

const loaderOn = () => refs.loader.classList.add('visible');

const loaderOff = () => refs.loader.classList.remove('visible');
loaderOff();

const handleSubmit = e => {
  e.preventDefault();
  refs.gallery.innerHTML = ``;
  query = e.target.search.value;
  currentPage = 1;
  fetchSearchQuery(query, currentPage)
    .then(response => {
      const {
        data: { hits, totalHits },
      } = response;
      totalPages = Math.ceil(totalHits / hits.length);
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      } else if (hits.length < 40) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        renderList(hits);
        loaderOff();
      } else {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        renderList(hits);
        lightbox = new SimpleLightbox('.gallery a', {
          captionDelay: 250,
        });
      }
    })
    .catch(error => console.log(error));
};

function renderList(hits) {
  loaderOn();
  const templates = hits.map(hit => templateInfoCard(hit)).join('');
  refs.gallery.insertAdjacentHTML(`beforeend`, templates);
}

function handleMoreSubmit() {
  currentPage += 1;
  console.log();
  // if (currentPage + 1 === totalPages) {
  //   Notiflix.Notify.info(
  //     "We're sorry, but you've reached the end of search results."
  //   );
  //   loaderOff();
  // }
  // else
  // {
  fetchSearchQuery(query, currentPage)
    .then(response => {
      const {
        data: { hits },
      } = response;
      console.log(currentPage);
      console.log(totalPages);
      if (hits.length < 40 && currentPage === totalPages) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        loaderOff();
      }
      renderList(hits);
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
    });
  // }
}

refs.form.addEventListener('submit', handleSubmit);
refs.loader.addEventListener('click', handleMoreSubmit);
