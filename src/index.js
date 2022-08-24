// Add imports above this line

import { galleryItems } from './js/gallery-items';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// let SimpleLightbox = require('simplelightbox');
// Change code below this line

console.log(galleryItems);

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
