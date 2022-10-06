/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction(id) {
    document.getElementById(id).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
            //Get ctx from string
            var ctx = chart.chart.ctx;
            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Lato';
            var txt = centerConfig.text;
            var color = centerConfig.color || '#000';
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
            //Start with a base font of 30px
            ctx.font = "10px " + fontStyle;

            //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = 60

            //Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse+"px " + fontStyle;
            ctx.fillStyle = color;

          if (centerConfig.type=='devices'){
            fontSizeToUse=30
            ctx.font = fontSizeToUse+"px " + fontStyle;
            var lines = txt.split('\n');
            var lineheight = fontSizeToUse;
            for (var i = 0; i<lines.length; i++){
                if (selectedDevice==i) ctx.fillStyle = "#EF9144" 
                else {
                    if (i==0) ctx.fillStyle = "#02B3D1";
                    if (i==1) ctx.fillStyle = "#116189";
                }
                ctx.fillText(lines[i], centerX, centerY-lineheight/2 + (i*lineheight) );
            }
          }
          else if(centerConfig.type=='location'){
            if (shouldTurnLocationInnerTextOrange()) ctx.fillStyle = "#EF9144"
            if (locationInnerText()==undefined)return
            ctx.fillText(locationInnerText(), centerX, centerY);
          }
          else if(centerConfig.type=='intentOfUse'){
            let innerText = getPieChartInnerText('intentOfUse')
            if (innerText!==undefined){
                ctx.fillStyle = "#EF9144" 
                ctx.fillText(innerText, centerX, centerY);
            }
          }
          else if(centerConfig.type=='payerMix'){
            let innerText = getPieChartInnerText('payerMix')
            if (innerText!==undefined){
                ctx.fillStyle = "#EF9144" 
                ctx.fillText(innerText, centerX, centerY);
            }
          }
        }
    }
});

function getPieChartInnerText(chartType){
    if (currentSelectedText){ 
        for (let i=0;i<mockData[chartType].length;i++){
            if (mockData[chartType][i][0]==currentSelectedText){
                return mockData[chartType][i][1]
            }
        }
    }
    return undefined
}

Date.prototype.getWeek = function () {
    var target  = new Date(this.valueOf());
    var dayNr   = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
}

function getDateRangeOfWeek(weekNo){
    let offset=7
    var d1 = new Date();
    numOfdaysPastSinceLastMonday = eval(d1.getDay());
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    var weekNoToday = d1.getWeek();
    var weeksInTheFuture = eval( weekNo - weekNoToday );
        if (weekNo>weekNoToday+1)weeksInTheFuture=weeksInTheFuture-52
    d1.setDate(d1.getDate() + eval( 7 * weeksInTheFuture )-offset);
    var rangeIsFrom = eval(d1.getMonth()+1) +"/" + d1.getDate() + "/" + d1.getFullYear().toString().slice(2);
    d1.setDate(d1.getDate() + 6);
    var rangeIsTo = eval(d1.getMonth()+1) +"/" + d1.getDate() + "/" + d1.getFullYear().toString().slice(2);
    return rangeIsFrom + " - "+rangeIsTo;
}

function generateWeekList(weekRange,end){
    let weeks=[]
    for (let i=weekRange-1;i>=end;i--){
        weeks.push(["Week "+moment().subtract(i,'week').week(),0])
    }
    return weeks
}

function formatWeeks(data){
    let weekList=generateWeekList(12,0);
    data.forEach(entry=>{
        index= weekList.map(week=>week[0]).indexOf(entry[0]);
        if (index>-1)weekList[index][1]=entry[1]
    })
    weekList.forEach(entry=>{
        entry[0]= getDateRangeOfWeek(entry[0].slice(5))
    })
    return weekList
}

function generateMonthList(){
    let months=[],monthRange=12
    for (let i=monthRange-1;i>=0;i--){
        months.push([moment().subtract(i,'month').format("MMM"),0])
    }
    return months
}

function formatMonths(DBmonths){
    let monthList=generateMonthList()
    DBmonths.forEach(entry=>{
        index= monthList.map(month=>month[0]).indexOf(entry[0]);
        if (index>-1) monthList[index][1]=entry[1]
    })
    return monthList
}

function formatDays(dailyFromDB){
    let dailyWithEmpty=[],dayRange=14
    for (let i=dayRange-1;i>=0;i--){
        let date=moment().subtract(i, 'days').format('MM-DD-YY')
        let val=0;
        let index= dailyFromDB.map(entry=>entry[0]).indexOf(date);
        if (index>-1)val=dailyFromDB[index][1]
        dailyWithEmpty.push([date,val])
    }
    return dailyWithEmpty
}

