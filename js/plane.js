var plane = document.getElementById('plane');

var planeLeft = screen.availWidth/2 - 50;
plane.style.left = planeLeft + 'px';
var planeBottom = 0;
plane.style.bottom = planeBottom + 'px';

var pace = 3;
var direction = {
	left: false,
	up: false,
	right: false,
	down: false
};

var border = {
	left: 0,
	top: window.innerHeight - 75,
	bottom: 0,
	right: window.innerWidth - 101
}

function planeDirection(key, bool){
	switch(key){
		case 37:
			direction.left = bool;
			break;
		case 38:
			direction.up = bool;
			break;
		case 39:
			direction.right = bool;
			break;
		case 40:
			direction.down = bool;
			break;
		default:
			break;
	}
}

window.addEventListener('load', function(){

	document.addEventListener('keydown', function(event){
		planeDirection(event.keyCode, true);
	}, false);

	document.addEventListener('keyup', function(event){
		planeDirection(event.keyCode, false);
	}, false);

	setInterval(function(){
		if(direction.left && planeLeft > border.left){
			planeLeft -= pace;
		}
		if(direction.up && planeBottom < border.top){
			planeBottom += pace;
		}
		if(direction.right && planeLeft < border.right){
			planeLeft += pace;
		}
		if(direction.down && planeBottom > border.bottom){
			planeBottom -= pace;
		}

		plane.style.left = planeLeft + 'px';
		plane.style.bottom = planeBottom + 'px';
	}, 1000/60)
}, false);