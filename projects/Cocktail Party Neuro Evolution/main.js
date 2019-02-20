const userControl=false, trackedAgent=0
const numberOfAgents=8,gridDimensions=8
const inputType=7,generationLength=50

let started=false;

let wall="-".repeat(gridDimensions*2+2)

let grid

function makeGrid(){
	grid=[]
	for (let y=0;y<gridDimensions;y++){
		let row= new Array(gridDimensions).fill(-1);
		grid.push(row)
	}
}
makeGrid();

function forceValIntoRange(val){
	return parseFloat(parseFloat(val).toPrecision(3));
}

function noNeighbors(xPos,yPos){
	let surroundingDirections=[[ 1, -1],[ 1, 0],[ 1, 1],
				   [ 0, -1],        [ 0, 1],
				   [-1, -1],[-1, 0],[-1, 1]];
	let x,y
	let neighbors=false
	surroundingDirections.forEach((direction,index)=>{
		y=(yPos-direction[0])%(gridDimensions);
		x=(xPos+direction[1])%(gridDimensions);
		if (y==-1) y=gridDimensions-1;
		if (x==-1) x=gridDimensions-1;

		if (grid[y][x]>-1) neighbors=true
	})
	return !neighbors
}

class Agent {
	constructor(id) {
		this.id=id;
		this.output=[
			()=>this.move("up"),
			()=>this.move("down"),
			()=>this.move("left"),
			()=>this.move("right"),
			()=>this.speak(),
		]
		this.resetAgent();
		//fix:
		//do after all agents are created
		this.getSurroundings();
		this.getBigSurroundings();
    this.lastDir = [0,0]
	}

	resetAgent(){
		let x=Math.round(Math.random()*(gridDimensions-1));
		let y=Math.round(Math.random()*(gridDimensions-1));

		while (!(grid[y][x]==-1 && noNeighbors(x,y))){
	 		x=Math.round(Math.random()*(gridDimensions-1));
			y=Math.round(Math.random()*(gridDimensions-1));
		}
		grid[y][x]=this.id;
		this.x=x;
		this.y=y;
		//this.trustArray=Array(numberOfAgents).fill(0.1);
		this.likeArray=Array(numberOfAgents).fill(0);
		this.interestArray=Array(numberOfAgents).fill(.8/numberOfAgents);
		this.popularity=50;
		this.lastMove="";
		this.loneliness=0;
		this.memory=Array(5).fill(0);
	}
	updateMemory(score){
		this.memory.shift()
		this.memory.push(score)
		//console.log(this.id,this.memory)
	}

	generateInput(type){

		//idea 3
		//can see all surrounding agents,
		//knows like and trust array
		//if (type==3) INPUT=8*numberOfAgents+2*numberOfAgents
		if (type==3){
			let input=[];
			for (let a=0; a<numberOfAgents;a++){
				if (a!=this.id){
					//8 directions
					this.surroundings.forEach(space=>{
						//if (agentList[a]){
							if (space==agentList[a].id) input.push(1);
							else input.push(0);
						//}
					});

					//like and trust array
					input.push(this.likeArray[a]);
					input.push(this.trustArray[a]);
				}
			}
			return input;
		}
		//8 directions only
		if (type==4){
			let input=[];
			//8 directions
			this.surroundings.forEach(space=>{
					if (space!=-1) input.push(1);
					else input.push(0);
			});
			return input;
		}
		if (type==5){
			let input=[];
			//8 directions+5 memory neurons
			this.surroundings.forEach(space=>{
					if (space!=-1) input.push(1);
					else input.push(0);
			});
			return input.concat(this.memory);
		}
    if(type==6){
      return this.bigSurroundings.concat(this.memory)
    }

    if(type==7){
      return [...this.bigSurroundings, ...this.memory, ...this.likeArray]
    }

    if(type==8){
      const others = this.likeArray.map((opinion, agentNum) => {
        return [
          opinion,
          agentList[agentNum].x - this.x,
          agentList[agentNum].y - this.y
        ]
      })

      return Array.prototype.concat.apply([], others)
    }
	}

	computePopularity(){
		let popularity=0;
		agentList.forEach(agent=>{
			if (agent.id!=this.id){
				popularity+=agent.likeArray[this.id];
			}
		})
			//console.log('popularity',popularity)
			//console.log('Math.exp(-popularity)',Math.exp(-popularity))
			this.popularity=100/(1+Math.exp(-popularity));
	}


	getSurroundings(){
		let surroundingDirections=[[1,-1],[1,0],[1,1],
								   [0,-1],		[0,1],
								   [-1,-1],[-1,0],[-1,1]];
		this.surroundings=[];
		let x,y
		surroundingDirections.forEach((direction,index)=>{
			y=(this.y-direction[0])%(gridDimensions);
			x=(this.x+direction[1])%(gridDimensions);
			if (y==-1) y=gridDimensions-1;
			if (x==-1) x=gridDimensions-1;

			this.surroundings.push(grid[y][x])
		})
	}

