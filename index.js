import fragmentShaderSource from './shader.js';
import { createRenderer } from './glsl-sandbox.js';

const { canvas, draw } = createRenderer(fragmentShaderSource);

const shouldHaveHeadStart = !document.documentElement.classList.contains('first-load')
  || document.documentElement.classList.contains('subpage');

const headStart = shouldHaveHeadStart ? 1000 : 0;

canvas.id = 'bg';
document.body.appendChild(canvas);

const onWindowResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

onWindowResize();
window.addEventListener('resize', onWindowResize, false);

const mouse = new DOMPoint(0, 0);

window.addEventListener('pointermove', (event) => {
  mouse.x = event.clientX / window.innerWidth;
  mouse.y = event.clientY / window.innerHeight;
});

const renderedMouse = new DOMPoint(0, 0);

const animate = (time) => {
  // smoothly transition to the new mouse position
  if (Math.abs(mouse.x - renderedMouse.x) > 1e-1) {
    renderedMouse.x += (mouse.x - renderedMouse.x) / 20;
  }
  if (Math.abs(mouse.y - renderedMouse.y) > 1e-1) {
    renderedMouse.y += (mouse.y - renderedMouse.y) / 20;
  }

  requestAnimationFrame(animate);
  draw(time + headStart, renderedMouse.x, renderedMouse.y, canvas.width, canvas.height, false);
};

export const startAnimating = () => requestAnimationFrame(animate);

startAnimating();
