import * as THREE from 'three';

export function initialize() {
    const aspect = 9 / 16;
    const canvas = document.querySelector('#c');
    const renderer = initializeRenderer();
    const camera = intiailizeCamera();
    renderer.setSize(720 * aspect, 720);

    const scene = initializeScene();

    function initializeScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color().setHex(0x364239);
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
        return scene;
    }

    function intiailizeCamera() {
        const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 5);
        camera.position.z = 3;
        return camera;
    }

    function initializeRenderer() {
        return new THREE.WebGLRenderer({ antialias: true, canvas });
    }
    return { scene, renderer, camera };
}
