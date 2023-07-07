// import './css/style.scss';
import '../css/style.scss';
import * as THREE from 'three';
import camera, { updateCamera } from './camera';
import configs from './configuration';
import renderer, { handleFullScreen, updateRenderer } from './renderer';
import scene from './scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from '../shaders/vert.glsl';
import fragmentShader from '../shaders/frag.glsl';

const { sizes } = configs;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 32, 32),
  new THREE.ShaderMaterial({ fragmentShader, vertexShader })
);

scene.add(plane);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  updateCamera(sizes.width, sizes.height);
  updateRenderer(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

window.addEventListener('dblclick', handleFullScreen);

const clock = new THREE.Clock();
function animate() {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
