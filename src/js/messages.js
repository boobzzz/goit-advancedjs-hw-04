import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const MESSAGES = {
  no_query: 'Please, enter your search query',
  not_found: 'Sorry, no images matching search query',
  no_more: 'Sorry, no more images to load',
  failed: 'Sorry, images failed to fetch',
}

export function showMessage(message) {
  iziToast.error({
    message: MESSAGES[message]
  });
}