let barChartRange=0

const mockData={
submittedForms:{
daily:formatDays([
        [ "03-16-19",2 ],
        [ "03-15-19",5 ],
        [ "03-10-19",6 ],
        [ "04-16-19",1 ],
        [ "04-10-19",5 ],
        [ "05-16-19",2 ],
        [ "05-15-19",8 ],
        [ "06-10-19",5 ],
]).slice(-barChartRange),
weekly:formatWeeks([
        [ "Week 11",7 ],
        [ "Week 10",2 ],
        [ "Week 9",3 ],
        [ "Week 8",7 ],
        [ "Week 7",2 ],
        [ "Week 9",5 ],        
        [ "Week 13",7 ],
        [ "Week 15",2 ],
        [ "Week 20",8 ],  
        [ "Week 25",2 ],
        [ "Week 30",9 ],
]).slice(-barChartRange),
monthly:formatMonths([
        [ "Jan",7 ],
        [ "Feb",8 ],
        [ "Mar",9 ],
        [ "Apr",10 ],
        [ "May",11 ],
        [ "Jun",12 ],
        [ "Jul",13],
        [ "Aug",14 ],
]).slice(-barChartRange),
annually:[
        [ "2019",7 ],
        [ "2020",8 ],
        [ "2021",9 ],
        [ "2022",10 ],
        [ "2023",11 ],
].slice(-barChartRange),
},
location:{
city:[
        [ "New Efren",3 ],
        [ "sur-city",4 ],
        [ "Port Earnestine",1 ],
        [ "Miami",2 ],
],
state:[
    [ "Undefined",2 ],
    [ "Alabama",3 ],
[ "Florida",4 ],
[ "New York",5 ],
            ],
country:[
        [ "Canada",16 ],
        [ "Afghanistan",1 ],
        [ "United States",5 ],
],
},
devices: [
[ "Portable Connect", 5],
[ "Recumbent", 10],
],
intentOfUse: [
[ "Total Joint Replacement", 2],
[ "Sports Medicine", 1],
[ "Orthopedic Trauma", 1],
[ "Non-Surgical Orthopedic", 2],
[ "Spine", 3],
[ "Other", 4],
],
payerMix: [
[ "Medicare", 2],
[ "Medicaid", 3],
[ "Patient Paid", 1],
[ "Private Insurance", 2],
[ "Workers Comp", 4],
[ "VA Health Care", 1],
],
}

let submittedFormsType="annually", locationType="state", sortType="Sort: Highest To Lowest"


function locationInnerText(){
    let findText
    if (currentSelectedText){
        findText=textInLocation(currentSelectedText)
        if(findText[0]){
            return findText[1]
        }
    }
    //return mockData.location[locationType].length
}

function textInLocation(text){
    for (let i=0;i<mockData.location[locationType].length;i++){
        if (mockData.location[locationType][i][0]==text)return [true,mockData.location[locationType][i][1]]
    }
    return [false,0]
}

function shouldTurnLocationInnerTextOrange(){
    let findText
    if (currentSelectedText){
        findText=textInLocation(currentSelectedText)
        if(findText[0]){
            return true
        }
    }
    return false
}


const colors={
    bar:"#106179",
    selected:"#EF9144",
    pie:["#02B3D1",
        "#BBE5F7",
        "#116189",
        "#66D9C3",
        "#42535C",
        "#0E929F"],
    devices:["#02B3D1","#116189"]
}


function generateManyColors(data){
    let maxLength= Math.max(data.location.city.length,data.location.state.length,data.location.country.length)
    let arr=[]
    for (let i=0;i<maxLength;i++){
        arr.push(colors.pie[i%colors.pie.length])
    }
    return arr
}
let orderedColors=generateManyColors(mockData)
let unorderedColors=generateManyColors(mockData)

function generateColorsOfLength(len){
    let arr=[]
    for (let i=0;i<len;i++){
        arr.push(colors.pie[i%colors.pie.length])
    }
    return arr
}
let locationColors= {city:generateColorsOfLength(mockData.location.city.length)
                    ,state:generateColorsOfLength(mockData.location.state.length)
                    ,country:generateColorsOfLength(mockData.location.country.length)}

function typeToMenuLabel(type){
    let capital= type.charAt(0).toUpperCase();
    return capital + type.slice(1)  +' <img src="./img/icon-dropdown-arrow-charts.svg">'
}

