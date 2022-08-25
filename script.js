let catRun = document.querySelector('.cat');
let catImg = document.querySelector('.cat-image');
let controlsCat = document.querySelectorAll('.button');
let menuButton = document.querySelector('.menu');
let parameters = document.querySelector('.parameters');
let speedCat = document.querySelector('.speed-cat');
let realSpeed = document.querySelector('.real-speed');
let newSpeed = document.querySelector('.new-speed');
let titleCounter = document.querySelector('.title-counter');
let corners = document.querySelector('.count-corners');
let cornersInput = document.querySelector('.max-corners');
let catRoad = document.querySelector('.cat-road');
let starsCanvas = document.querySelector('#stars');
let timesRadio = document.querySelectorAll('.time');
let balls = document.querySelectorAll('.ball');
let switchButtonStart, catRezerse;
let i = 0;
let cornersMax = 0;
let countCorners = 0;
const screenWidth = window.screen.width;

const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

window.addEventListener('resize', resizeCanvas, false);
context = starsCanvas.getContext("2d"), stars = screenWidth / 10;

function resizeCanvas() {
	starsCanvas.width = window.innerWidth;
	starsCanvas.height = window.innerHeight - 300;
	drawStuff();
}

resizeCanvas();

function drawStuff() {
	for (let j = 0; j < stars; j++) {
		x = Math.random() * starsCanvas.offsetWidth;
		y = Math.random() * starsCanvas.offsetHeight, 
		radius = Math.random() * 1.2;
		context.beginPath();
		context.arc(x, y, radius, 0, 360);
		context.fillStyle = "white";
		context.fill();
	}
}


const goCat = async () => {
	if (switchButtonStart) {
		if (!catRezerse) {

			for (i; i < screenWidth - 160; i += 2) {
				if (!switchButtonStart || countCorners === cornersMax && cornersMax !== 0) {
					stopCat();
					break;
				}
				catImg.classList.remove('cat-reverse');
				catRun.style.transform = 'translate(' + i + 'px, 0)';
				newSpeed.textContent = i;
				await sleep(-(+speedCat.value - 10));
			}
			if (switchButtonStart) {
				reverseCat();
			}

		} else {

			for (i; i > 0; i -= 2) {
				if (!switchButtonStart || countCorners === cornersMax && cornersMax !== 0) {
					stopCat();
					break;
				}
				catImg.classList.add('cat-reverse');
				catRun.style.transform = 'translate(' + i + 'px, 0)';
				newSpeed.textContent = i;
				await sleep(-(+speedCat.value - 10));
			}
			if (switchButtonStart) {
				reverseCat();
			}

		}
	}
}

function startCat() {
	cornersInput.setAttribute('disabled', '');
	controlsCat[0].textContent = 'Стоп';
	titleCounter.textContent = 'Развороты: ';
	catImg.src = '/images/cat_walk.gif';
	switchButtonStart = true;
	corners.textContent = countCorners;
}

function reverseCat() {
	corners.textContent = ++countCorners;
	(!catRezerse) ? catRezerse = true : catRezerse = false;
	goCat();
}

function stopCat() {
	if (countCorners === cornersMax && cornersMax !== 0) resetCat();
	controlsCat[0].textContent = 'Cтарт';
	catImg.src = '/images/cat_walk_no_anim.gif';
	switchButtonStart = false;
}

function resetCat() {
	cornersInput.removeAttribute('disabled', '');
	catRezerse = false;
	switchButtonStart = false;
	i = 0;
	catRun.style.transform = 'translate(0px, 0)';
	controlsCat[0].textContent = 'Cтарт';
	titleCounter.textContent = 'Развороты: ';
	catImg.src = 'cat_walk_no_anim.gif';
	catImg.classList.remove('cat-reverse');
	newSpeed.textContent = 0;
	corners.textContent = 0;
	cornersInput.value = 0;
	if (countCorners === cornersMax && cornersMax !== 0) {
		titleCounter.textContent = 'Разворотов: ';
		corners.textContent = cornersMax;
	}
	countCorners = 0;
	cornersMax = 0;
}

controlsCat[0].onclick = function () {
	if (!switchButtonStart) {
		startCat();
		goCat();
	} else {
		stopCat();
		goCat();
	}
}


controlsCat[1].onclick = function () {
	resetCat();
}

speedCat.oninput = function () {
	realSpeed.textContent = speedCat.value;
}

cornersInput.onchange = function () {
	cornersMax = +cornersInput.value;
}

for (let time of timesRadio) {
	time.onclick = function () {

		for (let setAttr of timesRadio) setAttr.setAttribute('disabled', '');

		setTimeout(radio_enabled, 5000);

		if (time.value === 'night_time') {
			balls[0].classList.remove('sun-sunrise');
			balls[1].classList.remove('moon-sunrise');
			catRoad.classList.remove('sky-sunrise');
			balls[0].classList.add('sun-sunset');
			balls[1].classList.add('moon-sunset');
			catRoad.classList.add('sky-sunset');
		} else {
			balls[0].classList.remove('sun-sunset');
			balls[1].classList.remove('moon-sunset');
			catRoad.classList.remove('sky-sunset');
			balls[0].classList.add('sun-sunrise');
			balls[1].classList.add('moon-sunrise');
			catRoad.classList.add('sky-sunrise');
		}
	}

}

function radio_enabled() {
	for (let time of timesRadio) time.removeAttribute('disabled', '');
}

menuButton.onclick = function() {
	menuButton.classList.toggle('open');
	if (menuButton.classList.contains('open')) {
		parameters.style.transform = 'translate(0px, 50px)';
	} else {
		parameters.style.transform = null;
	}
}