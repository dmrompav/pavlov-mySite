// ДОСТУП КО ВСЕМ ЭЛЕМЕНТАМ
// ДИНАМИЧ АДАПТИВ И РЕСАЙЗ
// ПЕРВЫЕ EVENT LISTENERS (CLICK)
// ФУНКЦИИ
	// сокращения: 
		// H - horizontal, 
		// V - vertical, 
		// A - arrows,
		// trans - перемещение;
// СКРОЛЛ
// SWIPES


// !Получаем доступ ко всем элементам =====================
const
	arrowl	= document.querySelector('.arrow_left'),
	arrowr	= document.querySelector('.arrow_right'),
	hor		= document.querySelector('.horizontal'),
	allver	= document.querySelector('.allvertical'),
	ver		= document.querySelectorAll('.vertical'),
	horbut	= document.querySelectorAll('.horizontal__button'),
	group	= document.querySelectorAll('.group'),
	tapfield= document.querySelectorAll('.tapfield'),
	main	= document.querySelector('.main');
var
	verbut	= [],
	info	= [];
for (let i = 0; i < ver.length; i++) {
	verbut[i] 	= ver[i].querySelectorAll('.vertical__button');
}
for (let i = 0; i < group.length; i++) {
	info[i] 	= group[i].querySelectorAll('.info');
}



// !Индексирование все элементов по Х и У + прочие элементы================
var
	hind	= 0,								//по горизонтали
	vind	= [0,0,0,0,0,0,0,0,0,0,0,0];		//по вертикали
var
	scroll	= true,
	flip	= 0;



// !Размеры и расстояния =================================
var
	vw				= window.innerWidth,
	vh				= window.innerHeight,
	horleftpos,
	allverleftpos,
	horlefttrans,
	allverlefttrans,
	hortoppos,
	allvertoppos,
	vertoptrans;

Resize();
window.addEventListener('resize', Resize);
function Resize() {
	vw	= window.innerWidth;
	vh	= window.innerHeight;
	if (vw < 768) {
		horleftpos 		= 0;
		allverleftpos 	= 0;
		horlefttrans 	= vw;
		allverlefttrans	= 150;
		hortoppos		= 30;
		allvertoppos	= 100;
		vertoptrans		= 100;
	}
	else {
		horleftpos		= 0.3 * vw;
		allverleftpos	= 0.3 * vw;
		horlefttrans	= 150;
		allverlefttrans	= 150;
		hortoppos		= 0.3 * vh;
		allvertoppos	= 0.3 * vh;
		vertoptrans		= 100;
	}
	// console.log('Resized:' + ' horleftpos:' + horleftpos + '; allverleftpos:' + allverleftpos + '; horlefttrans:' + horlefttrans + 
	// '; allverlefttrans:' + allverlefttrans + '; allvertoppos:' + allvertoppos + '; vertoptrans:' + vertoptrans);
	Htrans();
	Vtrans();
}



// !Действие ===========================================
for (let i = 0; i < horbut.length; i++) {
	horbut[i].addEventListener('click', Hclick, false);		//8 LISTENERS
}
for (let i = 0; i < ver.length; i++) {
	for (let j = 0; j < verbut[i].length; j++) {
		verbut[i][j].addEventListener('click', Vclick, false);		//a lot of LISTENERS
	}
}
// arrowl.addEventListener('click', Aclick, false);			//1
// arrowr.addEventListener('click', Aclick, false);			//1



// !Задаём функции =====================================
// *Клик по Horizontal buttons
function Hclick() {
	for (let i = 0; i < horbut.length; i++) {
		if (this == horbut[i]) {
			hind = i;
		}
	}
	Htrans();
	console.log(hind + ':' + vind[hind] + " - Hclick");
}
// *Клик по Vertical buttons
function Vclick(event) {
	if(isClick) {
		if (this !== verbut[hind][vind[hind]]) {
			event.preventDefault();
			for (let i = 0; i < verbut[hind].length; i++) {
				if (this == verbut[hind][i]) {
					vind[hind] = i;
				}
			}
			Vtrans();
			console.log(hind + ':' + vind[hind] + " - Vclick");
		}
		else {
			if(!this.classList.contains('typenoclick') && !this.classList.contains('typelink')) {
				if (this.classList.contains('typeflip')) {
					let f = this.querySelectorAll('.flip');
					if (flip == 0) {
						flip = 1;
						f[0].style.transform = "rotateY(180deg)";
						f[1].style.transform = "rotateY(360deg)";
					}
					else {
						flip = 0;
						f[0].style.transform = "rotateY(0deg)";
						f[1].style.transform = "rotateY(180deg)";
					}
					if (this.classList.contains('colortheme')) {
						if (flip == 0) {
							document.body.style.background = "linear-gradient(#000 0%, #b33939 40%, #b33939 60%, #000 100%)";
						}
						if (flip == 1) {
							document.body.style.background = "linear-gradient(#000 0%, #40407a 40%, #40407a 60%, #000 100%)";
						}
					}
				}
				else {
					CallInfo();
				}
			}
		}
	}
}
// *Клик по Arrows
function Aclick() {
	// console.log (hind + ':' + vind[hind] + " - Aclick")
	if (this == arrowl) {
		hind--;
		Htrans();
	}
	else if (this == arrowr) {
		hind++;
		Htrans();
	}
}

