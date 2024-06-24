const ASPECT_DIM = innerWidth > innerHeight ? 'y' : 'x';

const DUNE1X = Math.random();
const DUNE2X = Math.random();
const DUNE3X = Math.random();
const DUNE1P = Math.random() * 30 + 10;
const DUNE2P = Math.random() * 30 + 10;
const DUNE3P = Math.random() * 30 + 10;

export default `
# define SPEED 0.9
# define START_COLOR vec3(1.5, 1.5, 1.5)
# define END_COLOR vec3(0.0, 0.0, 0.0)

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform int invert;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 dune(vec2 uv, vec2 point, float period, float introDuration) {
  uv.x += sin(uv.y * 10.0 + time * 0.2) / period;

  vec2 relative = uv - point;
  float angle = -1.0 * atan(relative.x, relative.y);
  float t = (angle + 3.14) / 2.0 / 3.14;

  return 0.1 * (1.0 / (min((time + 1.0) / introDuration, 1.0))) * mix(START_COLOR, END_COLOR, t);
}

void main() {
  vec2 res = resolution.xy;
  vec2 uv = vec2(gl_FragCoord.xy - 0.5 * res) / res.${ASPECT_DIM};
  uv = uv + vec2(0.5, 0.5);

  vec3 base = vec3(1.0, 1.0, 1.0);
  vec3 d = dune(uv, vec2(${DUNE1X}, min(0.9, time * SPEED)), ${DUNE1P}, 0.5);
  vec3 d2 = dune(uv, vec2(${DUNE2X}, min(0.2, time * SPEED)), ${DUNE2P}, 8.0);
  vec3 d3 = dune(uv, vec2(${DUNE3X}, min(0.5, time * SPEED)), ${DUNE3P}, 3.0);
  float noise = (0.06 * rand(1.0e2 * uv + time * 0.0001) - 0.15);
  gl_FragColor = vec4(base - d - d2 - d3 - noise, 1.0);
}
`;
