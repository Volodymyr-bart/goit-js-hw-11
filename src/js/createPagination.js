export default function createPagination(pages, currentPage) {
  if (pages === 1) {
    return `<li class="pagination-list__item">
            <button class="pagination-list__item disabled" type="button">${currentPage}</button>
          </li>`;
  } else if (pages === 2) {
    return `<li class="pagination-list__item">
            <button class="pagination-list__item disabled" type="button">${currentPage}</button>
            </li>
            <li class="pagination-list__item">
            <button class="pagination-list__item disabled" type="button">${
              currentPage + 1
            }</button>
            </li>`;
  } else if (pages > 3) {
    return console.log('pagination over 3 pages');
  }
}
