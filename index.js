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

const YouTubeProvider = {
  getEmbeds() {
    return document.querySelectorAll('iframe[src*="youtube.com"]');
  },
  getImageSrc(videoId) {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  },
  srcRegex: /embed\/(.*)\?/
};

const VimeoProvider = {
  getEmbeds() {
    return document.querySelectorAll('iframe[src*="vimeo.com"]');
  },
  getImageSrc(videoId, embed) {
    return embed.getAttribute('data-print-image');
  },
  srcRegex: /video\/(.*)\?/
};

const HTML5Provider = {
  getEmbeds() {
    return document.querySelectorAll('figure > video');
  },
  getImageSrc(_, video) {
    return video.getAttribute('poster');
  },
  srcRegex: /(.*)/
};

const replaceEmbedsForPrint = provider => {
  const embeds = Array.from(provider.getEmbeds());
  embeds.forEach(embed => {
    const [ _, videoId ] = embed.src.match(provider.srcRegex);

    const img = new Image();
    img.src = provider.getImageSrc(videoId, embed);

    const link = document.createElement('a');
    link.href = embed.src;
    link.innerText = 'Video';
    link.style.display = 'inline-block';
    link.style.marginTop = '0.618rem';

    embed.parentElement.classList.remove('video-embed');
    embed.parentElement.classList.add('embed--print');
    embed.parentElement.appendChild(img);
    embed.parentElement.appendChild(link);
    embed.parentElement.removeChild(embed);
  });
}

window.addEventListener('beforeprint', e => {
  openAllDetails();
  replaceImagesForPrint();
  [ YouTubeProvider, VimeoProvider, HTML5Provider ].forEach(replaceEmbedsForPrint);
});
