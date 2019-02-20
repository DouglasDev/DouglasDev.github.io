function evaluateNode(node){
	if (node==undefined) return
	if (node.type=='num' || node.type=='var') return node.val
	else return typeToExpression[node.type](node)
}

//only take expressions
function returnValNode(node){
	return 'return '+ evaluateNode(node.children[0])
}

function equalsNode(node){
	return evaluateNode(node.children[0]) + ' == ' + evaluateNode(node.children[1])
}

function greaterNode(node){
	return evaluateNode(node.children[0]) +' > '+ evaluateNode(node.children[1])
}

function lesserNode(node){
	return evaluateNode(node.children[0]) +' < '+ evaluateNode(node.children[1])
}

function addNode(node){
	return evaluateNode(node.children[0]) +' + '+ evaluateNode(node.children[1])
}

function subtractNode(node){
	return evaluateNode(node.children[0]) +' - '+ evaluateNode(node.children[1])
}

//take arg other than expression
function declareNode(node){
	return 'let ' + evaluateNode(node.children[0]) +' = '+ evaluateNode(node.children[1])
}

function assignNode(node){
	return evaluateNode(node.children[0]) +' = '+ evaluateNode(node.children[1])
}

function ternaryNode(node){
	let condition = typeToCondition[node.children[0].type](node.children[0])
	return  condition + " ? " + evaluateNode(node.children[1]) + " : " + evaluateNode(node.children[2])
}

function callFunctionNode(node){
	return "fun("+ evaluateNode(node.children[0]) + ", " 
				 + evaluateNode(node.children[1]) + ", "
				 + evaluateNode(node.children[2]) + ")"
}

function pushToArrayNode(node){
	return "output.push(" + evaluateNode(node.children[0]) + ")"
}

let typeToAction = {
	'ternaryNode':ternaryNode,
	'declareNode':declareNode,
	'assignNode':assignNode,
	'callFunctionNode':callFunctionNode,
	'pushToArrayNode':pushToArrayNode,
	'returnValNode':returnValNode
}
let typeToExpression = {
	'pushToArrayNode':pushToArrayNode,
	'ternaryNode':ternaryNode,
	'addNode':addNode,
	'subtractNode':subtractNode,
	'callFunctionNode':callFunctionNode
}
//let typeToVarOrNum = {'num':evaluateNode,'val':evaluateNode}
let typeToCondition = {'lesserNode':lesserNode,'greaterNode':greaterNode,'equalsNode':equalsNode}

function astToText(ast){
	try{
		let text = ""
		ast.children.forEach(child=>{
			// let mapper = {...typeToAction, ...typeToExpression, ...typeToVarOrNum}
			// if (!(child.type in mapper)) debugger
			// text += mapper[child.type](child) + '\n'
			text += typeToAction[child.type](child) + '\n'
		})
		return text
	}
	catch(error){
		console.log(error)
	}
}