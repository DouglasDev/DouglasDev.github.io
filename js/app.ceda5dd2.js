(function(e){function t(t){for(var a,r,o=t[0],l=t[1],c=t[2],p=0,u=[];p<o.length;p++)r=o[p],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&u.push(n[r][0]),n[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);d&&d(t);while(u.length)u.shift()();return s.push.apply(s,c||[]),i()}function i(){for(var e,t=0;t<s.length;t++){for(var i=s[t],a=!0,o=1;o<i.length;o++){var l=i[o];0!==n[l]&&(a=!1)}a&&(s.splice(t--,1),e=r(r.s=i[0]))}return e}var a={},n={app:0},s=[];function r(t){if(a[t])return a[t].exports;var i=a[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=a,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(i,a,function(t){return e[t]}.bind(null,a));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var d=l;s.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"53d0":function(e,t,i){"use strict";i("b6a8")},"56d7":function(e,t,i){"use strict";i.r(t);i("a7c4"),i("30dc"),i("7575"),i("4923");var a=i("8686"),n=(i("4cae"),i("5dec"),i("05f6"),i("c89f"),i("6796"),i("6072"),function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[e._m(0),e._m(1),t("main",{staticClass:"content-wrapper"},[t("div",{staticClass:"animatedParent animateOnce",staticStyle:{background:"#FFFFFF"},attrs:{"data-sequence":"500",id:"portfolio"}},[t("h2",{staticClass:"content-head is-center"},[e._v("Portfolio")]),t("div",{staticClass:"centered-buttons animated growIn",attrs:{"data-id":"1"}},e._l(e.filterPortfolio,(function(i){return t("button",{staticClass:"pure-button",style:e.selectedWorks==i?{background:"#2d3e50",color:"white"}:{},on:{click:function(t){e.selectedWorks=i}}},[e._v(" "+e._s(i)+" ")])})),0),t("transition-group",{staticClass:"centered-layout portfolio-box animated growIn",attrs:{name:"fade",tag:"div","data-id":"2"}},e._l(e.works,(function(i,a){return i.type.includes(e.selectedWorks)||"All"==e.selectedWorks?t("div",{key:i.title,staticClass:"content l-box-lrg pure-g project-img-box"},[t("div",{staticClass:"flip-card",on:{click:function(t){return e.showModal(i)}}},[t("div",{staticClass:"flip-card-inner"},[t("div",{staticClass:"flip-card-front"},[t("img",{staticClass:"screenshot pure-img-responsive",attrs:{src:i.src,alt:i.title}})]),t("div",{staticClass:"flip-card-back content-head",staticStyle:{margin:"0"}},[t("p"),t("h2",[e._v(e._s(i.title))]),t("div",{staticClass:"skill-list"},e._l(i.tech,(function(i){return t("div",{staticClass:"skill-list-item"},[e._v(e._s(i))])})),0),t("p")])])])]):e._e()})),0)],1),t("div",{staticClass:"content",attrs:{id:"skills"}},[t("h2",{staticClass:"content-head is-center"},[e._v("Technologies and Skills")]),t("div",{staticClass:"pure-g"},e._l(e.skills,(function(i){return t("div",{staticClass:"l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4 animatedParent",attrs:{"data-sequence":"200"}},[t("h3",{staticClass:"content-subhead"},[t("i",{class:i.titleIcon}),e._v(e._s(i.title)+" ")]),t("div",{staticClass:"icon-box"},e._l(i.content,(function(a){return t("div",{class:i.animation,attrs:{"data-id":a["data-id"]}},[t("img",{staticClass:"icon-tech",style:a.style?a.style:null,attrs:{src:"icons/"+a.src,alt:a.name}}),t("div",{staticClass:"icon-tech-name"},[e._v(e._s(a.name))])])})),0)])})),0)]),e._m(2)]),t("sweet-modal",{ref:"modal"},[t("h3",{staticClass:"project-title"},[e._v(e._s(e.selectedWork.title))]),t("carousel",{attrs:{"per-page":1,navigationEnabled:!0,paginationSize:12}},[t("slide",{key:"a",ref:"a",staticClass:"slide slide-text"},[e._v(" "+e._s(e.selectedWork.description)+" ")]),t("slide",{key:"b",ref:"b",staticClass:"slide"},[t("img",{staticClass:"pure-img-responsive",attrs:{src:e.selectedWork.src,alt:e.selectedWork.title}})])],1),t("div",e._l(e.selectedWork.links,(function(i){return t("a",{staticClass:"pure-button",attrs:{target:"_blank",href:i.link}},[e._v(e._s(i.type))])})),0)],1)],1)}),s=[function(){var e=this,t=e._self._c;return t("header",{staticClass:"header lavalamp-menu",attrs:{id:"main-header"}},[t("nav",{staticClass:"home-menu pure-menu pure-menu-horizontal pure-menu-fixed"},[t("ul",{staticClass:"pure-menu-list"},[t("li",{staticClass:"pure-menu-item active"},[t("a",{staticClass:"pure-menu-link",attrs:{href:"#app"}},[e._v("Home")])]),t("li",{staticClass:"pure-menu-item"},[t("a",{staticClass:"pure-menu-link",attrs:{href:"#portfolio"}},[e._v("Portfolio")])]),t("li",{staticClass:"pure-menu-item"},[t("a",{staticClass:"pure-menu-link",attrs:{href:"#skills"}},[e._v("Skills")])]),t("li",{staticClass:"pure-menu-item"},[t("a",{staticClass:"pure-menu-link",attrs:{href:"#about"}},[e._v("About")])])]),t("div",{staticClass:"lavalamp"})])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"splash-container"},[t("div",{staticClass:"splash"},[t("h1",{staticClass:"splash-head"},[e._v("Douglas Lerner")]),t("p",{staticClass:"splash-subhead"},[e._v(" NYC Based Web Developer ")]),t("p",[t("a",{staticClass:"pure-button pure-button-primary top-button",attrs:{target:"_blank",href:"https://docs.google.com/document/d/1c1_kVXluuXLo7WPebGXqj607Ez_LvSNCj8MCMf0HUxU/edit?usp=sharing"}},[e._v("Resume")]),t("a",{staticClass:"pure-button pure-button-primary top-button",attrs:{target:"_blank",href:"mailto:douglasdev8888@gmail.com"}},[e._v("Email")]),t("a",{staticClass:"pure-button pure-button-primary top-button",attrs:{target:"_blank",href:"https://github.com/DouglasDev"}},[e._v("Github")]),t("a",{staticClass:"pure-button pure-button-primary top-button",attrs:{target:"_blank",href:"https://www.linkedin.com/in/douglas-lerner-66590467/"}},[e._v("Linkedin")])])])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"ribbon",attrs:{id:"about"}},[t("div",{staticClass:"contact-form"},[t("div",{staticClass:"pure-g"},[t("div",{staticClass:"l-box-lrg pure-u-1 pure-u-md-3-5"},[t("h2",{staticClass:"content-head-ribbon is-left"},[e._v("About Me")]),t("p",[e._v(" I create web apps that connect people, educate, and entertain. I've worked on variety of projects for multiple start-ups, small businesses, a publishing house, and a record company. ")]),t("p",[e._v(" Last year, I completed a batch at the "),t("a",{attrs:{href:"http://www.recurse.com"}},[e._v("Recurse Center")]),e._v(", which is a 3 month full-time self-directed programming retreat. While there, I immersed myself in projects that involved browser extension development, game development, machine learning, natural language processing, genetic algorithms, and computer generated music. ")]),t("p",[e._v(" In addition to programming, I have experience working as an ESL teacher and Chinese translator, as well as a background in classical music and biology, and I often incorporate this expertise into my projects. ")])]),t("div",{staticClass:"l-box-lrg pure-u-1 pure-u-md-2-5"},[t("h2",{staticClass:"content-head-ribbon is-left"},[e._v("Contact Me")]),t("p",[e._v(" I'm currently looking for full-time work. Don't hestate to get in touch! ")]),t("form",{staticClass:"pure-form pure-form-stacked contact-form-container",attrs:{action:"https://formspree.io/xeqjaajb",method:"POST"}},[t("fieldset",[t("input",{attrs:{id:"name",type:"text",placeholder:"Name",name:"Name",required:""}}),t("input",{attrs:{id:"email",type:"email",placeholder:"Email",name:"Email",required:""}}),t("textarea",{attrs:{id:"message",type:"text",placeholder:"Message",name:"Message",required:""}}),t("button",{staticClass:"pure-button",attrs:{type:"submit"}},[e._v("Send")])])])])])]),t("div",{staticClass:"stars"},[t("div",{staticClass:"clouds"},[t("div",{staticClass:"animatedParent",staticStyle:{opacity:".8"}},[t("img",{staticClass:"animated fadeInUp",staticStyle:{width:"100%",position:"relative","z-index":"4","margin-bottom":"0rem"},attrs:{src:"nyc.png",alt:"nyc"}})])])])])}],r=i("b8a6"),o=i("f53f"),l=(i("6367"),i("72d1")),c=i.n(l),d={name:"app",components:{},mounted:function(){this.setUpLavalamp(),this.setUpThree()},methods:{setUpLavalamp:function(){function e(e){t.style.width=e.elm.offsetWidth+"px",t.style.left=e.elm.getBoundingClientRect().x+"px"}var t=document.querySelector(".lavalamp"),i=document.querySelector("#main-header");new c.a(i,{callback:e});e({elm:i.querySelector("li.active")})},setUpThree:function(){var e=function(){function e(){Object(r["a"])(this,e),this.randFrom=["first","last","center"],this.easing=["linear","easeInOutQuad","easeInOutCubic","easeInOutQuart","easeInOutQuint","easeInOutSine","easeInOutExpo","easeInOutCirc","easeInOutBack","cubicBezier(.5, .05, .1, .3)","spring(1, 80, 10, 0)","steps(10)"]}return Object(o["a"])(e,[{key:"init",value:function(){var e=this;this.camera=new THREE.PerspectiveCamera(25,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.x=-35,this.camera.position.y=30,this.camera.position.z=-35;var t=new THREE.Vector3(5,0,5);this.camera.lookAt(t),this.scene=new THREE.Scene,this.scene.background=new THREE.Color(2067926),this.resizeListener=function(t){return e.onResize(t)},window.addEventListener("resize",this.resizeListener,!1),this.createBoxes(),this.renderer=new THREE.WebGLRenderer({antialias:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this.beginAnimationLoop(),this.animate()}},{key:"createBoxes",value:function(){this.geometry=new THREE.BoxGeometry(1,10,1);var e="\n            varying vec2 vUv;\n            void main() {\n              vUv = uv;\n              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n            }\n          ",t="\n            varying vec2 vUv;\n            uniform float thickness;\n\n            float edgeFactor(vec2 p){\n              vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p) / thickness;\n              return min(grid.x, grid.y);\n            }\n\n            void main() {\n              float a = edgeFactor(vUv);\n              vec3 c = mix(vec3(1), vec3(0), a);\n              gl_FragColor = vec4(c, 1.0);\n            }\n          ",i=new THREE.ShaderMaterial({uniforms:{thickness:{value:1}},vertexShader:e,fragmentShader:t});i.extensions.derivatives=!0;new THREE.Mesh(this.geometry,i);var a=1.25;this.nRows=25,this.nCols=25,this.staggerArray=[];for(var n=0,s=0,r=0;r<this.nCols;r++){n=(n+1)%4,3==n&&(s+=2*a);for(var o=0,l=0,c=0;c<this.nRows;c++){o=(o+1)%4,3==o&&(l+=2*a);var d=new THREE.Mesh(new THREE.BoxGeometry(1*Math.random()*2,10+10*Math.random()-5,1*Math.random()*2),i);d.position.x=c*a-(.5*this.nRows+.5*this.geometry.parameters.width)+l,d.position.y=-.5*this.geometry.parameters.height,d.position.z=r*a-(.5*this.nCols+.5*this.geometry.parameters.width)+s,this.staggerArray.push(d.position),this.scene.add(d)}}}},{key:"beginAnimationLoop",value:function(){var e=this,t=this.randFrom[Math.floor(Math.random()*this.randFrom.length)],i=this.easing[Math.floor(Math.random()*this.easing.length)];anime({targets:this.staggerArray,y:[{value:.1*this.geometry.parameters.height,duration:500},{value:-.1*this.geometry.parameters.height,duration:2e3}],delay:anime.stagger(400,{grid:[this.nRows,this.nCols],from:t}),easing:i,complete:function(t){return e.beginAnimationLoop()}})}},{key:"animate",value:function(){var e=this;requestAnimationFrame((function(){return e.animate()})),this.update(),this.render()}},{key:"update",value:function(){}},{key:"render",value:function(){this.renderer.render(this.scene,this.camera)}},{key:"onResize",value:function(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}}]),e}(),t=new e;t.init()},showModal:function(e){this.selectedWork=e,this.$refs.modal.open()}},data:function(){return{filterPortfolio:["All","Front-End","Full-Stack","Educational","Browser Extensions","Games","Machine Learning"],selectedWorks:"All",selectedWork:{},works:[{src:"projects/eComments.png",title:"e-Comments",type:["Work","Educational","Front-End","Browser Extensions"],tech:["VueJS","Vuex","Web Speech API","Google Drive API"],description:"With the e-Comments Chrome Extension, teachers and workplace supervisors can insert hundreds of customizable Common Core-aligned comments, which identify, explain, and show  how to revise writing issues, with just one click from the e-Comments menu. Comments don’t simply flag errors or suggest revisions; these comprehensive comments help students learn. Teachers can add their own comments to the menu, including audio, video, and speech-to-text. Includes separate comment banks for grades 3-6, 6-9, 9-12, and College/Workplace.",details:"",links:[{type:"Chrome Web Store",link:"https://chrome.google.com/webstore/detail/e-comments/dccccbckfnndplihkaeiekggmeicbhgj/"}]},{src:"projects/kittieFight.png",title:"KittieFIGHT",type:["Work","Games","Front-End"],tech:["React","Redux","Phaser 3","Spine Animations","Web3.js"],description:"In kittieFIGHT, tokens are awarded to winners of each fight session that utilizes customized fighting kittie characters derived from the Cryptokitties platform. kittieFIGHT is gamified with a unique economic token model utilizing limited supply with suppressed emissions and incentivized crowd dynamics to drive up each value of token necessary to reward owners of Cryptokitties non-fungible tokens.\n       \n          The kittieFIGHT Dapp also solves the problem of oversupply of Cryptokitties via a kittie-sink called kittieHELL. The sink effect from fights also serves to create demand for new kitties on the Cryptokitties platform. Winners of fights on the kittieFIGHT platform can trade winning tokens to buy more Cryptokitties collectibles.",details:"",links:[{type:"Official Website",link:"https://www.kittiefight.io/"}]},{src:"projects/harpsichord-hero.png",title:"Harpsichord Hero",type:["Projects","Music","Front-End"],tech:["HTML canvas","Teoria.js","Soundfont-Player","MIDI.js"],description:"A digital musical instrument that allows people with no musical background to improvise harpischord music in the baroque style. The instrument has a built-in knowledge of harmony and musical style, which allows users to effortlessly improvise complex melodies and chord progressions.",details:"",links:[{type:"Live Demo",link:"https://douglasdev.github.io/Harpsichord-Hero"},{type:"Github",link:"https://github.com/DouglasDev/Harpsichord-Hero"}]},{src:"projects/charts DNP/Screenshot Charts.png",title:"Sales Charts",type:["Work","Front-End"],tech:["JavaScript","Charts.JS"],description:"Interactive dashboard for sales reps, that reads data from Laravel backend and generates beautiful responsive animated sales charts.",details:"",links:[{type:"Live Demo",link:"./projects/charts DNP/index.html"}]},{src:"projects/Cocktail Party Neuro Evolution/screenshot 1.png",title:"NeuroEvolution Cocktail Party",type:["Projects","Machine Learning","Front-End"],tech:["Vanilla JS","Neatapic.js"],description:"A simulation of human social interactions, which evolves social agents that can adapt to one another's behaviors. Uses a JavaScript implementation of the NEAT (Neuro Evolution through Augmented Topology) genetic algorithm, which evolves neural networks through the process of Darwinian evolution. ",details:"",links:[{type:"Live Demo",link:"./projects/Cocktail Party Neuro Evolution/index.html"},{type:"Github",link:"https://github.com/DouglasDev/Neuro-Evolution-Cocktail-Party"}]},{src:"projects/leetcode pairing screenshot.png",title:"LeetCode Pairing",type:["Projects","Full-Stack","Browser Extensions"],tech:["React","Node Express","Oauth2","Webpack","WebRTC","Socket.io","Codemirror API","Chrome API"],description:"A Chrome extension which enables coders to pair program over the internet and solve LeetCode.com algorithm coding challenges together. Users can type into a shared text editor and video chat in real time, all in the browser.",details:"",links:[{type:"Chrome Web Store",link:"https://chrome.google.com/webstore/detail/leetcode-pairing/jeonpfbokpeagbojffcijgpcpldgebfb"},{type:"Github Repo",link:"https://github.com/MerkleBros/leetcode-pairing-chrome-extension"}]},{src:"projects/cyberpunks client/Screenshot.png",title:"Cyberpunks Rock Climbing",type:["Projects","Full-Stack","Games"],tech:["Phaser","P2 Physics engine","Node Express","Socket.io"],description:"A multiplayer, cooperative, physics-based rock climbing game. The players must scale the cliff without putting too much weight on any one limb, or they will fall off. Up to four players can join a game, with each player controlling a different limb.",details:"",links:[{type:"Live Demo",link:"./projects/cyberpunks client/index.html"},{type:"Github Repo",link:"https://github.com/jven/cyberpunks"}]},{src:"projects/evolutionscript.png",title:"EvolutionScript",type:["Projects","Machine Learning","Front-End"],tech:["Vanilla JavaScript"],description:"Genetic programming in the browser. The user enters a series of integers representing the desired output of a program, and the app generates hundreds of random abstract syntax trees which are converted into JavaScript programs, evaluated and sorted based on performance. The fittest ASTs are allowed to reproduce, mutate, and evolve, producing programs who's output approximates the user's input.",details:"",links:[{type:"Live Demo",link:"https://douglasdev.github.io/General-AI"},{type:"Github Repo",link:"https://github.com/DouglasDev/General-AI"}]},{src:"projects/shadow-boxing.png",title:"Mandarin Shadow Boxing",type:["Projects","Educational","Front-End"],tech:["jQuery","Howler.js"],description:'A tool for learning spoken Mandarin Chinese which breaks down complex sentences into their simplest components allowing for rapid language acquisition. Based off the "shadowing" technique of language professor Alexander Arguelles, in which students learn phrases in a foreign language through imitation of recordings of native speakers.',details:"",links:[{type:"Live Demo",link:"https://douglasdev.github.io/mandarin-shadow-boxing"},{type:"Github Repo",link:"https://github.com/DouglasDev/mandarin-shadow-boxing"}]}],skills:[{title:"Languages",titleIcon:"fa fa-language",animation:"animated fadeInLeft",content:[{"data-id":1,src:"es6.png",name:"JavaScript ES6+"},{"data-id":1,src:"html5.png",name:"HTML5"},{"data-id":2,src:"css3.png",name:"CSS3"},{"data-id":2,src:"scss.png",name:"SCSS"},{"data-id":3,src:"python.ico",name:"Python"},{"data-id":3,src:"elm.png",name:"Elm"}]},{title:"Frameworks",titleIcon:"fa fa-crop",animation:"animated fadeInUp",content:[{"data-id":1,src:"react.png",name:"React"},{"data-id":1,src:"redux.png",name:"Redux"},{"data-id":2,src:"vue.png",name:"Vue"},{"data-id":2,src:"node.png",name:"Node Express"},{"data-id":3,src:"jQuery.png",name:"jQuery"}]},{title:"Libraries",titleIcon:"fa fa-cubes",animation:"animated fadeInUp",content:[{"data-id":1,src:"tone-js.png",name:"Tone JS"},{"data-id":1,src:"webRTC.png",name:"WebRTC"},{"data-id":2,src:"phaser.png",name:"Phaser"},{"data-id":2,src:"cordova.png",name:"Cordova"},{"data-id":3,src:"chrome.png",name:"Chrome"}]},{title:"Tools",titleIcon:"fa fa-terminal",animation:"animated fadeInRight",content:[{"data-id":1,src:"git.png",name:"Git"},{"data-id":2,src:"webpack.svg",name:"Webpack",style:{"margin-right":"-1.2rem"}},{"data-id":3,src:"gulp.png",name:"Gulp"},{"data-id":3,src:"jest.png",name:"Jest"}]}]}}},p=d,u=(i("53d0"),i("bce8")),h=Object(u["a"])(p,n,s,!1,null,null,null),m=h.exports,g=i("9636"),f=i.n(g),v=i("c905");a["a"].use(v["a"]),a["a"].use(f.a),a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(m)}}).$mount("#app")},b6a8:function(e,t,i){}});
//# sourceMappingURL=app.ceda5dd2.js.map