import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import templateInfoCard from './js/templatesCard';
import fetchSearchQuery from './js/fetchSearch';
import Notiflix from 'notiflix';
import createPagination from './js/pagination';
// import changePaginationPage from './js/pagination';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.button--load-more'),
};
const ulTag = document.querySelector('.pagination');

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
        loaderOn();
        console.log(createPagination(totalPages, currentPage));
        ulTag.innerHTML = createPagination(totalPages, currentPage);
        // ulTag.insertAdjacentHTML =
        //   (`beforeend`, createPagination(totalPages, currentPage));
        //
        // createPagination(totalPages, currentPage);
        //
        lightbox = new SimpleLightbox('.gallery a', {
          captionDelay: 250,
        });
      }
    })
    .catch(error => console.log(error));
};

function renderList(hits) {
  const templates = hits.map(hit => templateInfoCard(hit)).join('');
  refs.gallery.insertAdjacentHTML(`beforeend`, templates);
}
// ----------------------------------
function handleMoreSubmit() {
  currentPage += 1;
  fetchSearchQuery(query, currentPage)
    .then(response => {
      const {
        data: { hits },
      } = response;
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
}
// ---------------------------------
function onConteinerPaginationClick(e) {
  currentPage = changePaginationPage(e);
  ulTag.innerHTML = createPagination(totalPages, currentPage);
  fetchSearchQuery(query, currentPage)
    .then(response => {
      const {
        data: { hits },
      } = response;
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
}

function changePaginationPage(e) {
  if (e.target.nodeName !== 'SPAN') {
    return;
  }
  if (Number.parseInt(e.target.textContent)) {
    currentPage = Number.parseInt(e.target.textContent);
  } else {
    if (e.target.textContent === 'Prev') {
      currentPage -= 1;
    } else {
      currentPage += 1;
    }
  }
  return currentPage;
}

refs.form.addEventListener('submit', handleSubmit);
// refs.loader.addEventListener('click', handleMoreSubmit);
ulTag.addEventListener('click', onConteinerPaginationClick);
