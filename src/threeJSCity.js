import * as THREE from 'three';

export class ThreeJSCity {
  constructor() {
    this.randFrom = ['first', 'last', 'center'];
    this.easing = [
      'linear',
      'easeInOutQuad',
      'easeInOutCubic',
      'easeInOutQuart',
      'easeInOutQuint',
      'easeInOutSine',
      'easeInOutExpo',
      'easeInOutCirc',
      'easeInOutBack',
      'cubicBezier(.5, .05, .1, .3)',
      'spring(1, 80, 10, 0)',
      'steps(10)',
    ];
  }
  init() {
    this.camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.x = -35;
    this.camera.position.y = 30;
    this.camera.position.z = -35;

    const point = new THREE.Vector3(5, 0, 5);
    this.camera.lookAt(point);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1f8dd6);

    this.resizeListener = (e) => this.onResize(e);
    window.addEventListener('resize', this.resizeListener, false);

    this.createBoxes();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
    this.beginAnimationLoop();
    this.animate();
  }
  createBoxes() {
    this.geometry = new THREE.BoxGeometry(1, 10, 1);

    let vertexShader = `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
          `;

    let fragmentShader = `
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

    let material = new THREE.ShaderMaterial({
      uniforms: {
        thickness: {
          value: 1.0,
        },
      },
      vertexShader,
      fragmentShader,
    });
    material.extensions.derivatives = true;

    let cube = new THREE.Mesh(this.geometry, material);

    let offset = 1.25;
    this.nRows = 25;
    this.nCols = 25;
    this.staggerArray = [];

    let newColumnBlock = 0,
      avenue = 0;

    for (var column = 0; column < this.nCols; column++) {
      newColumnBlock = (newColumnBlock + 1) % 4;
      if (newColumnBlock == 3) avenue += offset * 2;

      let newRowBlock = 0,
        street = 0;
      for (var row = 0; row < this.nRows; row++) {
        newRowBlock = (newRowBlock + 1) % 4;
        if (newRowBlock == 3) street += offset * 2;

        // let obj = cube.clone();
        let obj = new THREE.Mesh(
          new THREE.BoxGeometry(
            1 * Math.random() * 2,
            10 + Math.random() * 10 - 5,
            1 * Math.random() * 2,
          ),
          material,
        );
        obj.position.x =
          row * offset -
          (this.nRows * 0.5 + this.geometry.parameters.width * 0.5) +
          street;
        obj.position.y = -(this.geometry.parameters.height * 0.5);
        obj.position.z =
          column * offset -
          (this.nCols * 0.5 + this.geometry.parameters.width * 0.5) +
          avenue;
        this.staggerArray.push(obj.position);
        this.scene.add(obj);
      }
    }
  }
  beginAnimationLoop() {
    // random from array
    let randFrom =
      this.randFrom[Math.floor(Math.random() * this.randFrom.length)];
    let easingString =
      this.easing[Math.floor(Math.random() * this.easing.length)];

    anime({
      targets: this.staggerArray,
      y: [
        { value: this.geometry.parameters.height * 0.1, duration: 500 },
        {
          value: -(this.geometry.parameters.height * 0.1),
          duration: 2000,
        },
      ],
      delay: anime.stagger(400, {
        grid: [this.nRows, this.nCols],
        from: randFrom,
      }),
      easing: easingString,
      complete: (anim) => this.beginAnimationLoop(),
    });
  }
  animate() {
    requestAnimationFrame(() => this.animate());
    this.update();
    this.render();
  }
  update() {}
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  onResize() {
    // scene & camera update
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
