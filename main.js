import './style.css';
import * as THREE from 'three';
import scene from './scene';
import configs from './configuration';
import renderer, { handleFullScreen, updateRenderer } from './renderer';
import camera, { updateCamera } from './camera';

const { sizes } = configs;

const geometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xc94c4c,
  wireframe: true,
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  torus.rotation.y += 0.02;
  torus.rotation.x += 0.02;
  torus.position.distanceTo();
}

animate();

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  updateCamera(sizes.width, sizes.height);

  updateRenderer(sizes.width, sizes.height);
});

window.addEventListener('dblclick', handleFullScreen);
