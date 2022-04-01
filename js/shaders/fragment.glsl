varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;
uniform float time;
uniform float hoverState;



void main() {

  vec2 newUV = vUv;

  // load sets the image as texture
  vec4 imageTexture = texture2D(uImage, newUV);

  vec2 p = newUV;
  float x = hoverState;
  x = smoothstep(.0,1.0,(x*2.0+p.y-1.0));
  vec4 f = mix(
    texture2D(uImage, (p-.5)*(1.-x)+.5), 
    texture2D(uImage, (p-.5)*x+.5), 
    x);

  gl_FragColor = f;
  gl_FragColor.rgb += 0.03*vec3(vNoise, 0., 0.);
}