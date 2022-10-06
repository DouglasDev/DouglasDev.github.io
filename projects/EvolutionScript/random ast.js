function evaluateExpression(expression){
	if (typeof expression == "function"){
		return expression()
	} 
	else {
		return expression
	}
}

//only take expressions
function returnVal(expression){
	return new Node('action','returnValNode',null,[evaluateExpression(expression)])
}

function equals(expression1,expression2){
	return new Node('condition','equalsNode',null,[evaluateExpression(expression1),evaluateExpression(expression2)])
}

function greater(expression1,expression2){
	return new Node('condition','greaterNode',null,[evaluateExpression(expression1),evaluateExpression(expression2)])
}

function lesser(expression1,expression2){
	return new Node('condition','lesserNode',null,[evaluateExpression(expression1),evaluateExpression(expression2)])
}

function add(expression1,expression2){
	return new Node('expression','addNode',null,[evaluateExpression(expression1),evaluateExpression(expression2)])
}

function subtract(expression1,expression2){
	return new Node('expression','subtractNode',null,[evaluateExpression(expression1),evaluateExpression(expression2)])
}

//take arg other than expression
function declare(variable,expression){
	return new Node('action','declareNode',null,[variable,evaluateExpression(expression)])
}

function assign(variable,expression){
	return new Node('action',"assignNode",null,[variable,evaluateExpression(expression)])
}

function ternary(condition,trueExpression,elseExpression){
	return new Node('expression','ternaryNode',null,
		[evaluateExpression(condition),evaluateExpression(trueExpression),evaluateExpression(elseExpression)])
}

function callFunction(expression){
	return new Node('expression','callFunctionNode',null,
		[evaluateExpression(expression),evaluateExpression(expression),evaluateExpression(expression)])
}

function pushToArray(arr,expression){
	return new Node('expression','pushToArrayNode',null,[evaluateExpression(expression)])
}

function doNothing(){
	return undefined
}

//selector functions
function chooseRandomFromArr(arr){
	state=arr[Math.round(Math.random()*(arr.length-1))]
	return state
}

function chooseExpression(){
	if (0<opsLeft) {
		opsLeft--
		return chooseRandomFromArr(allRandomExpressions)()
	}
	else return chooseRandomFromArr(randomNonRecursiveExpression)()
}

function chooseRandomVar(){
	let allowedVariables=['a','b','c']
	return new Node('expression','var',chooseRandomFromArr(allowedVariables))
}

function chooseRandomNum(){
	let allowedNums=[-1,0,1]
	return new Node('expression','num',chooseRandomFromArr(allowedNums))
}

function chooseRandomCondition(){
	return new Node('conditionParent',chooseRandomFromArr(conditions),null,[chooseExpression(),chooseExpression()])
}

//random seed program
let programActions = [
	//()=>declare(chooseRandomVar(),chooseExpression()),
	()=>assign(chooseRandomVar(),chooseExpression()),
	()=>callFunction(chooseExpression(),chooseExpression(),chooseExpression()),
	()=>returnVal(chooseExpression()),
	()=>ternary(chooseRandomCondition(),chooseExpression(),chooseExpression()),
	//()=>pushToArray('output',chooseExpression())
	//()=>doNothing()
]

let allRandomExpressions = [
	()=>add(chooseExpression,chooseExpression),
	()=>subtract(chooseExpression,chooseExpression),
	()=>ternary(chooseRandomCondition,chooseExpression,chooseExpression),
	()=>callFunction(chooseExpression,chooseExpression,chooseExpression),
	()=>pushToArray('output',chooseExpression()),
	()=>chooseRandomNum(),
	()=>chooseRandomVar(),
]

let randomNonRecursiveExpression = [()=>chooseRandomNum(), ()=>chooseRandomVar()]

let conditions=['lesserNode','greaterNode','equalsNode']