import { showMessage } from './messages.js';

export const form = document.querySelector('.form');
export const gallery = document.querySelector('.gallery');
export const loadMoreBtn = document.querySelector('.load-more');
const detailTitles = ['Likes', 'Views', 'Comments', 'Downloads'];
const currentImages = [];

export function renderGallery(images) {
  clearGallery();

  if (images.length === 0) {
    showMessage('not_found');
    return;
  }

  currentImages.push(...images);
  currentImages.forEach((image) => {
    gallery.append(getImageCart(image));
  });
  showGallery();
  showLoadBtn();
}

export function updateGallery(images) {
  if (images.length === 0) {
    showMessage('no_more');
    hideLoadBtn();
    return;
  }

  currentImages.push(...images);
  currentImages.forEach((image) => {
    gallery.append(getImageCart(image));
  });
}

export function showGallery() {
  gallery.style.display = 'grid';
}

export function hideGallery() {
  gallery.style.display = 'none';
}

function clearGallery() {
  while (gallery.lastElementChild) {
    gallery.removeChild(gallery.lastElementChild);
  }
}

function getImageCart(imgData) {
  const { webformatURL, largeImageURL, tags } = imgData;

  const cart = document.createElement('li');
  cart.classList.add('gallery-cart');

  const link = document.createElement('a');
  link.classList.add('gallery-link');
  link.href = largeImageURL;

  const img = document.createElement('img');
  img.classList.add('gallery-image');
  img.src = webformatURL;
  img.title = tags;

  const details = document.createElement('div');
  details.classList.add('gallery-details');
  detailTitles.forEach((value) => {
    const detail = document.createElement('div');
    detail.classList.add('detail');

    const title = document.createElement('p');
    title.classList.add('detail-title');

    const desc = document.createElement('p');
    desc.classList.add('detail-desc');

    title.innerText = value;
    desc.innerText = imgData[value.toLowerCase()];

    detail.append(title);
    detail.append(desc);
    details.append(detail);
  });

  link.append(img);
  link.append(details);
  cart.append(link);

  return cart;
}

export function showLoadBtn() {
  loadMoreBtn.style.display = 'block';
}

export function hideLoadBtn() {
  loadMoreBtn.style.display = 'none';
}
