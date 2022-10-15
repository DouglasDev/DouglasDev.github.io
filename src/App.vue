<template>
  <div id="app">
    <header class="header lavalamp-menu" id="main-header">
      <nav class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
        <!-- <a class="pure-menu-heading" href="">Your Site</a> -->
        <ul class="pure-menu-list">
          <li class="pure-menu-item active"><a href="#app" class="pure-menu-link">Home</a></li>
          <li class="pure-menu-item"><a href="#portfolio" class="pure-menu-link">Portfolio</a></li>
          <li class="pure-menu-item"><a href="#skills" class="pure-menu-link">Skills</a></li>
          <li class="pure-menu-item"><a href="#about" class="pure-menu-link">About</a></li>
        </ul>
        <div class="lavalamp"></div>
      </nav>
    </header>
      <div class="splash-container">
<!--         <renderer :size="{ w: 600, h: 400 }" class="threeRoot">
          <scene>
            <camera :position="{ z: 15 }"></camera>
            <mesh :obj="mesh" :position="{ y: -200 }"></mesh>
            <animation :fn="animate" :speed="3"></animation>
          </scene>
        </renderer> -->
        <div class="splash">
          <h1 class="splash-head">Douglas Lerner</h1>
          <p class="splash-subhead">
            NYC Based Web Developer
          </p>
          <p>
            <a target="_blank" href="https://docs.google.com/document/d/1c1_kVXluuXLo7WPebGXqj607Ez_LvSNCj8MCMf0HUxU/edit?usp=sharing" class="pure-button pure-button-primary top-button">Resume</a>
            <a target="_blank" href="mailto:douglasdev8888@gmail.com" class="pure-button pure-button-primary top-button">Email</a>
            <a target="_blank" href="https://github.com/DouglasDev" class="pure-button pure-button-primary top-button">Github</a>
            <a target="_blank" href="https://www.linkedin.com/in/douglas-lerner-66590467/" class="pure-button pure-button-primary top-button">Linkedin</a>
          </p>
        </div>
      </div>
      <main class="content-wrapper">
        <div class="animatedParent animateOnce" data-sequence='500' style="background:#FFFFFF;" id="portfolio">
          <h2 class="content-head is-center">Portfolio</h2>
          <div class="centered-buttons animated growIn" data-id='1'>
            <button class="pure-button" v-for="type in filterPortfolio" @click="selectedWorks=type" :style="selectedWorks==type?{background:'#2d3e50',color:'white'}:{}">
              {{type}}
            </button>
          </div>
          <transition-group name="fade" tag="div" class="centered-layout portfolio-box animated growIn" data-id='2'>
            <div class="content l-box-lrg pure-g project-img-box" v-for="(work,i) in works" v-if="work.type.includes(selectedWorks)||selectedWorks=='All'" :key="work.title">
              <div class="flip-card" @click="showModal(work)">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <img class="screenshot pure-img-responsive " :src="work.src" :alt="work.title">
                  </div>
                  <div class="flip-card-back content-head" style="margin:0">
                    <p>
                      <h2>{{work.title}}</h2>
                      <div class="skill-list">
                        <div class="skill-list-item" v-for="tech in work.tech">{{tech}}</div>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <div class="content" id="skills">
          <h2 class="content-head is-center">Technologies and Skills</h2>
          <div class="pure-g ">
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4 animatedParent" data-sequence='200' v-for="skillType in skills">
              <h3 class="content-subhead">
                <i :class="skillType.titleIcon"></i>{{skillType.title}}
              </h3>
              <div class="icon-box">
                <div :class='skillType.animation' v-for="skill in skillType.content" :data-id='skill["data-id"]'>
                  <img :src="'icons/'+skill.src" :alt="skill.name" class="icon-tech" :style="skill.style?skill.style:null">
                  <div class="icon-tech-name">{{skill.name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ribbon" id="about">
          <div class="contact-form">
            <div class="pure-g">
              <div class="l-box-lrg pure-u-1 pure-u-md-3-5">
                <h2 class="content-head-ribbon is-left">About Me</h2>
                <p>
                  I create web apps that connect people, educate, and entertain. I've worked on variety of projects for multiple start-ups, small businesses, a publishing house, and a record company.
                </p>
                <p>
                  Last year, I completed a batch at the <a href="http://www.recurse.com">Recurse Center</a>, which is a 3 month full-time self-directed programming retreat. While there, I immersed myself in projects that involved browser extension development, game development, machine learning, natural language processing, genetic algorithms, and computer generated music.
                </p>
                <p>
                  In addition to programming, I have experience working as an ESL teacher and Chinese translator, as well as a background in classical music and biology, and I often incorporate this expertise into my projects.
                </p>
              </div>
              <div class="l-box-lrg pure-u-1 pure-u-md-2-5">
                <h2 class="content-head-ribbon is-left">Contact Me</h2>
                <p>
                  I'm currently looking for full-time work. Don't hestate to get in touch!
                </p>
                <form class="pure-form pure-form-stacked contact-form-container" action="https://formspree.io/xeqjaajb" method="POST">
                  <fieldset>
                    <input id="name" type="text" placeholder="Name" name="Name" required>
                    <input id="email" type="email" placeholder="Email" name="Email" required>
                    <textarea id="message" type="text" placeholder="Message" name="Message" required></textarea>
                    <button type="submit" class="pure-button">Send</button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
          <div class="stars">
            <div class="clouds">
              <div class="animatedParent" style="opacity: .8;">
                <img src="nyc.png" alt="nyc" style="width:100%;position: relative;z-index: 4;    margin-bottom: 0rem;" class='animated fadeInUp'>
              </div>
            </div>
          </div>
        </div>
      </main>
      <sweet-modal ref="modal">
        <h3 class="project-title">{{selectedWork.title}}</h3>
        <carousel :per-page='1' :navigationEnabled="true" :paginationSize="12">
          <slide class="slide slide-text" key='a' ref='a'>
            {{selectedWork.description}}
          </slide>
          <slide class="slide" key='b' ref='b'>
            <img :src="selectedWork.src" :alt="selectedWork.title" class="pure-img-responsive">
          </slide>
        </carousel>
        <div>
          <a target="_blank" :href="link.link" class='pure-button' v-for="link in selectedWork.links">{{link.type}}</a>
        </div>
      </sweet-modal>
  </div>
</template>
<script>
import MenuSpy from 'menuspy'



export default {
  name: 'app',
  components: {},
  mounted() {
    this.setUpLavalamp()
    this.setUpThree()
  },
  methods: {
    setUpLavalamp(){
      function positionLavalamp(activeElm) {
        lavalampElm.style.width = activeElm.elm.offsetWidth + 'px';
        lavalampElm.style.left = activeElm.elm.getBoundingClientRect().x + 'px';
      };
      const lavalampElm = document.querySelector('.lavalamp');
      const elm = document.querySelector('#main-header');
      const ms = new MenuSpy(elm, {
        callback: positionLavalamp
      });
      positionLavalamp({ elm: elm.querySelector('li.active') });    
    },
    setUpThree(){
      class App {
        constructor() {
          this.randFrom = [
            'first',
            'last',
            'center'
          ];
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
            'steps(10)'
          ];
        }
        init() {
          this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
          this.camera.position.x = -35;
          this.camera.position.y = 30;
          this.camera.position.z = -35;

          const point = new THREE.Vector3(5,0,5);
          this.camera.lookAt( point );

          this.scene = new THREE.Scene();
          this.scene.background = new THREE.Color( 0x1f8dd6 );

          this.resizeListener = e => this.onResize(e);
          window.addEventListener('resize', this.resizeListener, false);

          this.createBoxes();

          this.renderer = new THREE.WebGLRenderer({
            antialias: true
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
                value: 1.0
              }
            },
            vertexShader,
            fragmentShader
          });
          material.extensions.derivatives = true;

          let cube = new THREE.Mesh(this.geometry, material);

          let offset = 1.25;
          this.nRows = 25;
          this.nCols = 25;
          this.staggerArray = [];

          let newColumnBlock=0,avenue=0

          for (var column = 0; column < this.nCols; column++) {
            newColumnBlock=(newColumnBlock+1)%4
            if (newColumnBlock==3)avenue+=offset*2

              let newRowBlock=0,street=0
            for (var row = 0; row < this.nRows; row++) {
              newRowBlock=(newRowBlock+1)%4
              if (newRowBlock==3)street+=offset*2

              // let obj = cube.clone();
            let obj = new THREE.Mesh(new THREE.BoxGeometry(1*Math.random()*2, 10+Math.random()*10-5, 1*Math.random()*2), material);
              obj.position.x = (row * offset) - ((this.nRows * 0.5) + (this.geometry.parameters.width * 0.5))+street;
              obj.position.y = -(this.geometry.parameters.height * 0.5);
              obj.position.z = (column * offset) - ((this.nCols * 0.5) + (this.geometry.parameters.width * 0.5))+avenue;
              this.staggerArray.push(obj.position);
              this.scene.add(obj);
            }
          }
        }
        beginAnimationLoop() {
          // random from array
          let randFrom = this.randFrom[Math.floor(Math.random() * this.randFrom.length)];
          let easingString = this.easing[Math.floor(Math.random() * this.easing.length)];

          anime({
            targets: this.staggerArray,
            y: [
              { value: (this.geometry.parameters.height * 0.1), duration: 500 },
              { value: -(this.geometry.parameters.height * 0.1), duration: 2000 },
            ],
            delay: anime.stagger(400, { grid: [this.nRows, this.nCols], from: randFrom }),
            easing: easingString,
            complete: (anim) => this.beginAnimationLoop()
          });

        }
        animate() {
          requestAnimationFrame(() => this.animate());
          this.update();
          this.render();
        }
        update() {
        }
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

      let app = new App();
      app.init();      
    },
    showModal(work) {
      this.selectedWork = work
      this.$refs.modal.open()
    }
  },
  data() {
    return {
      filterPortfolio: ['All', 'Front-End', 'Full-Stack', 'Educational', 'Browser Extensions', 'Games', 'Machine Learning'],
      selectedWorks: 'All',
      selectedWork: {},
      works: [{
          src: "projects/eComments.png",
          title: 'e-Comments',
          type: ['Work', 'Educational', 'Front-End', 'Browser Extensions'],
          tech: ['VueJS', 'Vuex', 'Web Speech API', 'Google Drive API'],
          description: `With the e-Comments Chrome Extension, teachers and workplace supervisors can insert hundreds of customizable Common Core-aligned comments, which identify, explain, and show  how to revise writing issues, with just one click from the e-Comments menu. Comments don’t simply flag errors or suggest revisions; these comprehensive comments help students learn. Teachers can add their own comments to the menu, including audio, video, and speech-to-text. Includes separate comment banks for grades 3-6, 6-9, 9-12, and College/Workplace.`,
          details: ``,
          links: [{ type: 'Chrome Web Store', link: 'https://chrome.google.com/webstore/detail/e-comments/dccccbckfnndplihkaeiekggmeicbhgj/' }]
        },
        {
          src: "projects/kittieFight.png",
          title: 'KittieFIGHT',
          type: ['Work', 'Games', 'Front-End'],
          tech: ['React', 'Redux', 'Phaser 3', 'Spine Animations', 'Web3.js'],
          description: `In kittieFIGHT, tokens are awarded to winners of each fight session that utilizes customized fighting kittie characters derived from the Cryptokitties platform. kittieFIGHT is gamified with a unique economic token model utilizing limited supply with suppressed emissions and incentivized crowd dynamics to drive up each value of token necessary to reward owners of Cryptokitties non-fungible tokens.
       
          The kittieFIGHT Dapp also solves the problem of oversupply of Cryptokitties via a kittie-sink called kittieHELL. The sink effect from fights also serves to create demand for new kitties on the Cryptokitties platform. Winners of fights on the kittieFIGHT platform can trade winning tokens to buy more Cryptokitties collectibles.`,
          details: ``,
          links: [{ type: 'Official Website', link: 'https://www.kittiefight.io/' }]
        },
        {
          src: "projects/harpsichord-hero.png",
          title: 'Harpsichord Hero',
          type: ['Projects', 'Music', 'Front-End'],
          tech: ['HTML canvas', 'Teoria.js', 'Soundfont-Player', 'MIDI.js'],
          description: `A digital musical instrument that allows people with no musical background to improvise harpischord music in the baroque style. The instrument has a built-in knowledge of harmony and musical style, which allows users to effortlessly improvise complex melodies and chord progressions.`,
          details: ``,
          links: [{ type: 'Live Demo', link: 'https://douglasdev.github.io/Harpsichord-Hero' },
            { type: 'Github', link: 'https://github.com/DouglasDev/Harpsichord-Hero' }
          ]
        },
        {
          src: "projects/charts DNP/Screenshot Charts.png",
          title: 'Sales Charts',
          type: ['Work', 'Front-End'],
          tech: ['JavaScript', 'Charts.JS'],
          description: `Interactive dashboard for sales reps, that reads data from Laravel backend and generates beautiful responsive animated sales charts.`,
          details: ``,
          links: [{ type: 'Live Demo', link: './projects/charts DNP/index.html' }]
        },
        {
          src: "projects/Cocktail Party Neuro Evolution/screenshot 1.png",
          title: 'NeuroEvolution Cocktail Party',
          type: ['Projects', 'Machine Learning', 'Front-End'],
          tech: ['Vanilla JS', 'Neatapic.js'],
          description: `A simulation of human social interactions, which evolves social agents that can adapt to one another's behaviors. Uses a JavaScript implementation of the NEAT (Neuro Evolution through Augmented Topology) genetic algorithm, which evolves neural networks through the process of Darwinian evolution. `,
          details: ``,
          links: [{ type: 'Live Demo', link: './projects/Cocktail Party Neuro Evolution/index.html' },
            { type: 'Github', link: 'https://github.com/DouglasDev/Neuro-Evolution-Cocktail-Party' }
          ]
        },
        {
          src: "projects/leetcode pairing screenshot.png",
          title: 'LeetCode Pairing',
          type: ['Projects', 'Full-Stack', 'Browser Extensions'],
          tech: ['React', 'Node Express', 'Oauth2', 'Webpack', 'WebRTC', 'Socket.io', 'Codemirror API', 'Chrome API'],
          description: `A Chrome extension which enables coders to pair program over the internet and solve LeetCode.com algorithm coding challenges together. Users can type into a shared text editor and video chat in real time, all in the browser.`,
          details: ``,
          links: [{ type: 'Chrome Web Store', link: "https://chrome.google.com/webstore/detail/leetcode-pairing/jeonpfbokpeagbojffcijgpcpldgebfb" },
            { type: 'Github Repo', link: "https://github.com/MerkleBros/leetcode-pairing-chrome-extension" },
          ]
        },
        {
          src: "projects/cyberpunks client/Screenshot.png",
          title: 'Cyberpunks Rock Climbing',
          type: ['Projects', 'Full-Stack', 'Games'],
          tech: ['Phaser', 'P2 Physics engine', 'Node Express', 'Socket.io'],
          description: `A multiplayer, cooperative, physics-based rock climbing game. The players must scale the cliff without putting too much weight on any one limb, or they will fall off. Up to four players can join a game, with each player controlling a different limb.`,
          details: ``,
          links: [{ type: 'Live Demo', link: "./projects/cyberpunks client/index.html" },
            { type: 'Github Repo', link: "https://github.com/jven/cyberpunks" },
          ]
        },
        {
          src: "projects/evolutionscript.png",
          title: 'EvolutionScript',
          type: ['Projects', 'Machine Learning', 'Front-End'],
          tech: ['Vanilla JavaScript'],
          description: `Genetic programming in the browser. The user enters a series of integers representing the desired output of a program, and the app generates hundreds of random abstract syntax trees which are converted into JavaScript programs, evaluated and sorted based on performance. The fittest ASTs are allowed to reproduce, mutate, and evolve, producing programs who's output approximates the user's input.`,
          details: ``,
          links: [{ type: 'Live Demo', link: "https://douglasdev.github.io/General-AI" },
            { type: 'Github Repo', link: "https://github.com/DouglasDev/General-AI" },
          ]
        },
        {
          src: "projects/shadow-boxing.png",
          title: 'Mandarin Shadow Boxing',
          type: ['Projects', 'Educational', 'Front-End'],
          tech: ['jQuery', 'Howler.js'],
          description: `A tool for learning spoken Mandarin Chinese which breaks down complex sentences into their simplest components allowing for rapid language acquisition. Based off the "shadowing" technique of language professor Alexander Arguelles, in which students learn phrases in a foreign language through imitation of recordings of native speakers.`,
          details: ``,
          links: [{ type: 'Live Demo', link: "https://douglasdev.github.io/mandarin-shadow-boxing" },
            { type: 'Github Repo', link: "https://github.com/DouglasDev/mandarin-shadow-boxing" },
          ]
        },
      ],
      skills: [{
          title: 'Languages',
          titleIcon: "fa fa-language",
          animation: 'animated fadeInLeft',
          content: [
            { 'data-id': 1, src: 'es6.png', name: 'JavaScript ES6+', },
            { 'data-id': 1, src: 'html5.png', name: 'HTML5', },
            { 'data-id': 2, src: 'css3.png', name: 'CSS3', },
            { 'data-id': 2, src: 'scss.png', name: 'SCSS', },
            { 'data-id': 3, src: 'python.ico', name: 'Python', },
            { 'data-id': 3, src: 'elm.png', name: 'Elm', },
          ]
        },
        {
          title: 'Frameworks',
          titleIcon: "fa fa-crop",
          animation: 'animated fadeInUp',
          content: [
            { 'data-id': 1, src: 'react.png', name: 'React', },
            { 'data-id': 1, src: 'redux.png', name: 'Redux', },
            { 'data-id': 2, src: 'vue.png', name: 'Vue', },
            { 'data-id': 2, src: 'node.png', name: 'Node Express', },
            { 'data-id': 3, src: 'jQuery.png', name: 'jQuery', },
          ]
        },
        {
          title: 'Libraries',
          titleIcon: "fa fa-cubes",
          animation: 'animated fadeInUp',
          content: [
            { 'data-id': 1, src: 'tone-js.png', name: 'Tone JS', },
            { 'data-id': 1, src: 'webRTC.png', name: 'WebRTC', },
            { 'data-id': 2, src: 'phaser.png', name: 'Phaser', },
            { 'data-id': 2, src: 'cordova.png', name: 'Cordova', },
            { 'data-id': 3, src: 'chrome.png', name: 'Chrome', },
          ]
        },
        {
          title: 'Tools',
          titleIcon: "fa fa-terminal",
          animation: 'animated fadeInRight',
          content: [
            { 'data-id': 1, src: 'git.png', name: 'Git', },
            { 'data-id': 2, src: 'webpack.svg', name: 'Webpack', style: { 'margin-right': '-1.2rem' } },
            { 'data-id': 3, src: 'gulp.png', name: 'Gulp', },
            { 'data-id': 3, src: 'jest.png', name: 'Jest', },
          ]
        },
      ]
    }
  }
}

