const spinner = document.querySelector('.loader');

export function showSpinner() {
  spinner.style.visibility = 'visible';
}

export function hideSpinner() {
  spinner.style.visibility = 'hidden';
}