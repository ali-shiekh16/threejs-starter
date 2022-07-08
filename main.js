import './style.css';
import * as THREE from 'three';
import scene from './scene';
import configs from './configuration';
import renderer, { handleFullScreen, updateRenderer } from './renderer';
import camera, { updateCamera } from './camera';

const { sizes } = configs;

const objects = Array(4)
  .fill()
  .map(() => createTorus());

objects.forEach((torus, index) => {
  torus.position
    .copy(new THREE.Vector3(1, 1, 1))
    .normalize()
    .multiplyScalar(3 * (index + 1));

  scene.add(torus);
});

renderer.render(scene, camera);

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  updateCamera(sizes.width, sizes.height);

  updateRenderer(sizes.width, sizes.height);
});

window.addEventListener('dblclick', handleFullScreen);

function createTorus() {
  const geometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);
  const material = new THREE.MeshBasicMaterial({
    color: 0xc94c4c,
  });

  return new THREE.Mesh(geometry, material);
}
