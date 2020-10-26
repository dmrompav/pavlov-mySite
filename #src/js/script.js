

var hslider = document.querySelector('.horizontal');
var vslider = document.querySelectorAll('.vertical'); 
var hbutton = document.querySelectorAll('.horizontal__button');
var vbutton = [];
for (let i = 0; i < vslider.length; i++) {
	vbutton[i] = vslider[i].querySelectorAll('.vertical__button');
}
var hindex = 0;
var vindex = [0,0,0,0,0,0,0,0];

for (let i = 0; i < hbutton.length; i++) {
	hbutton[i].addEventListener("click", Hclick, false);
}
function Hclick() {
	for (let i = 0; i < hbutton.length; i++) {
		if (hbutton[i] == this) {
			hindex = i;
			console.log(hindex + ";" + vindex[hindex] + " - Horizontal click")
		}
	}
	HclickMain();
}

function Vclick(event) {
	for (let i = 0; i < vbutton[hindex].length; i++) {
		if (vbutton[hindex][i] == this) {
			if (i !== vindex[hindex]) {
				event.preventDefault();
				vindex[hindex] = i;
				console.log(hindex + ";" + vindex[hindex] + " - use button");
			}
		}
		else {
			console.log(hindex + ";" + vindex[hindex] + " - use button");
		}
	}
	VclickMain();
}

function HclickMain() {

}

function VclickMain() {

}