const spinner = document.querySelector('.loader');

export function showSpinner() {
  spinner.style.display = 'flex';
}

export function hideSpinner() {
  spinner.style.display = 'none';
}