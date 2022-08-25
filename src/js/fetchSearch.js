import axios from 'axios';

export default async function fetchSearchQuery(query, currentPage) {
  const API_KEY = `29486928-40983179e54322116410ec482`;
  // axios.defaults.baseURL =
  //   'https://pixabay.com/api/?key=29486928-40983179e54322116410ec482';
  return await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
  );
}