	getBigSurroundings(){
    let surroundingDirections=[
      [ 2, -2], [ 2, -1], [ 2, 0], [ 2, 1], [ 2, 2],
      [ 1, -2], [ 1, -1], [ 1, 0], [ 1, 1], [ 1, 2],
      [ 0, -2], [ 0, -1], /*0, 0*/ [ 0, 1], [ 0, 2],
      [-1, -2], [-1, -1], [-1, 0], [-1, 1], [-1, 2],
      [-2, -2], [-2, -1], [-2, 0], [-2, 1], [-2, 2]
    ];

		let x,y
    this.bigSurroundings = [].concat.apply([],
      surroundingDirections.map((direction,index)=>{
        y=(this.y-direction[0])%(gridDimensions);
        x=(this.x+direction[1])%(gridDimensions);

        if (y==-1) y=gridDimensions-1;
        else if (y==-2) y=gridDimensions-2;

        if (x==-1) x=gridDimensions-1;
        else if (x==-2) x=gridDimensions-2;

        const tile = grid[y][x]
        let facing

        if (tile == -1) facing = [0, 0]
        else facing = agentList[tile].lastDir

        return [tile, ...facing]
      })
    )
	}

	speak(){
		//console.log('converse')
    const {
      opinion,
      subject
    } = this.thoughts || {}

    if (opinion == null || subject == null) {
      return
    }

		this.bigSurroundings.forEach(personInSpace=>{
			if (personInSpace!=-1){
        agentList[personInSpace].hear(opinion, this.id, subject)
			}
		})
    this.lastDir = [0,0]
    if (opinion > 0) {
      this.lastMove=`Agent ${this.id} said that Agent ${subject} is awesome: ${opinion}`
    } else {
      this.lastMove=`Agent ${this.id} said that Agent ${subject} is a terrible person: ${opinion}`
    }
	}

	move(direction){
		let currentX=this.x;
		let currentY=this.y;

		if (direction=="up")this.y=(this.y-1)%(gridDimensions);
		if (direction=="down")this.y=(this.y+1)%(gridDimensions);
		if (direction=="left")this.x=(this.x-1)%(gridDimensions);
		if (direction=="right")this.x=(this.x+1)%(gridDimensions);

		if (this.y==-1)this.y=gridDimensions-1
		if (this.x==-1)this.x=gridDimensions-1

		if (grid[this.y][this.x]!=-1){
			this.x=currentX;
			this.y=currentY;
		}
		else{
			grid[currentY][currentX]=-1;
			grid[this.y][this.x]=this.id;
		}

		if (direction=="up")this.lastDir = [0, -1]
		if (direction=="down")this.lastDir = [0, 1]
		if (direction=="left")this.lastDir = [-1, 0]
		if (direction=="right")this.lastDir = [1, 0]
		// 	this.lastMove="Agent "+this.id+" worked up the nerve to walk 1 space "+directionArray[direction];
		this.lastMove= "Agent "+this.id+" moved "+ direction
	}
	getLoneliness(){
		let changeInloneliness=1
		this.surroundings.forEach(space=>{
			//console.log(this.id,space)
      if (space!=-1) {
        changeInloneliness -= 0.5 + this.likeArray[space];
      }

      //if (this.lastDir[0] === 0 && this.lastDir[1] === 0)
      //if (space!=-1) changeInloneliness-=1;
		})
		this.loneliness+=changeInloneliness
		this.updateMemory(-changeInloneliness);
		//console.log('agent',this.id,'loneliness',this.loneliness)
	}

  hear(opinion, speaker, subject) {
    if (speaker === this.id) {
      return;
    }

    if (subject === this.id) {
      const likeness = this.likeArray[speaker]

      const diff = Math.abs(likeness) / 10 * opinion

      if (Math.abs(this.likeArray[speaker]) > 1) {
        debugger
      }

      this.likeArray[speaker] += diff
      this.likeArray[speaker] = Math.max(Math.min(this.likeArray[speaker], 1), -1)
    } else {
      // adjust likeness for subject
      const likeness = this.likeArray[subject]

      // TODO: re-evaluate this convergence
      const diff = (1 - Math.abs(likeness)) / 10 * opinion

      this.likeArray[subject] += diff
      this.likeArray[subject] = Math.max(Math.min(this.likeArray[subject], 1), -1)

      if (Math.abs(this.likeArray[subject]) > 1) {
        debugger
      }

      // adjust likeness for speaker

      const speakerLikeness = this.likeArray[speaker]

      const agree = [-1, 1][+(
        (
          opinion > 0 && this.likeArray[subject] > 0
        ) || (
          opinion < 0 && this.likeArray[subject] < 0
        )
      )]

      const speakerDiff = (1 - Math.abs(speakerLikeness)) / 10 * agree

      this.likeArray[speaker] += speakerDiff
      this.likeArray[speaker] = Math.max(Math.min(this.likeArray[speaker], 1), -1)

      if (Math.abs(this.likeArray[speaker]) > 1) {
        debugger
      }
    }

    if (Math.abs(this.likeArray[subject]) > 1) {
      debugger
    }
  }

