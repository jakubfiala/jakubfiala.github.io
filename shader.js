const ASPECT_DIM = innerWidth > innerHeight ? 'y' : 'x';

const RAND_X = (Math.random() * 3).toFixed(2);
const RAND_Y = (Math.random() * 3).toFixed(2);

export default `
# define SPEED 0.25
# define PI 3.1415926538

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

void main() {
  vec2 res = resolution.xy;
  vec2 uv = vec2(gl_FragCoord.xy - 0.5 * res) / res.${ASPECT_DIM};
  uv = uv + vec2(0.5, 0.5);

  float tp = time * SPEED;

  vec3 base = vec3(1.0, 1.0, 1.0);
  float noise = (0.2 * rand(1.0e2 * uv + time * 0.0001) - 0.15);
  float lines = sin(uv.x * res.x) * 0.5;
  float gradient = mix(sin(uv.y + PI / 2.0 + tp + ${RAND_Y}) * 0.5, cos(uv.x * 2.0 + tp + ${RAND_X}), uv.y + sin(tp) - 1.0);
  float intro = clamp(time, 0.0, 0.4);

  gl_FragColor = vec4(base - lines + 0.5 * gradient - noise, intro);
}
`;
