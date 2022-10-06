class Node{
	constructor(category,type,val,children){
		this.category = category
		this.type=type
		this.val=val
		if (children) this.children=children
		else this.children=[]
	}
	addChild(node){
		this.children.push(node)
	}
	addChildInRandomPosition(node){
		if (this.children.length === 0) {
			this.children = [node]
		} else {
			let randIndex = nSidedDie(this.children.length + 1)
			this.children= this.children
				.slice(0,randIndex)
				.concat([node])
				.concat(this.children.slice(randIndex))
		}
	}
	output(){
		console.log(this.type,this.val,this.children)
	}
}

let opsLeft
let currentGeneration=[]
let mainLoop,numberOfGenerations=0
let MODEL = [1,2,3]


function startEvolving(){
	opsLeft=0,currentGeneration=[],mainLoop,numberOfGenerations=0,highestFitness=0;
	pause()
	console.clear()
	let arr=JSON.parse(document.querySelector('input').value)
	if (!Array.isArray(arr)) return
	MODEL=arr

	for (let i=5;i>=0;i--){
		let nextProgram = document.getElementById('program'+i)
		nextProgram.innerText=""
	}


	for(let i=0;i<500;i++){
		let treeRoot = generateSeedTree(MAX_INITIAL_DEPTH,MAX_NUMBER_OF_INITIAL_ACTIONS)
		let program = generateProgram(treeRoot)
		let output = evaluateProgram(program)
		if (output) {
			let fitVal = fitness(MODEL,output,program.length)
			currentGeneration.push(
				{"tree":treeRoot,
				"fitness":fitVal
				}
			)
		}
	}

	continueLoop()
}
function continueLoop(){
	pause()
	mainLoop =  setInterval(function(){
		genOutput.innerText=numberOfGenerations
		currentGeneration= evolveNextGeneration(currentGeneration)
		numberOfGenerations+=1
	},0)
}

function pause(){
	clearInterval(mainLoop)
}

function pushProgramToDiv(program,output,fitness){
	for (let i=5;i>0;i--){
		let nextProgram = document.getElementById('program'+i)
		let prevProgram = document.getElementById('program'+(i-1))
		nextProgram.innerText=prevProgram.innerText
	}
	let firstProgram = document.getElementById('program0')
	firstProgram.innerText=program+'\n\n output: ['+ output +']\n fitness: '+ fitness
}



//const MODEL = [1,1,2,3,5,8]
const MAX_INITIAL_DEPTH=5
const MAX_NUMBER_OF_INITIAL_ACTIONS = 6
//GREATER value = higher mutation rate, minimum val=2
const MUTATE_LOWER_LEVEL_EXPRESSION_RATE = 4 
//LOWER value = higher mutation rate, minimum val=2
const TOP_LEVEL_MUTATION_RATE = 20
const MAX_DESCENT_DEPTH=3
const MAX_ADDITION_DEPTH=3
const NUM_OF_GENERATIONS=500
let highestFitness=0;

const fitOutput=document.getElementById("currentFitness")
const genOutput=document.getElementById("currentGeneration")


function evolveNextGeneration(prevGeneration){
	let totalFitness = 0
	prevGeneration.forEach(program=>{
		if (program.fitness) totalFitness+=program.fitness
	})
	let avgFitness = totalFitness/prevGeneration.length
	fitOutput.innerText=avgFitness

	let sortedGen = prevGeneration.sort((a,b)=>{return b.fitness - a.fitness})
	let nextGen=[],index=0

	for (let i=0;i<400;i++){
		if (i%40==0)index+=1
		if (!sortedGen[index]) {
			index+=1
			continue
		}
		nextGen.push(sortedGen[index])
		let mutatedSurvivorTree = selectMutationType(sortedGen[index].tree,MAX_DESCENT_DEPTH,MAX_ADDITION_DEPTH)
		let program = generateProgram(mutatedSurvivorTree)
		let output = evaluateProgram(program)
	
		if (output) {
			let fitVal = fitness(MODEL,output,program.length)

			if (fitVal>highestFitness){
				highestFitness=fitVal
				pushProgramToDiv(program,output,fitVal)
			}
			nextGen.push(
				{"tree":mutatedSurvivorTree,
				"fitness":fitVal
				}
			)
		}
	}
	return nextGen
}

