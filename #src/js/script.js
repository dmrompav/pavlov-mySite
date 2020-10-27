//Получаем доступ ко всем элементам
const
	arrowl	= document.querySelector('.arrow_left'),
	arrowr	= document.querySelector('.arrow_right'),
	hor		= document.querySelector('.horizontal'),
	allver	= document.querySelector('.allvertical'),
	ver		= document.querySelectorAll('.vertical'),
	horbut	= document.querySelectorAll('.horizontal__button'),
	group	= document.querySelectorAll('.group');

var
	verbut	= [],
	info	= [];

for (let i = 0; i < ver.length; i++) {
	verbut[i] 	= ver[i].querySelectorAll('.vertical__button');
}
for (let i = 0; i < group.length; i++) {
	info[i] 	= group[i].querySelectorAll('.info');
}



// Индексирование все элементов по Х и У
var
	hind	= 0,
	vind	= [0,0,0,0,0,0,0,0,0,0,0,0];



// Размеры и расстояния
var
	vw				= window.innerWidth,
	vh				= window.innerHeight,
	horleftpos,
	allverleftpos,
	horlefttrans,
	allverlefttrans,
	allvertoppos,
	vertoptrans;

Resize();
window.addEventListener('resize', Resize);
function Resize() {
	if (vw < 768) {
		horleftpos 		= 0;
		allverleftpos 	= 0;
		horlefttrans 	= vw;
		allverlefttrans	= 200;
		allvertoppos	= 0;
		vertoptrans		= 100;
	}
	else {
		horleftpos		= 0.3 * vw,
		allverleftpos	= 0.3 * vw,
		horlefttrans	= 200,
		allverlefttrans	= 200;
		allvertoppos	= 0.3 * vh;
		vertoptrans		= 100;
	}
	console.log('Resized:' + ' horleftpos:' + horleftpos + '; allverleftpos:' + allverleftpos + '; horlefttrans:' + horlefttrans + 
	'; allverlefttrans:' + allverlefttrans + '; allvertoppos:' + allvertoppos + '; vertoptrans:' + vertoptrans);
}



// Действие
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

// Задаём функции
function Hclick() {
	for (let i = 0; i < horbut.length; i++) {
		if (this == horbut[i]) {
			hind = i;
		}
	}
	Htrans();
	console.log(hind + ':' + vind[hind] + " - Hclick");
}

function Vclick() {
	for (let i = 0; i < verbut[hind].length; i++) {
		if (this == verbut[hind][i]) {
			vind[hind] = i;
		}
	}
	Vtrans();
	console.log(hind + ':' + vind[hind] + " - Vclick");
}

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
		arrowl.style.width = 0;
	}
	else if (hind == horbut.length - 1) {
		arrowr.style.width = 0;
	}
	else {
		arrowl.style.width = "20px";
		arrowr.style.width = "20px";
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
	let very =  - (vind[hind] * vertoptrans);
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