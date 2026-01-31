const ASPECT_DIM = innerWidth > innerHeight ? "y" : "x";

const firstLoad = !sessionStorage.getItem("jffl");
if (firstLoad) {
  sessionStorage.setItem("jffl", true);
}

export default `
# define SPEED 0.3
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

  float noise = (0.2 * rand(1.0e2 * uv + time * 0.0001) - 0.15);
  float intro = clamp(tp, 0.0, 0.4);

  float lines = pow(sin(uv.x * ${window.innerWidth.toFixed(1)}), 2.0)
    * sin(uv.x)
    + cos(uv.y * 2.0 + min(tp${firstLoad ? "" : "+ 1.25"}, 3.0));

  // lines += pow(sin(uv.y * 100.0), 2.0);

  float full = lines + noise;

  gl_FragColor = vec4(vec3(full), full);
}
`;
