let view=document.getElementById("view")
let info=document.getElementById("info")
let surroundings=document.getElementById("surroundings")
const people=['👱','👧','👷‍♀️','🧙‍♂️','🧛','🧜‍♀️','💃','🧞','🦹','🎅','👸','🕵']
const person= num => people[num]
function renderView(iteration){

	let gridView=wall+"\n";

	for (let y=0;y<gridDimensions;y++){
		for (let x=0;x<gridDimensions;x++){
		//	console.log(x,y)
			// if (x==0)gridView+="|";

			if (grid[y][x]==-1) gridView+=" ";
			else gridView+=person(grid[y][x]);

			if (grid[y][x]<10) gridView+=" ";

			if (x==gridDimensions-1) gridView+="\n"

		}
	}
	gridView+=bottomWall;

	let agentInfo="";
	agentList.forEach(agent=>{
		//agent.update();
    agentInfo+="Agent "+person(agent.id)+" likes: "+agent.likeArray.map((n)=>n.toPrecision(2))
		//+"\ntrust: "+agent.trustArray

      +"\npopularity: "+agent.popularity
		+" loneliness: "+agent.loneliness.toPrecision(3)
		+"\nmemory: "+agent.memory.map((n)=>n.toPrecision(2))
      +" last move: "+ agent.lastMove+"\n\n"
	});
	//console.clear();

	//let agentTracker=agentList[trackedAgent].lastMove
	//agentList[trackedAgent].lastMove='';
	let surr=agentList[trackedAgent].surroundings;
	surr=surr.map(space=> space==-1?' ':person(space))
	let agent0View="\n"+surr[0]+surr[1]+surr[2]+"\n"+surr[3]+" "+surr[4]+"\n"+surr[5]+surr[6]+surr[7];

	view.innerHTML=gridView+"\n\nAgent "+person(0)+"'s sight:\n"+agent0View
	info.innerHTML="iteration: "+iteration+"\n\n"+agentInfo
	//console.log('nets',networks)

	//iteration+=1;
}