function Htrans() {
	//определим на сколько перемещать слайдеры
	let
		horx	= horleftpos - (hind * horlefttrans),
		allverx	= allverleftpos - (hind * allverlefttrans);
	// переместим
	hor.style.left = horx + 'px';
	allver.style.left = allverx + 'px';
	// выделим выбранную кнопку
	for (let i = 0; i < horbut.length; i++) {
		horbut[i].classList.remove('horizontal__selected');
		horbut[i].classList.add('horizontal__selectable');
	}
	horbut[hind].classList.remove('horizontal__selectable');
	horbut[hind].classList.add('horizontal__selected');
	// нужны ли стрелки?
	if (hind == 0) {
		arrowl.style.width		= 0;
	}
	else if (hind == horbut.length - 1) {
		arrowr.style.width		= 0;
	}
	else {
		arrowl.style.width		= "20px";
		arrowr.style.width		= "20px";
	}
	// выберем другой вертикальный слайдер
	for (let i = 0; i < ver.length; i++) {
		ver[i].style.opacity	= 0;
		ver[i].style.width		= 0;
	}
	ver[hind].style.opacity		= 1;
	ver[hind].style.width 		= "auto";
}
function Vtrans() {
	//определим на сколько перемещать слайдеры
	let very = 0 - (vind[hind] * vertoptrans);
	// переместим
	ver[hind].style.top = very + 'px';
	// выделим выбранную кнопку
	for (let i = 0; i < verbut[hind].length; i++) {
		verbut[hind][i].classList.remove('vertical__selected');
		verbut[hind][i].classList.add('vertical__selectable');
	}
	verbut[hind][vind[hind]].classList.remove('vertical__selectable');
	verbut[hind][vind[hind]].classList.add('vertical__selected');
}
function CallInfo() {
	//Запретить скролл
	scroll = false;
	//Развернуть Info
	group[hind].style.transform				= "scale(1)";
	info[hind][vind[hind]].style.transform	= "scale(1)";
	info[hind][vind[hind]].style.opacity	= "1";
	main.style.zIndex						= "30";
	tapfield[hind].style.height					= "100vh";
	//Скрыть Hor и Ver buttons
	allver.style.left						= -vw + 'px';
	hor.style.top							= -vh + 'px';
	allver.style.opacity					= 0;
	hor.style.opacity						= 0;
	// Добавить крестик
	let close = document.createElement('div');													//Вставить крестик в контент
	close.className = "close";
	close.innerHTML = "X";
	info[hind][vind[hind]].prepend(close);
	arrowl.style.width		= "0px";
	arrowr.style.width		= "0px";
	//Позволить свернуть info кликом сбоку
	tapfield[hind].addEventListener('click', CloseInfo, false);
	//Позволить свернуть info крестиком
	document.querySelector('.close').addEventListener('click', CloseInfo, false);
}

function CloseInfo() {
	// console.log('close info');
	tapfield[hind].removeEventListener('click', CloseInfo, false);
	//разрешить скролл
	scroll = true;
	//свернуть info
	group[hind].style.transform				= "scale(0)";
	info[hind][vind[hind]].style.transform	= "scale(0)";
	info[hind][vind[hind]].style.opacity	= "0";
	main.style.zIndex						= "0";
	tapfield[hind].style.height					= "0";
	//вернуть слайдеры
	Vtrans();
	Htrans();
	hor.style.top							= hortoppos + 'px';
	allver.style.opacity					= 1;
	hor.style.opacity						= 1;
	//убрать крестик
	document.querySelector('.close').removeEventListener('click', CloseInfo, false);
	document.querySelector('.close').remove();
	//вернуть стрелки
	arrowl.style.width		= "20px";
	arrowr.style.width		= "20px";
	if (hind == 0) {
		arrowl.style.width		= 0;
	}
	else if (hind == horbut.length - 1) {
		arrowr.style.width		= 0;
	}
	else {
		arrowl.style.width		= "20px";
		arrowr.style.width		= "20px";
	}
}



// !Скроллинг ======================================================
const d = document;
if (d.addEventListener) {
	if ('onwheel' in document) {
		d.addEventListener("wheel", onWheel);				// IE9+, FF17+, Ch31+
	} else if ('onmousewheel' in document) {
		d.addEventListener("mousewheel", onWheel);			// устаревший вариант события
	} else {
		d.addEventListener("MozMousePixelScroll", onWheel);	// Firefox < 17
	}
} else {
	d.attachEvent("onmousewheel", onWheel);					// IE8-
}
function onWheel(e) {
	if (scroll) {
		let delta = e.deltaY || e.detail || e.wheelDelta;
		if (verbut[hind].length > 1) {
			if (vind[hind] < 1) {
				if (delta > 0) { vind[hind]++ }
			}
			else if (vind[hind] < verbut[hind].length - 1) {
				if (delta > 0) { vind[hind]++ }
				else { vind[hind]-- }
			}
			else {
				if (delta < 0) { vind[hind]-- }
			}
			Vtrans();
			// console.log(hind + ':' + vind[hind] + " - Scroll");
		}
	}
}



