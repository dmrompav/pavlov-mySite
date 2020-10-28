// !Получаем доступ ко всем элементам =====================
const
	arrowl	= document.querySelector('.arrow_left'),
	arrowr	= document.querySelector('.arrow_right'),
	hor		= document.querySelector('.horizontal'),
	allver	= document.querySelector('.allvertical'),
	ver		= document.querySelectorAll('.vertical'),
	horbut	= document.querySelectorAll('.horizontal__button'),
	group	= document.querySelectorAll('.group'),
	tapfield= document.querySelector('.tapfield'),
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



// !Индексирование все элементов по Х и У +  прочие элементы================
var
	hind	= 0,
	vind	= [0,0,0,0,0,0,0,0,0,0,0,0];
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
		allverlefttrans	= 200;
		hortoppos		= 30;
		allvertoppos	= 0;
		vertoptrans		= 100;
	}
	else {
		horleftpos		= 0.3 * vw,
		allverleftpos	= 0.3 * vw,
		horlefttrans	= 200,
		allverlefttrans	= 200;
		hortoppos		= 0.3 * vh;
		allvertoppos	= 0.3 * vh;
		vertoptrans		= 100;
	}
	console.log('Resized:' + ' horleftpos:' + horleftpos + '; allverleftpos:' + allverleftpos + '; horlefttrans:' + horlefttrans + 
	'; allverlefttrans:' + allverlefttrans + '; allvertoppos:' + allvertoppos + '; vertoptrans:' + vertoptrans);
	Htrans();
	Vtrans();
}



// !Действие ===========================================
for (let i = 0; i < horbut.length; i++) {
	horbut[i].onclick = Hclick;
}
for (let i = 0; i < ver.length; i++) {
	for (let j = 0; j < verbut[i].length; j++) {
		verbut[i][j].onclick = Vclick;
	}
}
arrowl.onclick = Aclick;
arrowr.onclick = Aclick;



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
					if (flip == 0) {document.body.style.background = "linear-gradient(#000 0%, #40407a 40%, #40407a 60%, #000 100%)";}
					if (flip == 1) {document.body.style.background = "linear-gradient(#000 0%, #b33939 40%, #b33939 60%, #000 100%)";}
				}
			}
			else {
				CallInfo();
			}
		}
	}
}
// *Клик по Arrows
function Aclick() {
	console.log (hind + ':' + vind[hind] + " - Aclick")
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
	tapfield.style.height					= "100vh";
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
	tapfield.onclick = CloseInfo;
	//Позволить свернуть info кликом сбоку
	document.querySelector('.close').onclick = CloseInfo;
}

function CloseInfo() {
	console.log('close info');
	scroll = true;
	group[hind].style.transform				= "scale(0)";
	info[hind][vind[hind]].style.transform	= "scale(0)";
	info[hind][vind[hind]].style.opacity	= "0";
	main.style.zIndex						= "0";
	tapfield.style.height					= "0";
	Vtrans();
	Htrans();
	hor.style.top							= hortoppos + 'px';
	allver.style.opacity					= 1;
	hor.style.opacity						= 1;
	document.querySelector('.close').remove();
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



// *Скроллинг ======================================================
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
			console.log(hind + ':' + vind[hind] + " - Scroll");
		}
	}
}
