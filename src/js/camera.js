import { PerspectiveCamera, Vector3 } from 'three';
import configs from './configuration';

const { width, height } = configs.sizes;

const camera = new PerspectiveCamera(45, width / height);
camera.position.setZ(5);
// camera.lookAt(new Vector3(0, 0, 0));

function updateCamera(width, height) {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

export default camera;
export { updateCamera };
