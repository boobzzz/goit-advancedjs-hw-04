import axios from 'axios';

const API_KEY = '49648507-d50f841642650241279dda9b6';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;
let currentPage = 1;
let currentQuery = '';

export async function processSearchResults(query, { onStart, onSuccess, onError, onFinally }) {
  onStart();
  currentPage = 1;
  currentQuery = query;

  await fetchImages({ onSuccess, onError, onFinally });
}

export async function loadMoreSearchResults({ onStart, onSuccess, onError, onFinally }) {
  onStart();
  currentPage++;

  await fetchImages({ onSuccess, onError, onFinally });
}

async function fetchImages({ onSuccess, onError, onFinally }) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: encodeURIComponent(currentQuery),
        per_page: PER_PAGE,
        page: currentPage
      }
    });
    onSuccess(res.data.hits);
  } catch (error) {
    onError();
  } finally {
    onFinally();
  }
}