	update(type, thinkAndThenAct){
		thinkAndThenAct();
		this.getSurroundings();
	  if (type==6 || type==7)this.getBigSurroundings();
		this.getLoneliness()
		this.computePopularity();
	}
}



if (userControl==true){
	document.addEventListener('keydown',function(e){
		event.preventDefault()

		if (e.key=='ArrowLeft')agentList[0].move("left");
		if (e.key=='ArrowRight')agentList[0].move("right");
		if (e.key=='ArrowUp')agentList[0].move("up");
		if (e.key=='ArrowDown')agentList[0].move("down");
		if (e.key=='z')agentList[0].makeConversation();
		//if (e.key=='x')agentList[0].complementOther(Math.floor(Math.random()*(numberOfAgents-1)));
		//if (e.key=='c')agentList[0].insultOther(Math.floor(Math.random()*(numberOfAgents-1)));

		stepSim();
	});
}


let agentList=[];

for (let i=0; i<numberOfAgents; i++){
	agent= new Agent(i);
	agentList.push(agent);
}


let iteration=0,generation=0;

function stepSim(){
	iteration+=1;
	agentList.forEach((agent,agentIndex)=>{
		agent.update(inputType,
			function(){
				// if (agent.id==0 && userControl==true){
				// 	//control agent 0
				// 	//return;
				// }
				//console.log(Math.random(),agentIndex)
				//if(Math.random()<.5){
					let input = agent.generateInput(inputType);
					let output = networks.population[agentIndex].activate(input);
					let move = outputToMove(output.slice(0, 5));

          let opinion = output[5] * 2 - 1
          const subjectChoices = output.slice(6, 6 + numberOfAgents)
          let subjectValue = Math.max(...subjectChoices)
          let subject = subjectChoices.indexOf(subjectValue)

          agent.thoughts = {opinion, subject}

					if (move==-1) move = 4; //if no output due to all 0 input, make conversation
					let dodo = agent.output[move];
					//let rand= Math.random()
					//if(rand<.5)
					dodo();
				//}
			}
		);
	})

	if (skipToGeneration){
		if (skipToGeneration==generation) {
			play(400);
		}
	}
	else{
		renderView(iteration);
	}
	document.getElementById('generations').innerText=" generation: "+generation

	if (iteration==generationLength) {
		generation++
		iteration=0
		customFitnessFunction();
		logAverage();
		makeGrid();
		resetAgents();
		if (!skipToGeneration) {
			let svg=document.querySelector('.draw')
			svg.parentNode.replaceChild(svg.cloneNode(false), svg);
      drawGraph(networks.population[0].graph(400,400), '.draw');
		}
	}
}

let lastThroughputCheck = performance.now()

function logAverage(){
  let avg=0, eavg=0
  agentList.forEach((agent,index)=>{
    avg+=agent.loneliness
    if (index < networks.elitism) {
      eavg+=agent.loneliness
    }
  })

  let now = performance.now()

  const ml = Math.min(...agentList.map(agent => agent.loneliness))
  console.table({
    average: Math.round(avg/numberOfAgents),
    min: ml,
    eavg: Math.round(eavg/networks.elitism),
    throughput: now - lastThroughputCheck
  })

  lastThroughputCheck = now
}

function resetAgents(){
	agentList.forEach(agent=>{agent.resetAgent();})
}

let networks
function start(action){
	started=true;
	//initialize
	renderView(iteration);
	iteration += 1;
	if (action=='new') networks = buildNeuralNets(inputType)
	if (action=='load') {
    	networks = buildNeuralNets(inputType,true)
		generation=localStorage.getItem('generation');
	}
		console.log('networks:', networks)
  drawGraph(networks.population[0].graph(500, 500), '.draw');
}

function save(){
	if (!started) return
 	localStorage.setItem('networks',JSON.stringify(networks.export()))
	localStorage.setItem('generation', generation);
}

let loop
function play(speed,skip){
	if (!started) return
	if (!skip) skipToGeneration = undefined;
	if (loop) clearInterval(loop);
	loop = setInterval(stepSim, speed);
}

function pause(){
	clearInterval(loop);
}

let skipToGeneration
function skip(numberOfGenerations){
	if (!started) return
	let svg=document.querySelector('.draw')
	svg.parentNode.replaceChild(svg.cloneNode(false), svg);
	skipToGeneration = generation+numberOfGenerations
	play(0,true);
}
