var plane = document.getElementById('plane');
	target = document.getElementById('target');
	pointsContainer = document.getElementById('points');
	magazineContainer = document.getElementById('magazine'),
	endScreen = document.getElementById('end-screen'),
	points = 0;

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

var targetPace = 5,
	targetPos = 1,
	changeDirection = -1;

var border = {
	left: 0,
	top: window.innerHeight - 75,
	bottom: 0,
	right: window.innerWidth - 101
};

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
	magazine--;
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

			if(element.botPos > border.top - 80 && element.leftPos >= targetPos && element.leftPos <= targetPos + 100){
				hitTarget();
				bullets.shift();
				element.div.parentNode.removeChild(element.div);
			}
			if(element.botPos > border.top + 75){
				bullets.shift();
				element.div.parentNode.removeChild(element.div);
			}
		});
	}
}

function movingTarget(){
	var	targetBorder = {
			left: 0,
			right: border.right
	};

	if(targetPos >= targetBorder.right){
		targetPace *= changeDirection;
	} else if(targetPos <= targetBorder.left){
		targetPace *= changeDirection;
	}

	targetPos += targetPace;
	target.style.left = targetPos + 'px';
}

function hitTarget(){
	points++;
	target.src = 'img/Trump-hit.png';
	setTimeout(function(){
		target.src = 'img/Trump-normal.png'
	}, 400);
}

function updatingStats(){
	pointsContainer.innerHTML = 'Your points: ' + points;
	magazineContainer.innerHTML = 'Bullets left: ' + magazine;
}

window.addEventListener('load', function(){

	document.addEventListener('keydown', function(event){
		planeDirection(event.keyCode, true);
	}, false);

	document.addEventListener('keyup', function(event){
		planeDirection(event.keyCode, false);
		planeShooting(event.keyCode, true);
	}, false);

	var movingPlane = setInterval(function(){
		if(direction.left && planeLeft > border.left){
			planeLeft -= planePace;
		}
		if(direction.up && planeBottom < border.top/2){
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
		movingTarget();
		updatingStats();

		// GAME OVER
		if(points == 70 || magazine == 0){
			clearInterval(movingPlane);
			endScreen.style.display = 'block';
			if(points == 70){
				endScreen.innerHTML = 'YOU WON!';
			} else {
				endScreen.innerHTML = 'Sorry, you lost.';
			}
		}
	}, 1000/60)

	var shootingPlane = setInterval(function(){
		if(isShooting){
			shootBullet();
			isShooting = false;
		}
	}, 100);
}, false);