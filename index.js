import {
  WebGLRenderer,
  Mesh,
  Camera,
  Scene,
  ShaderMaterial,
  Vector2,
  PlaneBufferGeometry
} from 'three';

import gallery from 'gallery';

import { openDeepLinked } from './components/deep-links.js';
import fragmentShader from './bg.glsl';

const uniforms = {
  time: {
    type: 'f',
    value: 1.0
  },
  resolution: {
    type: 'v2',
    value: new Vector2()
  },
  mouse: {
    type: 'v2',
    value: new Vector2(1, 0)
  }
};

const renderer = new WebGLRenderer();
const scene = new Scene();
const camera = new Camera();
const geometry = new PlaneBufferGeometry(2, 2);

const material = new ShaderMaterial({
  uniforms: uniforms,
  vertexShader: 'void main() { gl_Position = vec4( position, 1.0 ); }',
  fragmentShader
});

const mesh = new Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 1;

//Hack here to change resolution
renderer.setPixelRatio(window.devicePixelRatio / 2);
renderer.domElement.id = 'bg';
document.body.appendChild(renderer.domElement);

const dampened = speed => {
  let target = 0;
  let value = 0;
  return {
    setTarget: t => target = t,
    getValue: v => value,
    update: () => value += (target - value) * speed,
  };
};

const dampeningFactor = 0.08;
let MouseX = dampened(dampeningFactor);
let MouseY = dampened(dampeningFactor);

const onWindowResize = event => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.resolution.value.x = renderer.domElement.width;
  uniforms.resolution.value.y = renderer.domElement.height;
}

const onMouseMove = event => {
  MouseX.setTarget(event.screenX / window.innerWidth);
  MouseY.setTarget(1 - event.screenY / window.innerHeight);
}

onWindowResize();
window.addEventListener('resize', onWindowResize, false);
document.body.addEventListener('mousemove', onMouseMove, false);

const animate = time => {
  requestAnimationFrame(animate);

  uniforms.time.value = time / 2000;

  MouseX.update();
  MouseY.update();
  uniforms.mouse.value.x = MouseX.getValue();
  uniforms.mouse.value.y = MouseY.getValue();

  renderer.render(scene, camera);
}

requestAnimationFrame(animate);

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
