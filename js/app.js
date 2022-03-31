import * as THREE from 'three';
import imagesLoaded from "imagesloaded";
import FontFaceObserver from "fontfaceobserver"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Scroll from "./scroll";

import vertex from "./shaders/vertex.glsl"
import fragment from "./shaders/fragment.glsl"

import ocean from "./../img/ocean.jpg"



export default class Sketch {
  constructor(options){

    // time for the request animation frame
    this.time = 0;

    this.container = options.dom;
    
    // set up the scene
    this.scene = new THREE.Scene();
    
    // size of the canvas
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    // camera
    // var frustumSize = 10;
    // var aspect = window.innerWidth / window.innerHeight;
    // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
    this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 100, 2000 );
    this.camera.position.z = 600;

    // required for seamless merge pf webgl
    this.camera.fov = 2*Math.atan((this.height/2) / 600)*(180 / Math.PI);

    // setting up renderer
    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize( this.width, this.height );
    // this.renderer.setClearColor(0x222222, 1); 

    this.container.appendChild( this.renderer.domElement )


    // orbit controls an animation loop is required when either damping or auto-rotation are enabled
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		this.controls.dampingFactor = 0.05;
    this.controls.enableDamping = true; 


    this.images = [...document.querySelectorAll("img")];

    console.log(this.images);

    const fontOpen = new Promise((resolve, reject) => {
      new FontFaceObserver("Open Sans").load().then(() => {
        resolve();
      })
    });

    const fontPlayfair = new Promise((resolve, reject) => {
      new FontFaceObserver("Playfair Display").load().then(() => {
        resolve();
      })
    });

    const preloadImages = new Promise((resolve, reject) => {
      imagesLoaded(document.querySelectorAll("img"), { background: true }, resolve);
    })

    let allDone = [fontOpen, fontPlayfair, preloadImages];

    this.currentScroll = 0; // how to get brwosers intial scroll ? 

    Promise.all(allDone).then(() => {

      this.scroll = new Scroll();
      this.addImages();
      this.setPositions();

      this.resize();
      this.setupResize();
      // this.addObject();
      this.render();

      // window.addEventListener('scroll', () => {
      //   this.currentScroll = window.scrollY;
      //   this.setPositions();
      // })
    })
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

  addImages() {
    this.imageStore = this.images.map(img=>{

      let bounds = img.getBoundingClientRect();

      let geometry = new THREE.PlaneGeometry(bounds.width, bounds.height, 1,1)

      let texture = new THREE.TextureLoader().load(img.src);
      // texture.needsUpdate = true;

      let material = new THREE.MeshBasicMaterial({
        // color: 0xff0000,
        map: texture
      });

      let mesh = new THREE.Mesh(geometry, material);

      this.scene.add(mesh);

      return {
        img: img,
        mesh: mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height
      }
    })
  }

  setPositions() {
    this.imageStore.forEach(o => {
      o.mesh.position.y = this.currentScroll -o.top + this.height/2 - o.height/2;
      o.mesh.position.x = o.left - this.width/2 + o.width/2 ;
    })
  }

  addObject() {
    this.geometry = new THREE.PlaneGeometry(200, 400, 10, 10);
    // this.geometry = new THREE.SphereGeometry(0.4, 40, 40);


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

    this.scroll.render();
    this.currentScroll = this.scroll.scrollToRender;
    this.setPositions();

    // time for use in shaders
    // this.material.uniforms.time.value = this.time;

    // update the controls
    this.controls.update();


    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

var sketch = new Sketch({
  dom: document.getElementById("container")
});


