import fragmentShaderSource from './bg.glsl';
import { createRenderer } from '../glsl-sandbox.js';

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const { canvas, draw } = createRenderer(fragmentShaderSource);

canvas.id = 'bg';
document.body.appendChild(canvas);

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

const onWindowResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const onMouseMove = event => {
  MouseX.setTarget(event.clientX / window.innerWidth);
  MouseY.setTarget(1 - event.clientY / window.innerHeight);
}

onWindowResize();
window.addEventListener('resize', onWindowResize, false);
document.body.addEventListener('mousemove', onMouseMove, false);

const animate = time => {
  requestAnimationFrame(animate);

  MouseX.update();
  MouseY.update();

  draw(time, MouseX.getValue(), MouseY.getValue(), canvas.width, canvas.height, mediaQuery.matches);
}

export const startAnimating = () => requestAnimationFrame(animate);
