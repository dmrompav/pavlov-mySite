"use strict";

var hslider = document.querySelector('.horizontal');
var vslider = document.querySelectorAll('.vertical');
var hbutton = document.querySelectorAll('.horizontal__button');
var vbutton = [];

for (var i = 0; i < vslider.length; i++) {
  vbutton[i] = vslider[i].querySelectorAll('.vertical__button');
}

var hindex = 0;
var vindex = [0, 0, 0, 0, 0, 0, 0, 0];

for (var _i = 0; _i < hbutton.length; _i++) {
  hbutton[_i].addEventListener("click", Hclick, false);
}

function Hclick() {
  for (var _i2 = 0; _i2 < hbutton.length; _i2++) {
    if (hbutton[_i2] == this) {
      hindex = _i2;
      console.log(hindex + ";" + vindex[hindex] + " - Horizontal click");
    }
  }

  HclickMain();
}

function Vclick(event) {
  for (var _i3 = 0; _i3 < vbutton[hindex].length; _i3++) {
    if (vbutton[hindex][_i3] == this) {
      if (_i3 !== vindex[hindex]) {
        event.preventDefault();
        vindex[hindex] = _i3;
        console.log(hindex + ";" + vindex[hindex] + " - use button");
      }
    } else {
      console.log(hindex + ";" + vindex[hindex] + " - use button");
    }
  }

  VclickMain();
}

function HclickMain() {}

function VclickMain() {}