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

const canvas = document.getElementById('bg');

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


const onWindowResize = event => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.resolution.value.x = renderer.domElement.width;
  uniforms.resolution.value.y = renderer.domElement.height;
}

const onMouseMove = event => {
  uniforms.mouse.value.x = event.screenX / window.innerWidth;
  uniforms.mouse.value.y = 1 - event.screenY / window.innerHeight;
}

onWindowResize();
window.addEventListener('resize', onWindowResize, false);
document.body.addEventListener('mousemove', onMouseMove, false);

const animate = time => {
  requestAnimationFrame(animate);

  uniforms.time.value = time / 2000;
  renderer.render(scene, camera);
}

requestAnimationFrame(animate);

gallery(document);

openDeepLinked(location.hash.replace('#', ''));
window.addEventListener('hashchange', e => openDeepLinked(location.hash.replace('#', '')));
