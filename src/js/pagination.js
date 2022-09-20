// let totalPages = 20;
// let currentPage = 1;

export default function createPagination(totalPages, page) {
  let liTag = '';
  let activeLi;
  let beforePages = page - 1;
  let afterPages = page + 1;

  if (page > 1) {
    liTag += `<li class="pagination__item btn prev"><span>Prev</span></li>`;
  }
  if (page > 2) {
    liTag += `<li class="pagination__item numb"><span>1</span></li>`;
    if (page > 3) {
      liTag += `<li class="pagination__item dots"><span>...</span></li>`;
    }
  }
  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePages = beforePages - 2;
  } else if (page == totalPages - 1) {
    beforePages = beforePages - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPages = afterPages + 2;
  } else if (page == 2) {
    afterPages = afterPages + 1;
  }
  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (pageLength > totalPages) {
      continue;
    }
    if (pageLength == 0) {
      pageLength = pageLength + 1;
    }

    if (page == pageLength) {
      activeLi = 'active';
    } else {
      activeLi = '';
    }
    liTag += `<li class="pagination__item numb ${activeLi}"><span>${pageLength}</span></li>`;
  }
  //
  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="pagination__item dots"><span>...</span></li>`;
    }
    liTag += `<li class="pagination__item numb"><span>${totalPages}</span></li>`;
  }
  //

  if (page < totalPages) {
    //if page value is less than totalPages value then add new li which is next button
    liTag += `<li class="pagination__item btn next"><span>Next</span></li>`;
  }
  // view this moment
  // ulTag.innerHTML = liTag;
  return liTag;
}

// element(totalPages, currentPage);

// export default function onConteinerPaginationClick(e) {
//   // if (e.target.nodeName !== 'SPAN') {
//   //   return;
//   // }
//   if (e.target.nodeName === 'SPAN') {
//     if (Number.parseInt(e.target.textContent)) {
//     currentPage = Number.parseInt(e.target.textContent);
//   } else {
//     if (e.target.textContent === 'Prev') {
//       currentPage -= 1;
//     } else {
//       currentPage += 1;
//     }
//   }
//   // createPagination(totalPages, currentPage);
//   }

//   // if (Number.parseInt(e.target.textContent)) {
//   //   currentPage = Number.parseInt(e.target.textContent);
//   // } else {
//   //   if (e.target.textContent === 'Prev') {
//   //     currentPage -= 1;
//   //   } else {
//   //     currentPage += 1;
//   //   }
//   // }
//   // createPagination(totalPages, currentPage);
// }

// export default function changePaginationPage(e) {
//   // if (e.target.nodeName !== 'SPAN') {
//   //   return;
//   // }
//   if (Number.parseInt(e.target.textContent)) {
//     currentPage = Number.parseInt(e.target.textContent);
//   } else {
//     if (e.target.textContent === 'Prev') {
//       currentPage -= 1;
//     } else {
//       currentPage += 1;
//     }
//   }
//   // if (e.target.nodeName === 'SPAN') {
//   //   if (Number.parseInt(e.target.textContent)) {
//   //   currentPage = Number.parseInt(e.target.textContent);
//   // } else {
//   //   if (e.target.textContent === 'Prev') {
//   //     currentPage -= 1;
//   //   } else {
//   //     currentPage += 1;
//   //   }
//   // }
//   // createPagination(totalPages, currentPage);
//   // }

//   // if (Number.parseInt(e.target.textContent)) {
//   //   currentPage = Number.parseInt(e.target.textContent);
//   // } else {
//   //   if (e.target.textContent === 'Prev') {
//   //     currentPage -= 1;
//   //   } else {
//   //     currentPage += 1;
//   //   }
//   // }
//   // createPagination(totalPages, currentPage);
//   return currentPage
// }
