
function bloodConc(dailyDose,halfLife,skipDay){
	console.log('Daily Dose: ',dailyDose)
	let conc = 0
	for (let day=0;day<30;day++){
		console.log('Day: ',day,'Concentration: ',conc)
		conc = conc/2
		conc = conc/2
		if (!skipDay || day%skipDay>0) conc+=dailyDose
	}
}

const halfLife = 12

bloodConc(200,halfLife)
bloodConc(100,halfLife)
bloodConc(50,halfLife)
bloodConc(25,halfLife)

console.log('SKIP EVERY 2 DAYS:')
bloodConc(200,halfLife,3)
bloodConc(100,halfLife,3)
bloodConc(50,halfLife,3)
bloodConc(25,halfLife,3)

console.log('SKIP EVERY OTHER DAYS:')
bloodConc(200,halfLife,2)
bloodConc(100,halfLife,2)
bloodConc(50,halfLife,2)
bloodConc(25,halfLife,2)
