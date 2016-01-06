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
		if(direction.left){
			planeLeft -= pace;
		}
		if(direction.up){
			planeBottom += pace;
		}
		if(direction.right){
			planeLeft += pace;
		}
		if(direction.down){
			planeBottom -= pace;
		}

		plane.style.left = planeLeft + 'px';
		plane.style.bottom = planeBottom + 'px';
	}, 1000/60)
}, false);