</script>
<style>
canvas{
/*  width: 100vw;
  height: 100vh;*/
  position: fixed !important;
}
.lavalamp-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #FFF;
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);*/
  text-align: center;
  z-index: 4;
}

.lavalamp-menu nav,
.lavalamp-menu li {
  display: inline-block;
  vertical-align: top;
  zoom: 1;
  *display: inline;
}

.lavalamp-menu li {
  margin: 0 15px;
}

.lavalamp-menu nav {
  position: relative;
}

.lavalamp-menu .lavalamp {
  position: absolute;
  bottom: 0;
  height: 5px;
  background: #6FBEF3;
  -webkit-transition: .5s;
  transition: .5s;
}

.lavalamp-menu a {
  display: block;
  line-height: 60px;
  color: #444;
  text-decoration: none;
  padding: 0;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

.lavalamp-menu a:hover {
  opacity: 0.6;
}

.fixed-header .active a {
  background: #222;
  color: #FFF;
}

main {
  position: absolute;
  width: 100vw;
  height: 95vh;
  top: 5rem;
}

/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  width: 300px;
  height: 200px;
  perspective: 1000px;
  /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Style the back side */
.flip-card-back {
  background-color: #f5f5f5;
  border: 1px solid #f1f1f1;
  transform: rotateY(180deg);
}

.skill-list {
  display: flex;
  flex-flow: wrap;
  margin-left: 3px;
}

.skill-list-item {
  background: rgba(0, 0, 255, 0.6);
  padding: 0.2rem .5rem .1rem;
  color: white;
  border-radius: 11px;
  margin: .1rem;
  font-size: small;
}

#skills {
  overflow: hidden;
  background: #f5f5f5;
}

