import { galleryItems } from './js/gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=29486928-40983179e54322116410ec482';
// & q=yellow + flowers & image_type=photo & pretty=true

const refs = {
  form: document.querySelector('.search-form'),
};

const galleryListDiv = document.querySelector('.gallery');
const cardsMarkup = createPictureCards(galleryItems);

galleryListDiv.insertAdjacentHTML('afterbegin', cardsMarkup);

function createPictureCards(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" title="${description}"/>
</a>`;
    })
    .join('');
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