function fitness(modelArr,actual,programLength){
	let fitVal=100 - Math.abs(modelArr.length-actual.length)*5 //- programLength/20
	for (let i=0;i<modelArr.length;i++){
		if (typeof actual[i] == typeof modelArr[i]){
			fitVal-=Math.abs(modelArr[i]-actual[i])*10//*(10-i*2)
		}
		else{fitVal-=10}
	}
	return fitVal
}

function evaluateProgram(program){
	try{
		let output= new Function(program)
		return output()
	}
	catch(error){
		return undefined
	}
}

function generateSeedTree(maxDepth,maxNumberOfActions){
	let numberOfActions = nSidedDie(maxNumberOfActions)+1
	let rootNode= new Node('topLevel',null,[]);
	while (0<numberOfActions){
		opsLeft=maxDepth
		let child=chooseRandomFromArr(programActions)()
		if (child) rootNode.addChild(child)
		numberOfActions--
	}
	return rootNode
}

function generateProgram(rootNode){
	let program='let output = [];\nfunction fun(a,b,c){\n'
	program+=astToText(rootNode)+'}\nfun('+MODEL.length+',0,0)\n return output'
	return program
}

function nSidedDie(n){
	if (n === 0 || n === 1) return 0;
	return Math.round(Math.random()*(n-1))
}

function selectMutationType(rootNode,maxDescentDepth,maxAdditionDepth){
	let choice = nSidedDie(MUTATE_LOWER_LEVEL_EXPRESSION_RATE)
	if (choice==1) rootNode = MutateTopLevelAction(rootNode,maxDescentDepth)
	else if (choice>=2) {
		rootNode = MutateLowerLevelExpression(rootNode,maxDescentDepth,maxAdditionDepth)
	}

	return rootNode
}

//action mutations
function MutateTopLevelAction(rootNode,maxDepth){
	let choice = nSidedDie(TOP_LEVEL_MUTATION_RATE)
	if (choice==2 && rootNode.children.length>1) rootNode = deleteRandomAction(rootNode)
	else if (choice==1) rootNode = replaceRandomAction(rootNode,maxDepth)
	else if (choice==0) rootNode = addRandomAction(rootNode,maxDepth)
	return rootNode
}

function deleteRandomAction(rootNode){
	let choice = nSidedDie(rootNode.children.length)
	rootNode.children.splice(choice,1)
	return rootNode
}

function addRandomAction(rootNode,maxDepth){
	opsLeft=maxDepth
	let child=chooseRandomFromArr(programActions)()
	if (child) {
		rootNode.addChildInRandomPosition(child)
	}
	return rootNode
}

function replaceRandomAction(rootNode,maxDepth){
	opsLeft=maxDepth
	let child=chooseRandomFromArr(programActions)()
	let choice = nSidedDie(rootNode.children.length)
	rootNode.children[choice]=child
	return rootNode
}

///expression and conditional mutations
function MutateLowerLevelExpression(rootNode,maxDescentDepth,maxAdditionDepth){
	if (!rootNode) return
	let roll = nSidedDie(rootNode.children.length)
	let child = rootNode.children[roll]
	let randomDescentDepth=Math.max(1, nSidedDie(maxDescentDepth))
	let randomAdditionDepth=nSidedDie(maxAdditionDepth)
	let newNode = descendToDepthAndMutate(child,randomDescentDepth,randomAdditionDepth)
	rootNode.children[roll] = newNode
	return rootNode
}

function descendToDepthAndMutate(node,descentDepth,AdditionDepth){
		if (descentDepth>0 && node.children!=null && node.children.length !== 0){

			let roll = nSidedDie(node.children.length)
			let child = node.children[roll]
			// if (node.children.length == 0) debugger
			// roll
			let deepResult = descendToDepthAndMutate(
				child,
				descentDepth-1,
				AdditionDepth
			)

			node.children[roll] = deepResult
			return node
		}
		else return mutate(node,AdditionDepth)
}

function mutate(node,maxExtraDepth){
	opsLeft = maxExtraDepth
	if (node.category=="expression") return chooseExpression()
	else if (node.category=="condition") return chooseRandomFromArr(conditions)
	else if (node.category=="conditionParent") return chooseRandomCondition()
}