function changeSubmittedFormsData(type){
    submittedFormsType=type
    document.getElementById("SubmittedFormsDropdownButton").innerHTML= typeToMenuLabel(type)
    submittedForms.data.labels = getLabels(mockData.submittedForms[submittedFormsType])
    submittedForms.data.datasets.forEach((dataset) => {
        dataset.data= getVals(mockData.submittedForms[submittedFormsType])
    });
    addCustomLegend("#location-legend",locationChart)
    submittedForms.update();
    resetDropDown()
    resetDropDownButtonText()


    $('#location-legend').off("click");
    clearLegendSelections()
    locationChart.data.datasets[0].backgroundColor= locationColors[locationType].slice()
    addCustomLegend("#location-legend",locationChart)
    locationChart.update()
}

//need to do 2 initial sorts to get into correct order
//after that only reverse() data so that ordering of equal values is preserved
let initialSort=0
function changeSortOrder(data){
    if(sortType=="Sort: Highest To Lowest"){
        locationColors[locationType].reverse()
        sortType="Sort: Lowest To Highest"
        if (initialSort<2){
            sortLabelsLowestToHighest(mockData.location['city'])
            sortLabelsLowestToHighest(mockData.location['state'])
            sortLabelsLowestToHighest(mockData.location['country'])
            initialSort+=1
        }
        else mockData.location[locationType].reverse()
    }
    else if(sortType=="Sort: Lowest To Highest"){
        locationColors[locationType].reverse()
        sortType="Sort: Highest To Lowest"
        if (initialSort<2){
            sortLabelsHighestToLowest(mockData.location['city'])
            sortLabelsHighestToLowest(mockData.location['state'])
            sortLabelsHighestToLowest(mockData.location['country'])
            initialSort+=1
        }
        else mockData.location[locationType].reverse()
    }
    document.getElementById("sortLocation").innerHTML=sortType+'<img src="./img/icon-sort-arrows.svg" alt="" style="padding-left:15px">'
    locationChart.data.labels = getLabels(mockData.location[locationType])
    locationChart.data.datasets.forEach((dataset) => {
        dataset.data= getVals(mockData.location[locationType])
    });

    $('#location-legend').off("click");
    currentSelectedText=undefined
    clearLegendSelections()
    resetPieChartSelections()
    locationChart.data.datasets[0].backgroundColor= locationColors[locationType].slice()
    addCustomLegend("#location-legend",locationChart)
    locationChart.update()
}

function changeLocationData(type){
    locationType=type
    document.getElementById("locationDropdownButton").innerHTML=typeToMenuLabel(type)

    if(sortType=="Sort: Highest To Lowest"){
        sortLabelsHighestToLowest(mockData.location[locationType])
    }
    else if(sortType=="Sort: Lowest To Highest"){
        sortLabelsLowestToHighest(mockData.location[locationType])
    }

    locationChart.data.labels = getLabels(mockData.location[locationType])
    locationChart.data.datasets.forEach((dataset) => {
        dataset.data= getVals(mockData.location[locationType])
    });
    //chartName.removeLegend()
    $('#location-legend').off("click");
    clearLegendSelections()
    locationChart.data.datasets[0].backgroundColor= locationColors[locationType].slice()
    addCustomLegend("#location-legend",locationChart)
    locationChart.update();

    resetDropDown()
    resetDropDownButtonText()
}


function sortLabelsHighestToLowest(data){
    data.sort((a,b)=>b[1]-a[1])
}

function sortLabelsLowestToHighest(data){
    data.sort((a,b)=>a[1]-b[1])
}

function getLabels(data){
    return data.map(entry=> entry[0])
}
function getVals(data){
    return data.map(entry=> entry[1])
}


let ctx = document.getElementById("submittedForms").getContext('2d');
let submittedForms = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: getLabels(mockData.submittedForms[submittedFormsType]),
        datasets: [{
            //display:false,
            fontColor:"#106179",
            data: getVals(mockData.submittedForms[submittedFormsType]),
            backgroundColor: colors.bar,
            hoverBackgroundColor: colors.selected
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio:false,
        layout:{

            padding: {
                top:60
            }
        },
        legend:{
            display:false
        },

        tooltips: {
            xAlign: 'center',
            yAlign: 'bottom',
            backgroundColor:'rgba(255,255,255,1)',
            bodyFontColor:"#6A6A6A",
            bodyFontStyle: "bold",
            borderColor:colors.selected,
            borderWidth:1,
            titleFontSize:0,
            displayColors:false,
            bodyFontSize:16,
            xPadding:20,
            yPadding:10
        },

        scales: {
            xAxes:[{
                gridLines: {
                    display:false
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45
                }
            }],
            yAxes: [{
                ticks: {
                    callback: function(value){if (value % 1 === 0)return value;},
                    beginAtZero:true,
                    fontColor:"#106179",

                },
                scaleLabel: {
                    fontColor: "#6A6A6A",
                    display: true,
                    labelString: 'Amount Of Forms Submitted'
                }
            }]
        }
    }
});

