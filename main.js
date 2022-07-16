import './style.css';
import * as THREE from 'three';
import camera, { updateCamera } from './camera';
import configs from './configuration';
import earthMap from './maps/earth.jpg';
import marsMap from './maps/mars.jpg';
import renderer, { handleFullScreen, updateRenderer } from './renderer';
import scene from './scene';
import sunMap from './maps/sun.jpg';
import venusMap from './maps/venus.jpg';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const { sizes } = configs;

const light = new THREE.PointLight(0xffffff, 2, 100);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

const sun = createPlanet(1, sunMap);
scene.add(sun);

const earth = createPlanet(0.4, earthMap);
earth.position.x = 6;
sun.add(earth);

const marsParent = new THREE.Object3D();
scene.add(marsParent);
const mars = createPlanet(0.5, marsMap);
mars.position.x = 3;
mars.position.z = 3;
marsParent.add(mars);

const venusParent = new THREE.Object3D();
scene.add(venusParent);
const venus = createPlanet(0.3, venusMap);
venus.position.x = 7;
venus.position.z = 3;
venusParent.add(venus);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

function createPlanet(radius, map) {
  const loader = new THREE.TextureLoader();
  const geometry = new THREE.SphereGeometry(radius, 50, 50);
  const material = new THREE.MeshStandardMaterial({
    map: loader.load(map),
  });
  return new THREE.Mesh(geometry, material);
}

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

  sun.rotation.y = elapsedTime * (Math.PI / 10);
  earth.rotation.y = elapsedTime * (Math.PI / 6);

  marsParent.rotation.y = elapsedTime * (Math.PI / 12);
  mars.rotation.y = elapsedTime * (Math.PI / 7);

  venusParent.rotation.y = elapsedTime * (Math.PI / 9);
  venus.rotation.y = elapsedTime * (Math.PI / 4);

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
