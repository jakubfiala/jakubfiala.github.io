import fragmentShaderSource from './shader.js';
import { createRenderer } from '../glsl-sandbox.js';

const { canvas, draw } = createRenderer(fragmentShaderSource);

canvas.id = 'bg';
document.body.appendChild(canvas);

const onWindowResize = () => {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
}

onWindowResize();
window.addEventListener('resize', onWindowResize, false);

const animate = time => {
  requestAnimationFrame(animate);
  draw(time, 0, 0, canvas.width, canvas.height, false);
}

export const startAnimating = () => requestAnimationFrame(animate);

startAnimating();
