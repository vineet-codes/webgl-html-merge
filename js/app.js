import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import vertex from "./shaders/vertex.glsl"
import fragment from "./shaders/fragment.glsl"

import ocean from "./../images/ocean.jpg"



export default class Sketch {
  constructor(options){

    // time for the request animation frame
    this.time = 0;
    
    // set up the scene
    this.scene = new THREE.Scene();
    
    // size of the canvas
    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    // camera
    // var frustumSize = 10;
    // var aspect = window.innerWidth / window.innerHeight;
    // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
    this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.001, 10000 );
    this.camera.position.set(0, 0, 1.3);

    // setting up renderer
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize( this.width, this.height );
    // this.renderer.setClearColor(0x222222, 1); 

    this.container.appendChild( this.renderer.domElement )


    // orbit controls an animation loop is required when either damping or auto-rotation are enabled
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		this.controls.dampingFactor = 0.05;
    this.controls.enableDamping = true; 


    this.resize();
    this.setupResize();
    this.addObject();
    this.render();
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  addObject() {
    // this.geometry = new THREE.PlaneGeometry(1, 1, 40, 40);
    this.geometry = new THREE.SphereGeometry(0.4, 40, 40);


    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      uniforms: {
        time: { value: 0},
        resolution: { value: new THREE.Vector4() },
        oceanTexture: { value: new THREE.TextureLoader().load(ocean)},
      },
      side: THREE.DoubleSide,
      vertexShader: vertex,
      fragmentShader: fragment,
      wireframe: true
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  render() {
    this.time+= 0.05;

    this.mesh.rotation.x = this.time / 2000;
    this.mesh.rotation.y = this.time / 1000;

    // time for use in shaders
    this.material.uniforms.time.value = this.time;

    // update the controls
    this.controls.update();


    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

var sketch = new Sketch({
  dom: document.getElementById("container")
});