let pieChartToolTips= {
    yAlign: 'bottom',
    backgroundColor:'rgba(255,255,255,1)',
    bodyFontColor:'#6A6A6A',
    bodyFontStyle: "bold",
    borderColor:colors.selected,
    borderWidth:1,
    titleFontSize:0,
    displayColors:false,
    bodyFontSize:16,
    xPadding:20,
    yPadding:10
}
let intentToolTips= {
    backgroundColor:'rgba(255,255,255,1)',
    bodyFontColor:'#6A6A6A',
    bodyFontStyle: "bold",
    borderColor:colors.selected,
    borderWidth:1,
    titleFontSize:0,
    displayColors:false,
    bodyFontSize:14,
    xPadding:8,
    yPadding:10
}

let locationChartInnerText=mockData.location[locationType].length

let locationContext = document.getElementById("location").getContext('2d');
let locationChart = new Chart(locationContext, {
    type: 'doughnut',
    data: {
        labels: getLabels(mockData.location[locationType]),
        datasets: [
            {
                backgroundColor: orderedColors ,
                data: getVals(mockData.location[locationType])
            }
        ]
    },
    options: {
        tooltips:pieChartToolTips,
        layout:{
            padding: {
                top:10
            }
        },
        elements: {
            center: {
                type: 'location',
                text: mockData.location[locationType].length,
                color: '#116189', //Default black
                fontStyle: 'Lato', //Default Arial
                fontSize:15,
                sidePadding: 30 //Default 20 (as a percentage)
            }
        },
        legend:false,
        legendCallback: (chart)=>makeLegend(chart),
    }
});


let devicesContext = document.getElementById("devices").getContext('2d');
let devicesChart = new Chart(devicesContext, {
    type: 'doughnut',
    data: {
        labels: getLabels(mockData.devices),
        datasets: [
            {
                backgroundColor: colors.devices.slice()  ,
                data: getVals(mockData.devices)
            }
        ]
    },
    options: {
        layout:{
          padding: {
            left: 5,
            right: 30,
            top: 0,
            bottom: 0                            
          }
        },
        tooltips:intentToolTips,
        elements: {
            center: {
                type: 'devices',
                text: getVals(mockData.devices).join('\n'),
                color: '#116189', //Default black
                fontStyle: 'Lato', //Default Arial
                fontSize:15,
                sidePadding: 30 //Default 20 (as a percentage)
            }
        },
        legend:false,
        legendCallback: (chart)=>makeLegend(chart),
    }
});

let intentOfUseContext = document.getElementById("intentOfUse").getContext('2d');
let intentOfUseChart = new Chart(intentOfUseContext, {
    type: 'doughnut',
    data: {
        labels: getLabels(mockData.intentOfUse),
        datasets: [
            {
                backgroundColor: colors.pie.slice() ,
                data: getVals(mockData.intentOfUse)
            }
        ]
    },
    options: {
        layout:{
          padding: {
            left: 5,
            right: 22,
            top: 0,
            bottom: 0                            
            }
        },
        elements: {
            center: {
              type:'intentOfUse',
              color: '#116189', //Default black
              fontStyle: 'Lato', //Default Arial
              fontSize:15,
              sidePadding: 30 //Default 20 (as a percentage)
            }
        },
        tooltips:intentToolTips,
        legend:false,
        legendCallback: (chart)=>makeLegend(chart),
    }
});
let payerMixContext = document.getElementById("payerMix").getContext('2d');
let payerMixChart = new Chart(payerMixContext, {
    type: 'doughnut',
    data: {
        labels: getLabels(mockData.payerMix),
        datasets: [
            {
                backgroundColor: colors.pie.slice() ,
                data: getVals(mockData.payerMix)
            }
        ]
    },
    options: {
        layout:{
          padding: {
            left: 5,
            right: 20,
            top: 0,
            bottom: 0                            
            }
        },
        elements: {
            center: {
              type:'payerMix',
              color: '#116189', //Default black
              fontStyle: 'Lato', //Default Arial
              fontSize:15,
              sidePadding: 30 //Default 20 (as a percentage)
            }
        },
        tooltips:pieChartToolTips,
        legend:false,
        legendCallback: (chart)=>makeLegend(chart),
    }
});

