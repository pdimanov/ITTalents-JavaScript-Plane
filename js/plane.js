var plane = document.getElementById('plane');

var planeLeft = window.innerWidth/2 - 50;
plane.style.left = planeLeft + 'px';
var planeBottom = 0;
plane.style.bottom = planeBottom + 'px';

var planePace = 3,
	direction = {
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

var isShooting = false,
	bullets = [],
	magazine = 100,
	bulletPace = 10;

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

function planeShooting(key, bool){
	if(key == 32){
		isShooting = bool;
	}
}

function shootBullet(){
	var bullet = {
		div: document.createElement('div'),
		leftPos: planeLeft + 49,
		botPos: planeBottom + 76,
	}
	bullet.div.className = 'bullet';

	bullet.div.style.left = bullet.leftPos + 'px';
	bullet.div.style.bottom = bullet.botPos + 'px';

	bullets.push(bullet);
	document.body.appendChild(bullet.div);
}

function updatingBullets(){
	if(bullets.length){
		bullets.forEach(function(element){
			element.botPos += bulletPace;
			element.div.style.bottom = element.botPos + 'px';

			if(element.botPos > border.top + 75){
				bullets.shift();
				element.div.parentNode.removeChild(element.div);
			}
		});
	}
}

window.addEventListener('load', function(){

	document.addEventListener('keydown', function(event){
		planeDirection(event.keyCode, true);
	}, false);

	document.addEventListener('keyup', function(event){
		planeDirection(event.keyCode, false);
		planeShooting(event.keyCode, true);
	}, false);

	setInterval(function(){
		if(direction.left && planeLeft > border.left){
			planeLeft -= planePace;
		}
		if(direction.up && planeBottom < border.top){
			planeBottom += planePace;
		}
		if(direction.right && planeLeft < border.right){
			planeLeft += planePace;
		}
		if(direction.down && planeBottom > border.bottom){
			planeBottom -= planePace;
		}

		plane.style.left = planeLeft + 'px';
		plane.style.bottom = planeBottom + 'px';

		updatingBullets();
	}, 1000/60)

	setInterval(function(){
		if(isShooting){
			shootBullet();
			console.log('shooting');
			isShooting = false;
		}
	}, 100);
}, false);