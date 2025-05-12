import fragmentShaderSource from './shader.js';
import { createRenderer } from './glsl-sandbox.js';

const { canvas, draw } = createRenderer(fragmentShaderSource);

const shouldHaveHeadStart = !document.documentElement.classList.contains('first-load')
  || document.documentElement.classList.contains('subpage');

const headStart = shouldHaveHeadStart ? 1000 : 0;

canvas.id = 'bg';
document.body.appendChild(canvas);

const onWindowResize = () => {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
}

onWindowResize();
window.addEventListener('resize', onWindowResize, false);

const mouse = new DOMPoint(0, 0);

window.addEventListener('pointermove', (event) => {
  mouse.x = event.clientX / window.innerWidth;
  mouse.y = event.clientY / window.innerHeight;
});

const animate = (time) => {
  requestAnimationFrame(animate);
  draw(time + headStart, mouse.x, mouse.y, canvas.width, canvas.height, false);
};

export const startAnimating = () => requestAnimationFrame(animate);

startAnimating();