function resizeChart(chartName,w,h){
    chartName.canvas.parentNode.style.height = h;
    chartName.canvas.parentNode.style.width = w;
}

locationChart.name="locationChart"
devicesChart.name="devicesChart"
intentOfUseChart.name="intentOfUseChart"
payerMixChart.name="payerMixChart"


//resizeChart(devicesChart,'250px','250px')
resizeChart(submittedForms,'724px','350px')
resizeChart(locationChart,'255px','255px')
resizeChart(devicesChart,'250px','250px')
resizeChart(intentOfUseChart,'250px','250px')
resizeChart(payerMixChart,'250px','250px')

function makeLegend(chart) {
    var text = [];
    if (chart.id==1) text.push('<div data-simplebar data-simplebar-auto-hide="false" style="overflow-x: hidden; padding-top=20px">');
    text.push('<ul class="' + chart.id + '-legend">');
    for (var i = 0; i < chart.data.datasets[0].data.length; i++) {

        text.push('<li class="legendEl"><span>')
        text.push('<div class="legendSquare" style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '"></div><div class="legendSquare" style="background-color:#EF9144; display:none"></div>')
        if (chart.data.labels[i]) {
            text.push(chart.data.labels[i]);
        }
        text.push('</span></li>');
    }
    text.push('</ul>');
    if (chart.id==1)text.push('</div>');
    return text.join("");
}

let selectedDevice=-1,previousChart,currentSelectedText
function addCustomLegend(legendDiv,chartName){
    selectedDevice=-1
    $(legendDiv).html(chartName.generateLegend());
    $(legendDiv).on('click', "li", function(event)  {
        
        document.querySelector('main').focus();

        resetPieChartSelections()

        previousChart=chartName
        $target = $(event.currentTarget);
        locationChart.data.datasets[0].backgroundColor= locationColors[locationType].slice()
        devicesChart.data.datasets[0].backgroundColor= colors.devices.slice()

        if ($target.hasClass('active-chart')) {
            chartName.wasReset=false
            let legendSquare = $target[0].children[0].children[0]
            legendSquare.style.display="initial"
            let highLightSquare = $target[0].children[0].children[1]
            highLightSquare.style.display="none"

            $target.removeClass('active-chart')
            $target.html($target.html().slice(0, $target.html().length-7))
            selectedDevice=-1
            currentSelectedText = undefined
        }
        else {
            clearLegendSelections()
            chartName.wasReset=false

            $target.addClass('active-chart');
            currentSelectedText = $target[0].innerText

            let legendSquare = $target[0].children[0].children[0]
            legendSquare.style.display="none"
            let highLightSquare = $target[0].children[0].children[1]
            highLightSquare.style.display="initial"

            $target.html($target.html()+'<img src="./img/icon-close-with-hitArea.svg" style="padding-left:13px" class="close-icon">')
            chartName.data.datasets[0].backgroundColor[$(this).index()] = colors.selected
            if (legendDiv=="#devices-legend")selectedDevice=$(this).index()
            else{selectedDevice=-1}
        }

        chartName.update();
    });
}

addCustomLegend("#devices-legend",devicesChart)
addCustomLegend("#location-legend",locationChart)
addCustomLegend("#intentOfUse-legend",intentOfUseChart)
addCustomLegend("#payerMix-legend",payerMixChart)

let pieCharts=[devicesChart,locationChart,intentOfUseChart,payerMixChart]

function resetPieChartSelections(dontBlur){
    if (!dontBlur)document.activeElement.blur();

    pieCharts.forEach(chart=>{
        if (!chart.wasReset){
            chart.wasReset=true
            if (chart==locationChart)locationChart.data.datasets[0].backgroundColor= locationColors[locationType].slice()
            else if (chart==devicesChart)devicesChart.data.datasets[0].backgroundColor= colors.devices.slice()
            else chart.data.datasets[0].backgroundColor= colors.pie.slice()
            chart.update()
        }
    })
}

function clearLegendSelections(){
    var elements = document.getElementsByClassName('active-chart');

    while(elements.length > 0){
        let temp =elements[0]

        temp.innerHTML = temp.innerHTML.slice(0, temp.innerHTML.length-1)
        elements[0].classList.remove('active-chart');
        let legendSquare = temp.children[0].children[0]
        legendSquare.style.display="initial"
        let highLightSquare = temp.children[0].children[1]
        highLightSquare.style.display="none"

    }
}


var coll = document.getElementsByClassName("dropbtn");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        currentSelectedText=undefined
        clearLegendSelections()
        resetPieChartSelections(true)
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
            content.style.paddingTop= '0';
            content.style.paddingBottom= '0';
            this.children[0].src="./img/icon-dropdown-arrow-charts.svg"
        }
        else {
            content.style.maxHeight = (content.scrollHeight +30)+ "px";
            content.style.paddingTop= '15px';
            content.style.paddingBottom= '15px';
            this.children[0].src="./img/icon-dropdown-arrow-up.svg"
        }
    });
    //close dropdown if you click anywhere
    coll[i].addEventListener("blur", function() {
        let that=this
        setTimeout(function(){
            var content = that.nextElementSibling;
            content.style.maxHeight = null;
            content.style.paddingTop= '0';
            content.style.paddingBottom= '0';
            that.children[0].src="./img/icon-dropdown-arrow-charts.svg"
        },100)
    })
}

