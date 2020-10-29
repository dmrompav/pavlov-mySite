"use strict";

// ДОСТУП КО ВСЕМ ЭЛЕМЕНТАМ
// ДИНАМИЧ АДАПТИВ И РЕСАЙЗ
// ПЕРВЫЕ EVENT LISTENERS (CLICK)
// ФУНКЦИИ
// сокращения: 
// H - horizontal, 
// V - vertical, 
// A - arrowl,
// trans - перемещение;
// СКРОЛЛ
// !Получаем доступ ко всем элементам =====================
var arrowl = document.querySelector('.arrow_left'),
    arrowr = document.querySelector('.arrow_right'),
    hor = document.querySelector('.horizontal'),
    allver = document.querySelector('.allvertical'),
    ver = document.querySelectorAll('.vertical'),
    horbut = document.querySelectorAll('.horizontal__button'),
    group = document.querySelectorAll('.group'),
    tapfield = document.querySelectorAll('.tapfield'),
    main = document.querySelector('.main');
var verbut = [],
    info = [];

for (var i = 0; i < ver.length; i++) {
  verbut[i] = ver[i].querySelectorAll('.vertical__button');
}

for (var _i = 0; _i < group.length; _i++) {
  info[_i] = group[_i].querySelectorAll('.info');
} // !Индексирование все элементов по Х и У + прочие элементы================


var hind = 0,
    //по горизонтали
vind = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //по вертикали

var scroll = true,
    flip = 0; // !Размеры и расстояния =================================

var vw = window.innerWidth,
    vh = window.innerHeight,
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
  vw = window.innerWidth;
  vh = window.innerHeight;

  if (vw < 768) {
    horleftpos = 0;
    allverleftpos = 0;
    horlefttrans = vw;
    allverlefttrans = 150;
    hortoppos = 30;
    allvertoppos = 0;
    vertoptrans = 100;
  } else {
    horleftpos = 0.3 * vw;
    allverleftpos = 0.3 * vw;
    horlefttrans = 150;
    allverlefttrans = 150;
    hortoppos = 0.3 * vh;
    allvertoppos = 0.3 * vh;
    vertoptrans = 100;
  } // console.log('Resized:' + ' horleftpos:' + horleftpos + '; allverleftpos:' + allverleftpos + '; horlefttrans:' + horlefttrans + 
  // '; allverlefttrans:' + allverlefttrans + '; allvertoppos:' + allvertoppos + '; vertoptrans:' + vertoptrans);


  Htrans();
  Vtrans();
} // !Действие ===========================================


for (var _i2 = 0; _i2 < horbut.length; _i2++) {
  horbut[_i2].addEventListener('click', Hclick, false); //8 LISTENERS

}

Vlistener(); //A FEW LISTENERS

arrowl.addEventListener('click', Aclick, false); //1

arrowr.addEventListener('click', Aclick, false); //1
// !Задаём функции =====================================
// ?Установить listener:

function Vlistener() {
  for (var _i3 = 0; _i3 < verbut[hind].length; _i3++) {
    verbut[hind][_i3].addEventListener('click', Vclick, false);
  }
}

function DelVlistener() {
  for (var _i4 = 0; _i4 < verbut[hind].length; _i4++) {
    verbut[hind][_i4].removeEventListener('click', Vclick, false);
  }
} // *Клик по Horizontal buttons


function Hclick() {
  DelVlistener();

  for (var _i5 = 0; _i5 < horbut.length; _i5++) {
    if (this == horbut[_i5]) {
      hind = _i5;
    }
  }

  Vlistener();
  Htrans();
  console.log(hind + ':' + vind[hind] + " - Hclick");
} // *Клик по Vertical buttons


function Vclick(event) {
  if (this !== verbut[hind][vind[hind]]) {
    event.preventDefault();

    for (var _i6 = 0; _i6 < verbut[hind].length; _i6++) {
      if (this == verbut[hind][_i6]) {
        vind[hind] = _i6;
      }
    }

    Vtrans();
    console.log(hind + ':' + vind[hind] + " - Vclick");
  } else {
    if (!this.classList.contains('typenoclick') && !this.classList.contains('typelink')) {
      if (this.classList.contains('typeflip')) {
        var f = this.querySelectorAll('.flip');

        if (flip == 0) {
          flip = 1;
          f[0].style.transform = "rotateY(180deg)";
          f[1].style.transform = "rotateY(360deg)";
        } else {
          flip = 0;
          f[0].style.transform = "rotateY(0deg)";
          f[1].style.transform = "rotateY(180deg)";
        }

        if (this.classList.contains('colortheme')) {
          if (flip == 0) {
            document.body.style.background = "linear-gradient(#000 0%, #40407a 40%, #40407a 60%, #000 100%)";
          }

          if (flip == 1) {
            document.body.style.background = "linear-gradient(#000 0%, #b33939 40%, #b33939 60%, #000 100%)";
          }
        }
      } else {
        CallInfo();
      }
    }
  }
} // *Клик по Arrows