.slide {
  display: flex;
  align-items: center;
  font-size: large;
  cursor: grab;
}

.slide-text {
  background: #f5f5f5;
  padding: 0 3rem;
}

.slide:active {
  cursor: grabbing;
}

.contact-form-container {
  position: relative;
  z-index: 10000;
  width: 100%;
  max-width: 28rem;
  margin: right;
}

.contact-form {
  width: 75%;
  max-width: 71rem;
  margin: auto;
}

.fade-move {
  transition: all ease-in-out 400ms
}

.fade-enter-active {
  transition: all 400ms ease-out
}

.fade-leave-active {
  transition: all 400ms ease-in;
  position: absolute;
  z-index: 0;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.fade-enter {
  transform: scale(0.1)
}


html {
  scroll-behavior: smooth;
}

.centered-buttons {
  max-width: 30rem;
  margin: auto;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
}

.centered-buttons button {
  margin: .15rem;
}

.pure-button {
  margin: .15rem;
}

.centered-layout {
  max-width: 1220px;
  margin: 0 auto;
}

.project-img-box {
  cursor: pointer;
  max-width: 25rem;
}

.project-img-box img, .project-img-box .flip-card-back {
  /*border-radius: 10px;*/
  box-shadow: 0px 1px 4px rgba(0, 0, 255, 0.4);
}


.portfolio-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}

