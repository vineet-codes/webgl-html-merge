varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;
uniform float time;


void main() {

  vec2 newUV = vUv;

  // load sets the image as texture
  vec4 oceanView = texture2D(uImage, newUV);

  // gl_FragColor = vec4(finalColor, 1.);
  // gl_FragColor = vec4(vUv, 0., 1.);
  // gl_FragColor = oceanView + vec4(vNoise);
  // gl_FragColor = vec4(vNoise, 0., 0., 1.);
  gl_FragColor = oceanView;
  gl_FragColor.rgb += 0.03*vec3(vNoise, 0., 0.);
}