/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chartConfig = __webpack_require__(1);

var finished = _chartConfig.sevenFinished[_chartConfig.sevenFinished.length - 1].finished;

//给标签赋值已走步数
document.querySelector('.info h3').innerText = finished;

//画布大小
var width = 300;
var height = 300;
//显示步数圆的半径
var raduis = 140;
//计算已走步数弧度,总弧度300,已走步数finished，总步数10000
var finished_arc_start = (finished * 300 / 10000 - 240) * Math.PI / 180;
if (finished > 10000) {
	finished_arc_start = 60 * Math.PI / 180;
}
var finished_arc_end = -240 * Math.PI / 180;
//计算未走步数弧度,总弧度300,已走步数finished，总步数10000
var unfinished_arc_start = 60 * Math.PI / 180;
var unfinished_arc_end = (finished * 300 / 10000 - 240) * Math.PI / 180;

var barCanvas = document.querySelector('.top .bar');
barCanvas.width = width;
barCanvas.height = height;
var barContext = barCanvas.getContext('2d');
barContext.lineWidth = 20;
barContext.lineCap = 'round';

if (finished > 0) {
	barContext.beginPath();
	barContext.arc(width / 2, height / 2, raduis, finished_arc_start, finished_arc_end, true);
	barContext.strokeStyle = _chartConfig.finishedColor;
	barContext.stroke();
	barContext.closePath();
}

if (finished < 10000) {
	barContext.beginPath();
	barContext.arc(width / 2, height / 2, raduis, unfinished_arc_start, unfinished_arc_end, true);
	barContext.strokeStyle = _chartConfig.unfinishedColor;
	barContext.stroke();
	barContext.closePath();
}

if (finished > 0 && finished < 10000) {
	var shadowCanvas = document.querySelector('.top .shadow');
	shadowCanvas.width = width;
	shadowCanvas.height = height;
	var shadowContext = shadowCanvas.getContext('2d');
	shadowContext.lineWidth = 20;
	shadowContext.lineCap = 'round';

	var linear = shadowContext.createLinearGradient(width / 2, 0, width / 2, width);
	linear.addColorStop(0, _chartConfig.finishedColor);
	linear.addColorStop(0.4, _chartConfig.finishedColor);
	linear.addColorStop(0.6, _chartConfig.unfinishedColor);
	linear.addColorStop(1, _chartConfig.unfinishedColor);

	shadowContext.beginPath();
	shadowContext.arc(width / 2, height / 2, raduis, 20 * Math.PI / 180, -20 * Math.PI / 180, true);
	shadowContext.strokeStyle = linear;
	shadowContext.stroke();
	shadowContext.closePath();

	shadowCanvas.style.transform += 'rotate(' + (finished * 300 / 10000 - 240) + 'deg)';
}

//画七天步数
var sevenCanvas = document.querySelector('.bottom .seven');
sevenCanvas.width = width;
sevenCanvas.height = 100;
var sevenContext = sevenCanvas.getContext('2d');
sevenContext.lineWidth = 20;
sevenContext.lineCap = 'round';
sevenContext.strokeStyle = _chartConfig.finishedColor;

//得到最大值
var max = 0;
var count = 0;
_chartConfig.sevenFinished.map(function (item) {
	if (item.finished > max) {
		max = item.finished;
	}
	count += item.finished;
});
//平均值
var lav = count / _chartConfig.sevenFinished.length;
document.querySelector('.text2 span').innerText = Math.floor(lav);
//取得平均值水平线位置,(总高度60)
var lavHeight = 70 - lav / max * 60;
document.querySelector('.bottom .line').style.top = lavHeight + 'px';

//初始第一天x轴坐标
var x = 300 / 7 / 2;
//绘制每一天的步数
_chartConfig.sevenFinished.map(function (item) {
	//得到高度
	var itemHeight = item.finished / max * 60;
	if (item.finished > 0) {
		//绘制步数柱状图
		sevenContext.beginPath();
		sevenContext.moveTo(x, 70);
		sevenContext.lineTo(x, 70 - itemHeight);
		sevenContext.stroke();
		sevenContext.closePath();
	}

	//绘制步数文字
	sevenContext.textAlign = 'center';
	sevenContext.fillText(item.date, x, 90);
	//修改x轴坐标
	x += 300 / 7;
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//最近7天的步数
var sevenFinished = [{
	date: '20日',
	finished: 3360
}, {
	date: '21日',
	finished: 8768
}, {
	date: '22日',
	finished: 9876
}, {
	date: '23日',
	finished: 8768
}, {
	date: '24日',
	finished: 8642
}, {
	date: '25日',
	finished: 1352
}, {
	date: '26日',
	finished: 2389
}];
//走了步数的颜色
var finishedColor = '#68cbcd';
//未达到100步数的颜色
var unfinishedColor = '#9799f0';
exports.finishedColor = finishedColor;
exports.unfinishedColor = unfinishedColor;
exports.sevenFinished = sevenFinished;

/***/ })
/******/ ]);