.content,
.ribbon {
  padding-top: 4rem;
}

#portfolio,
#skills,
#about {
  padding-top: 5rem;
}

#about {
  background: rgb(45, 62, 80);
  background: linear-gradient(180deg, rgba(45, 62, 80, 1) 0%, rgba(14, 23, 32, 1) 80%);

}

#about a {
  color: lightskyblue;
}

.icon-tech {
  width: 100px;
  height: 100px;
  transition: all linear .3s;
}

.icon-box {
  display: flex;
  flex-flow: flow;
  flex-wrap: wrap;
  justify-content: center;
}

.icon-box>div {
  width: 10rem;
  height: 11rem;
  padding: 1rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  transition: all linear .3s;
}

.icon-box>div:hover .icon-tech {
  width: 120px;
  height: 120px;
  padding-bottom: 6px;
}

.icon-box>div:hover {
  box-shadow: 1px 5px 9px 3px rgba(0, 0, 0, 0.25);
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

/*
 * -- BASE STYLES --
 * Most of these are inherited from Base, but I want to change a few.
 */
body {
  line-height: 1.7em;
  color: #7f8c8d;
  font-size: 13px;
}

h1,
h2,
h3,
h4,
h5,
h6,
label {
  color: #34495e;
}

.top-button {
  margin: .15rem;
}

.pure-img-responsive {
  max-width: 100%;
  height: auto;
}

/*
 * -- LAYOUT STYLES --
 * These are some useful classes which I will need
 */
.l-box {
  padding: 1em;
}

.l-box-lrg {
  padding: 2em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.is-center {
  text-align: center;
}



/*
 * -- PURE FORM STYLES --
 * Style the form inputs and labels
 */
.pure-form label {
  margin: 1em 0 0;
  font-weight: bold;
  font-size: 100%;
}

.pure-form input[type],
.pure-form textarea {
  color: darkslategray;
  border: 2px solid #ddd;
  box-shadow: none;
  font-size: 100%;
  width: 100%;
  margin-bottom: 1em;
}

/*
 * -- PURE BUTTON STYLES --
 * I want my pure-button elements to look a little different
 */
.pure-button {
  background-color: #1f8dd6;
  color: white;
  padding: 0.5em 2em;
  border-radius: 5px;
}

a.pure-button-primary {
  background: white;
  color: #1f8dd6;
  border-radius: 5px;
  font-size: 120%;
}


/*
 * -- MENU STYLES --
 * I want to customize how my .pure-menu looks at the top of the page
 */

.home-menu {
  padding: 0.5em;
  text-align: center;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.10);
}

.home-menu {
  background: #2d3e50;
}

.pure-menu.pure-menu-fixed {
  /* Fixed menus normally have a border at the bottom. */
  border-bottom: none;
  /* I need a higher z-index here because of the scroll-over effect. */
  z-index: 4;
}

.home-menu .pure-menu-heading {
  color: white;
  font-weight: 400;
  font-size: 120%;
}

.home-menu .pure-menu-selected a {
  color: white;
}

.home-menu a {
  color: #6FBEF3;
}

.home-menu li a:hover,
.home-menu li a:focus {
  background: none;
  border: none;
  color: #AECFE5;
}


/*
 * -- SPLASH STYLES --
 * This is the blue top section that appears on the page.
 */

.splash-container {
  /*opacity: .5;*/
  background: rgba(31, 141, 214, .8);
  z-index: 1;
  overflow: hidden;
  /* The following styles are required for the "scroll-over" effect */
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed !important;
}

.splash {
  /* absolute center .splash within .splash-container */
  width: 80%;
  height: 50%;
  margin: auto;
  position: absolute;
  top: 100px;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  text-transform: uppercase;
}

/* This is the main heading that appears on the blue section */
.splash-head {
  font-size: 20px;
  font-weight: bold;
  color: white;
  border: 3px solid white;
  padding: 1em 1.6em;
  font-weight: 100;
  border-radius: 5px;
  line-height: 1em;
}

/* This is the subheading that appears on the blue section */
.splash-subhead {
  font-size: 1.2rem;
  color: white;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

/*
 * -- CONTENT STYLES --
 * This represents the content area (everything below the blue section)
 */
.content-wrapper {
  /* These styles are required for the "scroll-over" effect */
  position: absolute;
  top: 100vh;
  width: 100%;
  min-height: 12%;
  z-index: 2;
  background: white;

}

/* We want to give the content area some more padding */
.content {
  padding: 1em 1em 3em;
}

/* This is the class used for the main content headers (<h2>) */
.content-head {
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 2em 0 1em;
}

/* This is a modifier class used when the content-head is inside a ribbon */
.content-head-ribbon {
  color: white;
}

/* This is the class used for the content sub-headers (<h3>) */
.content-subhead {
  /*color: #1f8dd6;*/
  text-align: center;
  font-weight: 100;
  font-size: larger;
}

.content-subhead i {
  margin-right: 7px;
}

/* This is the class used for the dark-background areas. */
.ribbon {
  background: #2d3e50;
  color: #ddd;
}

/* This is the class used for the footer */
.footer {
  background: #111;
  position: fixed;
  bottom: 0;
  width: 100%;
}

/*
 * -- TABLET (AND UP) MEDIA QUERIES --
 * On tablets and other medium-sized devices, we want to customize some
 * of the mobile styles.
 */
@media (min-width: 48em) {

  /* We increase the body font size */
  body {
    font-size: 16px;
  }

  /* We can align the menu header to the left, but float the
    menu items to the right. */
  .home-menu {
    text-align: left;
  }

  .home-menu ul {
    float: right;
  }

  /* We increase the height of the splash-container */
  /*    .splash-container {
        height: 500px;
    }*/

  /* We decrease the width of the .splash, since we have more width
    to work with */
  .splash {
    width: 50%;
    height: 50%;
  }

  .splash-head {
    font-size: 250%;
  }


  /* We remove the border-separator assigned to .l-box-lrg */
  .l-box-lrg {
    border: none;
  }

}

/*
 * -- DESKTOP (AND UP) MEDIA QUERIES --
 * On desktops and other large devices, we want to over-ride some
 * of the mobile and tablet styles.
 */
@media (min-width: 78em) {

  /* We increase the header font size even more */
  .splash-head {
    font-size: 300%;
  }
}
</style>