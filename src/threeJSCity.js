import { gsap } from 'gsap';
import * as THREE from 'three';

const from = ['first', 'last', 'center'];
const easing = [
  'sine.inOut',
  'power1.inOut',
  'power2.inOut',
  'expo.inOut',
  'circ.inOut',
  'back.inOut(1.3)',
];

function getRandomArrayElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export class ThreeJSCity {
  constructor() {}

  init() {
    this.camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(-35, 30, -35);
    this.camera.lookAt(new THREE.Vector3(5, 0, 5));

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1f8dd6);

    this.resizeListener = (e) => this.onResize(e);
    window.addEventListener('resize', this.resizeListener, false);

    this.createBoxes();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.beginAnimationLoop();
    this.animate();
  }

  createBoxes() {
    this.geometry = new THREE.BoxGeometry(1, 10, 1);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform float thickness;

      float edgeFactor(vec2 p){
        vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p) / thickness;
        return min(grid.x, grid.y);
      }

      void main() {
        float a = edgeFactor(vUv);
        vec3 c = mix(vec3(1), vec3(0), a);
        gl_FragColor = vec4(c, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        thickness: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
    });
    material.extensions.derivatives = true;

    const offset = 1.25;
    this.nRows = 25;
    this.nCols = 25;
    this.meshes = [];

    let newColumnBlock = 0,
      avenue = 0;

    for (let column = 0; column < this.nCols; column++) {
      newColumnBlock = (newColumnBlock + 1) % 4;
      if (newColumnBlock === 3) avenue += offset * 2;

      let newRowBlock = 0,
        street = 0;

      const box = new THREE.BoxGeometry(1, 1, 1);

      for (let row = 0; row < this.nRows; row++) {
        newRowBlock = (newRowBlock + 1) % 4;
        if (newRowBlock === 3) street += offset * 2;

        const mesh = new THREE.Mesh(box, material);

        const width = Math.random() * 2;
        const height = 5 + Math.random() * 10;
        const depth = Math.random() * 2;

        mesh.scale.set(width, height, depth);

        mesh.position.x =
          row * offset -
          (this.nRows * 0.5 + this.geometry.parameters.width * 0.5) +
          street;

        mesh.position.y = -(this.geometry.parameters.height * 0.5); // starting y
        mesh.position.z =
          column * offset -
          (this.nCols * 0.5 + this.geometry.parameters.width * 0.5) +
          avenue;

        this.meshes.push(mesh);
        this.scene.add(mesh);
      }
    }
  }

  beginAnimationLoop() {
    const targets = this.meshes.map((m) => m.position);

    gsap.to(targets, {
      y: this.geometry.parameters.height * 0.1,
      duration: 1.2, // smooth lift
      ease: getRandomArrayElement(easing),
      yoyo: true,
      repeat: 1,
      stagger: {
        amount: 2.4, // spread across grid = long wave
        grid: [this.nRows, this.nCols],
        from: getRandomArrayElement(from),
      },
      onComplete: () => {
        // wait until wave finishes before next one
        gsap.delayedCall(0.2, () => this.beginAnimationLoop());
      },
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
