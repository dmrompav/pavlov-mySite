"use strict";

//Получаем доступ ко всем элементам
var arrowl = document.querySelector('.arrow_left'),
    arrowr = document.querySelector('.arrow_right'),
    hor = document.querySelector('.horizontal'),
    allver = document.querySelector('.allvertical'),
    ver = document.querySelectorAll('.vertical'),
    horbut = document.querySelectorAll('.horizontal__button'),
    group = document.querySelectorAll('.group');
var verbut = [],
    info = [];

for (var i = 0; i < ver.length; i++) {
  verbut[i] = ver[i].querySelectorAll('.vertical__button');
}

for (var _i = 0; _i < group.length; _i++) {
  info[_i] = group[_i].querySelectorAll('.info');
} // Индексирование все элементов по Х и У


var hind = 0,
    vind = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Размеры и расстояния

var vw = window.innerWidth,
    vh = window.innerHeight,
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
    horleftpos = 0;
    allverleftpos = 0;
    horlefttrans = vw;
    allverlefttrans = 200;
    allvertoppos = 0;
    vertoptrans = 100;
  } else {
    horleftpos = 0.3 * vw, allverleftpos = 0.3 * vw, horlefttrans = 200, allverlefttrans = 200;
    allvertoppos = 0.3 * vh;
    vertoptrans = 100;
  }

  console.log('Resized:' + ' horleftpos:' + horleftpos + '; allverleftpos:' + allverleftpos + '; horlefttrans:' + horlefttrans + '; allverlefttrans:' + allverlefttrans + '; allvertoppos:' + allvertoppos + '; vertoptrans:' + vertoptrans);
} // Действие


for (var _i2 = 0; _i2 < horbut.length; _i2++) {
  horbut[_i2].onclick = Hclick;
}

for (var _i3 = 0; _i3 < ver.length; _i3++) {
  for (var j = 0; j < verbut[_i3].length; j++) {
    verbut[_i3][j].onclick = Vclick;
  }
}

arrowl.onclick = Aclick;
arrowr.onclick = Aclick; // Задаём функции

function Hclick() {
  for (var _i4 = 0; _i4 < horbut.length; _i4++) {
    if (this == horbut[_i4]) {
      hind = _i4;
    }
  }

  Htrans();
  console.log(hind + ':' + vind[hind] + " - Hclick");
}

function Vclick() {
  for (var _i5 = 0; _i5 < verbut[hind].length; _i5++) {
    if (this == verbut[hind][_i5]) {
      vind[hind] = _i5;
    }
  }

  Vtrans();
  console.log(hind + ':' + vind[hind] + " - Vclick");
}

function Aclick() {
  console.log(hind + ':' + vind[hind] + " - Aclick");

  if (this == arrowl) {
    hind--;
    Htrans();
  } else if (this == arrowr) {
    hind++;
    Htrans();
  }
}

function Htrans() {
  //определим на сколько перемещать слайдеры
  var horx = horleftpos - hind * horlefttrans,
      allverx = allverleftpos - hind * allverlefttrans; // переместим

  hor.style.left = horx + 'px';
  allver.style.left = allverx + 'px'; // выделим выбранную кнопку

  for (var _i6 = 0; _i6 < horbut.length; _i6++) {
    horbut[_i6].classList.remove('horizontal__selected');

    horbut[_i6].classList.add('horizontal__selectable');
  }

  horbut[hind].classList.remove('horizontal__selectable');
  horbut[hind].classList.add('horizontal__selected'); // нужны ли стрелки?

  if (hind == 0) {
    arrowl.style.width = 0;
  } else if (hind == horbut.length - 1) {
    arrowr.style.width = 0;
  } else {
    arrowl.style.width = "20px";
    arrowr.style.width = "20px";
  } // выберем другой вертикальный слайдер


  for (var _i7 = 0; _i7 < ver.length; _i7++) {
    ver[_i7].style.opacity = 0;
    ver[_i7].style.width = 0;
  }

  ver[hind].style.opacity = 1;
  ver[hind].style.width = "auto";
}

function Vtrans() {
  //определим на сколько перемещать слайдеры
  var very = -(vind[hind] * vertoptrans); // переместим

  ver[hind].style.top = very + 'px'; // выделим выбранную кнопку

  for (var _i8 = 0; _i8 < verbut[hind].length; _i8++) {
    verbut[hind][_i8].classList.remove('vertical__selected');

    verbut[hind][_i8].classList.add('vertical__selectable');
  }

  verbut[hind][vind[hind]].classList.remove('vertical__selectable');
  verbut[hind][vind[hind]].classList.add('vertical__selected');
}