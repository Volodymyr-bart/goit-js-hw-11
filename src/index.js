import { galleryItems } from './js/gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { templateInfoCard } from './js/templatesCard';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

let items = [];
let query = null;
let currentPage = 1;
const HITS_PER_PAGE = 40;
let totalPages = 0;

const render = () => {
  console.log(items);
};

const handleSubmit = e => {
  e.preventDefault();
  query = e.target.search.value;
  // console.log(query);
  fetchData(query);
  render();
};
refs.form.addEventListener('submit', handleSubmit);

// const galleryListDiv = document.querySelector('.gallery');
// const cardsMarkup = createPictureCards(galleryItems);

// galleryListDiv.insertAdjacentHTML('afterbegin', cardsMarkup);

// function createPictureCards(galleryItems) {
//   return galleryItems
//     .map(({ preview, original, description }) => {
//       return `<a class="gallery__item" href="${original}">
//   <img class="gallery__image" src="${preview}" alt="${description}" title="${description}"/>
// </a>`;
//     })
//     .join('');
// }

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
