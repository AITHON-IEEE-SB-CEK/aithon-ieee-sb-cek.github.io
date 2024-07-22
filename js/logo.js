// Importing three.js and other libraries
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

// Creating the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas-container'),
  antialias: true,
  alpha: true,
});

// Setting up the renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0);
renderer.shadowMap.enabled = true;

// Creating the computer model
const computerLoader = new THREE.GLTFLoader();
let computer;
computerLoader.load('3D/aithon/aithon2.gltf', (gltf) => {
  computer = gltf.scene;
  computer.scale.set(isMobile? 0.75 : 0.7);
  computer.position.set(isMobile? 0 : -3.25, -1.5);
  computer.rotation.set(-0.01, -0.2, -0.1);
  scene.add(computer);
});

// Creating the lights
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2.5);
const pointLight = new THREE.PointLight(0xffffff, 1);
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(-20, 50, 10);
spotLight.angle = 0.12;
spotLight.penumbra = 1;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add(hemisphereLight, pointLight, spotLight);

// Creating the orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 2;

// Handling mobile detection
let isMobile = false;
const mediaQuery = window.matchMedia("(max-width: 500px)");
mediaQuery.addEventListener("change", (event) => {
  isMobile = event.matches;
  computer.scale.set(isMobile? 0.75 : 0.7);
  computer.position.set(isMobile? 0 : -3.25, -1.5);
});

// Animating the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();