function Aclick() {
  DelVlistener(); // console.log (hind + ':' + vind[hind] + " - Aclick")

  if (this == arrowl) {
    hind--;
    Htrans();
  } else if (this == arrowr) {
    hind++;
    Htrans();
  }

  Vlistener();
}

function Htrans() {
  //определим на сколько перемещать слайдеры
  var horx = horleftpos - hind * horlefttrans,
      allverx = allverleftpos - hind * allverlefttrans; // переместим

  hor.style.left = horx + 'px';
  allver.style.left = allverx + 'px'; // выделим выбранную кнопку

  for (var _i7 = 0; _i7 < horbut.length; _i7++) {
    horbut[_i7].classList.remove('horizontal__selected');

    horbut[_i7].classList.add('horizontal__selectable');
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


  for (var _i8 = 0; _i8 < ver.length; _i8++) {
    ver[_i8].style.opacity = 0;
    ver[_i8].style.width = 0;
  }

  ver[hind].style.opacity = 1;
  ver[hind].style.width = "auto";
}

function Vtrans() {
  //определим на сколько перемещать слайдеры
  var very = 0 - vind[hind] * vertoptrans; // переместим

  ver[hind].style.top = very + 'px'; // выделим выбранную кнопку

  for (var _i9 = 0; _i9 < verbut[hind].length; _i9++) {
    verbut[hind][_i9].classList.remove('vertical__selected');

    verbut[hind][_i9].classList.add('vertical__selectable');
  }

  verbut[hind][vind[hind]].classList.remove('vertical__selectable');
  verbut[hind][vind[hind]].classList.add('vertical__selected');
}

function CallInfo() {
  //Запретить скролл
  scroll = false; //Развернуть Info

  group[hind].style.transform = "scale(1)";
  info[hind][vind[hind]].style.transform = "scale(1)";
  info[hind][vind[hind]].style.opacity = "1";
  main.style.zIndex = "30";
  tapfield[hind].style.height = "100vh"; //Скрыть Hor и Ver buttons

  allver.style.left = -vw + 'px';
  hor.style.top = -vh + 'px';
  allver.style.opacity = 0;
  hor.style.opacity = 0; // Добавить крестик

  var close = document.createElement('div'); //Вставить крестик в контент

  close.className = "close";
  close.innerHTML = "X";
  info[hind][vind[hind]].prepend(close);
  arrowl.style.width = "0px";
  arrowr.style.width = "0px"; //Позволить свернуть info кликом сбоку

  tapfield[hind].addEventListener('click', CloseInfo, false); //Позволить свернуть info крестиком

  document.querySelector('.close').addEventListener('click', CloseInfo, false);
}

function CloseInfo() {
  // console.log('close info');
  tapfield[hind].removeEventListener('click', CloseInfo, false); //разрешить скролл

  scroll = true; //свернуть info

  group[hind].style.transform = "scale(0)";
  info[hind][vind[hind]].style.transform = "scale(0)";
  info[hind][vind[hind]].style.opacity = "0";
  main.style.zIndex = "0";
  tapfield[hind].style.height = "0"; //вернуть слайдеры

  Vtrans();
  Htrans();
  hor.style.top = hortoppos + 'px';
  allver.style.opacity = 1;
  hor.style.opacity = 1; //убрать крестик

  document.querySelector('.close').removeEventListener('click', CloseInfo, false);
  document.querySelector('.close').remove(); //вернуть стрелки

  arrowl.style.width = "20px";
  arrowr.style.width = "20px";

  if (hind == 0) {
    arrowl.style.width = 0;
  } else if (hind == horbut.length - 1) {
    arrowr.style.width = 0;
  } else {
    arrowl.style.width = "20px";
    arrowr.style.width = "20px";
  }
} // *Скроллинг ======================================================


var d = document;

if (d.addEventListener) {
  if ('onwheel' in document) {
    d.addEventListener("wheel", onWheel); // IE9+, FF17+, Ch31+
  } else if ('onmousewheel' in document) {
    d.addEventListener("mousewheel", onWheel); // устаревший вариант события
  } else {
    d.addEventListener("MozMousePixelScroll", onWheel); // Firefox < 17
  }
} else {
  d.attachEvent("onmousewheel", onWheel); // IE8-
}

function onWheel(e) {
  if (scroll) {
    var delta = e.deltaY || e.detail || e.wheelDelta;

    if (verbut[hind].length > 1) {
      if (vind[hind] < 1) {
        if (delta > 0) {
          vind[hind]++;
        }
      } else if (vind[hind] < verbut[hind].length - 1) {
        if (delta > 0) {
          vind[hind]++;
        } else {
          vind[hind]--;
        }
      } else {
        if (delta < 0) {
          vind[hind]--;
        }
      }

      Vtrans(); // console.log(hind + ':' + vind[hind] + " - Scroll");
    }
  }
}