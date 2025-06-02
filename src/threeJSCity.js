import { gsap } from 'gsap';
import * as THREE from 'three';

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

    this.animate();
    this.beginAnimationLoop();
  }

  createBoxes() {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        thickness: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
      extensions: { derivatives: true },
    });

    const offset = 1.25;
    this.nRows = 25;
    this.nCols = 25;
    this.meshes = [];
    this.quickSetters = [];

    let newColumnBlock = 0,
      avenue = 0;

    const sharedGeometry = new THREE.BoxGeometry(1, 1, 1);

    for (let column = 0; column < this.nCols; column++) {
      newColumnBlock = (newColumnBlock + 1) % 4;
      if (newColumnBlock === 3) avenue += offset * 2;

      let newRowBlock = 0,
        street = 0;

      for (let row = 0; row < this.nRows; row++) {
        if (Math.random() < 0.1) continue;
        newRowBlock = (newRowBlock + 1) % 4;
        if (newRowBlock === 3) street += offset * 2;

        const mesh = new THREE.Mesh(sharedGeometry, material);

        const width = Math.random() * 2;
        const height = 5 + Math.random() * 10;
        const depth = Math.random() * 2;

        mesh.scale.set(width, height, depth);

        mesh.position.x =
          row * offset - (this.nRows * 0.5 + width * 0.5) + street;

        mesh.position.y = -(height * 0.5);
        mesh.position.z =
          column * offset - (this.nCols * 0.5 + width * 0.5) + avenue;

        this.meshes.push(mesh);
        this.scene.add(mesh);
        this.quickSetters.push(gsap.quickSetter(mesh.position, 'y'));
      }
    }
  }

  beginAnimationLoop() {
    const baseY = -4;
    const values = this.meshes.map(() => ({ value: 0 }));
    const quickSetters = this.quickSetters;

    gsap.to(values, {
      value: 1,
      duration: 2,
      ease: getRandomArrayElement(easing),
      yoyo: true,
      repeat: 1,
      stagger: {
        amount: 5,
        grid: [this.nRows, this.nCols],
        from: getRandomArrayElement(from),
      },
      onUpdate: () => {
        for (let i = 0; i < values.length; i++) {
          const t = values[i].value;
          const y = baseY + Math.sin(t * Math.PI) * 4;
          quickSetters[i](y);
        }
      },
      onComplete: () => {
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