function resetDropDown(){
    for (i = 0; i < coll.length; i++) {
        clearLegendSelections()
        var content = coll[i].nextElementSibling;
        content.style.maxHeight = null;
        content.style.paddingTop= '0';
        content.style.paddingBottom= '0';
    }
}

function resetDropDownButtonText(){
    let locBut=document.getElementById('locationDropdownButton')
    locBut.children[0].src="./img/icon-dropdown-arrow-charts.svg"
    let subBut=document.getElementById('SubmittedFormsDropdownButton')
    subBut.children[0].src="./img/icon-dropdown-arrow-charts.svg"
}
  //reset sort order to highest to lowest
changeSortOrder()
changeSortOrder()
resetPieChartSelections()




function responsiveBarChart(x,barChartWidth,entries) {
    if (x.matches) {
        barChartRange=entries;
        resizeChart(submittedForms,barChartWidth,'350px')
    }

mockData.submittedForms={
daily:formatDays([
        [ "03-16-19",2 ],
        [ "03-15-19",5 ],
        [ "03-10-19",6 ],
        [ "04-16-19",1 ],
        [ "04-10-19",5 ],
        [ "05-16-19",2 ],
        [ "05-15-19",8 ],
        [ "06-10-19",5 ],
]).slice(-barChartRange),
weekly:formatWeeks([
        [ "Week 11",7 ],
        [ "Week 10",2 ],
        [ "Week 9",3 ],
        [ "Week 8",7 ],
        [ "Week 7",2 ],
        [ "Week 9",5 ],        
        [ "Week 13",7 ],
        [ "Week 15",2 ],
        [ "Week 20",8 ],  
        [ "Week 25",2 ],
        [ "Week 30",9 ],
]).slice(-barChartRange),
monthly:formatMonths([
        [ "Jan",7 ],
        [ "Feb",8 ],
        [ "Mar",9 ],
        [ "Apr",10 ],
        [ "May",11 ],
        [ "Jun",12 ],
        [ "Jul",13],
        [ "Aug",14 ],
]).slice(-barChartRange),
annually:[
        [ "2019",7 ],
        [ "2020",8 ],
        [ "2021",9 ],
        [ "2022",10 ],
        [ "2023",11 ],
].slice(-barChartRange),
},
    changeSubmittedFormsData(submittedFormsType)
    submittedForms.update();
} 

function addMediaQueryToBarChart(queryArray){
    queryArray.forEach(query=>{
        var x = window.matchMedia(query.queryString)
        x.addListener(()=>responsiveBarChart(x,query.barChartWidth,query.entries)) // Attach listener function on state changes 
        responsiveBarChart(x,query.barChartWidth,query.entries)
    })
}

let queryArray=[
{queryString:"(min-width: 1341px)",barChartWidth:"724px",entries:0},
{queryString:"(max-width: 1340px) and (min-width: 1101px)",barChartWidth:"520px",entries:8},
{queryString:"(max-width: 1100px) and (min-width: 801px)",barChartWidth:"724px",entries:0},
{queryString:"(max-width: 800px) and (min-width: 601px)",barChartWidth:"520px",entries:8},
{queryString:"(max-width: 600px) and (min-width: 470px)",barChartWidth:"420px",entries:6},
{queryString:"(max-width: 470px)",barChartWidth:"320px",entries:4},
]
addMediaQueryToBarChart(queryArray)