// !!!Mouse SWIPE ========================================================
document.addEventListener('mousedown', Swipe, false);
document.addEventListener('mousemove', MouseMove, false);


var X, Y, hind0, vind0, x0, y0, x, y,
	horswi, verswi,
	swipeInterval1,
	swipeInterval2,
	swi = 100,
	isClick = true,
	swiTarget = 0;

function MouseMove(e) {
	X = e.pageX;
	Y = e.pageY;
}
function Swipe(e) {
	isClick = true;
	hind0 = hind;
	vind0 = vind[hind];
	x0 = X;
	y0 = Y;
	// определяем является ли движение по экрану свайпом и стоит ли запретить клики
	swipeInterval1 = setInterval(() => {
		x = X;
		y = Y;
		horswi	= x-x0;
		verswi	= y-y0;
		// console.log(horswi);
		if(horswi > (swi/2) || horswi < -(swi/2) || verswi > (swi/2) || verswi < -(swi/2)) {
			isClick = false;
			if (Math.abs(horswi) > Math.abs(verswi)) {
				swiTarget = "hor";
				console.log('horizontal swipe');
			}
			else {
				swiTarget = "ver";
				console.log('vertical swipe');
			}
		}
	}, 50)
	// 
	swipeInterval2 = setInterval(() => {
		if (swiTarget !== 0) {
			clearInterval(swipeInterval1);
			if (swiTarget == "hor") {
				let ind, indtrans;
				indtrans = (horswi - horswi % swi) / swi;
				ind = hind0 - indtrans;
				// console.log(indtrans);
				if (ind <= 0) {hind = 0}
				else if (ind > horbut.length - 1) {hind = horbut.length - 1}
				else {hind = ind}
				Htrans();
				x = X;
				horswi	= x-x0;
			}
			else {
				let ind, indtrans;
				indtrans = (verswi - verswi % swi) / swi;
				ind = vind0 - indtrans;
				// console.log(vind0);
				if (ind <= 0) {vind[hind] = 0}
				else if (ind > verbut[hind].length - 1) {vind[hind] = verbut[hind].length - 1}
				else {vind[hind] = ind}
				Vtrans();
				y = Y;
				verswi	= y-y0;
			}
		}
	}, 50)
	document.addEventListener('mouseup', EndSwipe, false);
}

function EndSwipe() {
	clearInterval(swipeInterval1);
	clearInterval(swipeInterval2);
	swiTarget = 0;
	
}


// !!!Touch SWIPE ========================================================
document.addEventListener('touchstart', TouchStart, false);
document.addEventListener('touchmove', TouchMove, false);
document.addEventListener('touchend', TouchEnd, false);

function TouchStart(event) {
	x0 = event.touches[0].pageX;
	y0 = event.touches[0].pageY;
	console.log(x0 + ':' + y0);
	isClick = true;
	hind0 = hind;
	vind0 = vind[hind];
}
function TouchMove(event) {
	event.preventDefault();
	X = event.changedTouches[0].pageX;
	Y = event.changedTouches[0].pageY;
	console.log(X + ':' + Y);
	horswi	= X-x0;
	verswi	= Y-y0;
	if(horswi > (swi/2) || horswi < -(swi/2) || verswi > (swi/2) || verswi < -(swi/2)) {
		isClick = false;
		if (Math.abs(horswi) > Math.abs(verswi)) {
			swiTarget = "hor";
			console.log('horizontal swipe');
		}
		else {
			swiTarget = "ver";
			console.log('vertical swipe');
		}
	}
	if (swiTarget !== 0) {
		if (swiTarget == "hor") {
			let ind, indtrans;
			indtrans = (horswi - horswi % swi) / swi;
			ind = hind0 - indtrans;
			// console.log(indtrans);
			if (ind <= 0) {hind = 0}
			else if (ind > horbut.length - 1) {hind = horbut.length - 1}
			else {hind = ind}
			Htrans();
			x = X;
			horswi	= x-x0;
		}
		else {
			let ind, indtrans;
			indtrans = (verswi - verswi % (swi * 0.5)) / (swi * 0.5);
			ind = vind0 - indtrans;
			// console.log(vind0);
			if (ind <= 0) {vind[hind] = 0}
			else if (ind > verbut[hind].length - 1) {vind[hind] = verbut[hind].length - 1}
			else {vind[hind] = ind}
			Vtrans();
			y = Y;
			verswi	= y-y0;
		}
	}
}
function TouchEnd(event) {
	swiTarget = 0;
}