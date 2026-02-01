import createFragShader from "./shader.js";
import { createRenderer } from "./glsl-sandbox.js";

const overlay = createRenderer(createFragShader());
const bg = createRenderer(createFragShader(true));

const shouldHaveHeadStart =
  !document.documentElement.classList.contains("first-load") ||
  document.documentElement.classList.contains("subpage");

const headStart = shouldHaveHeadStart ? 1000 : 0;

overlay.canvas.id = "overlay";
document.body.appendChild(overlay.canvas);
bg.canvas.id = "bg";
document.body.insertBefore(bg.canvas, document.body.firstElementChild);

const onWindowResize = () => {
  overlay.canvas.width = window.innerWidth;
  overlay.canvas.height = window.innerHeight;
  bg.canvas.width = window.innerWidth;
  bg.canvas.height = window.innerHeight;
};

onWindowResize();
window.addEventListener("resize", onWindowResize, false);

const mouse = new DOMPoint(0, 0);

window.addEventListener("pointermove", (event) => {
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
  const shaderArgs = [
    time + headStart,
    renderedMouse.x,
    renderedMouse.y,
    overlay.canvas.width,
    overlay.canvas.height,
    false,
  ];
  overlay.draw(...shaderArgs);
  bg.draw(...shaderArgs);
};

export const startAnimating = () => requestAnimationFrame(animate);

startAnimating();
