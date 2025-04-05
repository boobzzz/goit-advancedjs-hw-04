import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { loadMoreSearchResults, processSearchResults } from './js/pixabay-api.js';
import {
  form,
  gallery,
  loadMoreBtn,
  renderGallery,
  updateGallery,
  hideGallery,
  hideLoadBtn,
  showLoadBtn, autoScrollOnLoadMore,
} from './js/render-functions.js';
import { showSpinner, hideSpinner } from './js/spinner.js';
import { showMessage } from './js/messages.js';

const lightbox = new SimpleLightbox('.gallery-link');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchQuery = new FormData(form).get('query');
  if (!searchQuery) {
    showMessage('no_query');
    return;
  }

  processSearchResults(searchQuery, {
    onStart: () => {
      hideGallery();
      showSpinner();
    },
    onSuccess: (images) => {
      renderGallery(images);
      lightbox.refresh();
    },
    onError: () => showMessage('failed'),
    onFinally: hideSpinner
  });
});

gallery.addEventListener('click', () => {
  lightbox.open();
});

loadMoreBtn.addEventListener('click', () => {
  loadMoreSearchResults({
    onStart: () => {
      hideLoadBtn();
      showSpinner();
    },
    onSuccess: (images) => {
      lightbox.refresh();
      updateGallery(images);
    },
    onError: () => showMessage('failed'),
    onFinally: () => {
      hideSpinner();
      showLoadBtn();
    }
  });
});
