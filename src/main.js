import {sevenFinished, finishedColor, unfinishedColor} from './chart.config.js'

let finished = sevenFinished[sevenFinished.length-1].finished;

//给标签赋值已走步数
document.querySelector('.info h3').innerText = finished;

//画布大小
const width = 300;
const height = 300;
//显示步数圆的半径
const raduis = 140;
//计算已走步数弧度,总弧度300,已走步数finished，总步数10000
let finished_arc_start = (finished*300/10000-240)*Math.PI/180;
if(finished > 10000){
	finished_arc_start = 60*Math.PI/180;
}
let finished_arc_end = -240*Math.PI/180;
//计算未走步数弧度,总弧度300,已走步数finished，总步数10000
let unfinished_arc_start = 60*Math.PI/180;
let unfinished_arc_end = (finished*300/10000-240)*Math.PI/180;

let barCanvas = document.querySelector('.top .bar');
barCanvas.width = width;
barCanvas.height = height;
let barContext = barCanvas.getContext('2d');
barContext.lineWidth = 20;
barContext.lineCap = 'round';

//绘制已走步数弧度
if(finished>0){
	barContext.beginPath();
	barContext.arc(width/2, height/2, raduis, finished_arc_start, finished_arc_end, true);
	barContext.strokeStyle = finishedColor;
	barContext.stroke();
	barContext.closePath();	
}


//绘制未达到10000步数弧度
if(finished<10000){
	barContext.beginPath();
	barContext.arc(width/2, height/2, raduis, unfinished_arc_start, unfinished_arc_end, true);
	barContext.strokeStyle = unfinishedColor;
	barContext.stroke();
	barContext.closePath();
}

//绘制已走步数和未达到10000步之间的颜色渐变弧度
if(finished > 0 && finished < 10000){
	let shadowCanvas = document.querySelector('.top .shadow');
	shadowCanvas.width = width;
	shadowCanvas.height = height;
	let shadowContext = shadowCanvas.getContext('2d');
	shadowContext.lineWidth = 20;
	shadowContext.lineCap = 'round';
	
	let linear = shadowContext.createLinearGradient(width/2,0,width/2,width);
	linear.addColorStop(0,finishedColor);
	linear.addColorStop(0.4,finishedColor);
	linear.addColorStop(0.6,unfinishedColor);
	linear.addColorStop(1,unfinishedColor);
	
	shadowContext.beginPath();
	shadowContext.arc(width/2, height/2, raduis, 20*Math.PI/180, -20*Math.PI/180, true);
	shadowContext.strokeStyle = linear;
	shadowContext.stroke();
	shadowContext.closePath();
	
	shadowCanvas.style.transform += `rotate(${finished*300/10000-240}deg)`;
}


//画七天步数
let sevenCanvas = document.querySelector('.bottom .seven');
sevenCanvas.width = width;
sevenCanvas.height = 100;
let sevenContext = sevenCanvas.getContext('2d');
sevenContext.lineWidth = 20;
sevenContext.lineCap = 'round';
sevenContext.strokeStyle = finishedColor;

//得到最大值
let max = 0;
let count = 0;
sevenFinished.map((item)=>{
	if(item.finished > max){
		max = item.finished;
	}
	count += item.finished;
})
//平均值
let lav = count / sevenFinished.length;
document.querySelector('.text2 span').innerText = Math.floor(lav);
//取得平均值水平线位置,(总高度60)
let lavHeight = 70 - (lav/max*60);
document.querySelector('.bottom .line').style.top = lavHeight+'px';

//初始第一天x轴坐标
let x = 300/7/2;
//绘制每一天的步数
sevenFinished.map((item)=>{
	//得到高度
	let itemHeight = item.finished/max*60;
	if(item.finished > 0){
		//绘制步数柱状图
		sevenContext.beginPath();
		sevenContext.moveTo(x, 70);
		sevenContext.lineTo(x, 70-itemHeight);
		sevenContext.stroke();
		sevenContext.closePath();
	}
	
	//绘制步数文字
	sevenContext.textAlign = 'center';
	sevenContext.fillText(item.date, x, 90);
	//修改x轴坐标
	x += 300/7;
})





