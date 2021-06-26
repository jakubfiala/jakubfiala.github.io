import gallery from 'gallery';

import { openDeepLinked } from './components/deep-links.js';
import { startAnimating } from './components/background.js';

startAnimating();
gallery(document);

openDeepLinked(location.hash.replace('#', ''));
window.addEventListener('hashchange', e => openDeepLinked(location.hash.replace('#', '')));

const openAllDetails = () => {
  const details = document.querySelectorAll('details');
  [...details].forEach(d => d.open = true);
};

const replaceImagesForPrint = () => {
  const images = document.querySelectorAll('img[data-gallery-src]');
  [...images].forEach(img => img.src = img.getAttribute('data-gallery-src'));
};

window.addEventListener('beforeprint', e => {
  openAllDetails();
  replaceImagesForPrint();
});
