export default function templateInfoCard(card) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = card;
  return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" href="${largeImageURL}" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>;`;
}
