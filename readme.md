# webgl and HTML

![img](./docs/dataflow_shaders.png)

1. Vertex Shaders

   a. manipulate the postion vec3 to have different geometries

   b. use perlin noise to manipulate postion, [reference implementation](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83) in glsl here

   c. use `sin` or other function to generate curv shaped geometries

   d. `uniforms`: how to introduce concept of time in vertext shaders:

   - define uniforms while defining the shader material
   - use the uniform variable in vertex shader
   - update the uniform value in request animation frame

## Effects Implemented

1. [Tao Tajima](http://taotajima.jp/works/)

## Features to implement

1. Smooth Scrolling
2. Merging with HTML
3. [Scrolling Images With WebGL and Three.js #41](https://www.youtube.com/watch?v=ivg603bYDk8)
4. [THREE JS: image RGB Split / Distortion On Scroll](https://www.youtube.com/watch?v=DdQn82X1G3I&t=1438s)
5. [Interactive WebGL Hover Effects](https://tympanus.net/codrops/2020/04/14/interactive-webgl-hover-effects/)
6. [Magnetic 3D Grid Interaction with Content Preview](https://tympanus.net/codrops/2021/04/21/magnetic-3d-grid-interaction-with-content-preview/)
7. [Implementing WebGL Powered Scroll Animations](https://tympanus.net/codrops/2020/10/19/implementing-webgl-powered-scroll-animations/)
8. [Particles Image Animation from Mathis Biabiany’s website](https://tympanus.net/codrops/2020/10/26/particles-image-animation-from-mathis-biabianys-website/)
9. [Coding a 3D Lines Animation with Three.js](https://tympanus.net/codrops/2020/12/14/coding-a-3d-lines-animation-with-three-js/)
