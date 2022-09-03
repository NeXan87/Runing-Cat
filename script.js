"use script"

let menuButton = document.querySelector('.menu');
let parameters = document.querySelector('.parameters');
let catRun = document.querySelector('.cat');
let catImg = document.querySelector('.cat-image');
let controlsCat = document.querySelectorAll('.button');
let speedCat = document.querySelector('.speed-cat');
let realSpeed = document.querySelector('.real-speed');
let newSpeed = document.querySelector('.new-speed');
let titleCounter = document.querySelector('.title-counter');
let undes = document.querySelector('.count-undes');
let undesInput = document.querySelector('.max-undes');
let catRoad = document.querySelector('.cat-road');
let progressBar = document.querySelector('.progress-bar');
let progress = document.querySelector('.progress');
let progressStatus = document.querySelector('.progress-status');
let starsCanvas = document.querySelector('#stars');
let timesRadio = document.querySelectorAll('.time');
let switchButtonStart, catRezerse, interval;
let coordinateX = undesCount = 0;
const screenWidth = window.screen.width;

// Отслеживание размена экрана для тега <canvas>
window.addEventListener('resize', resizeCanvas, false);
context = starsCanvas.getContext("2d"), stars = screenWidth / 10;

function resizeCanvas() {
	starsCanvas.width = window.innerWidth;
	starsCanvas.height = window.innerHeight - 300;
	showStars();
}
resizeCanvas();

// Функция расчета звезд
function showStars() {
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

// Функция движения кота
function translateCat() {
	calcProgress();
	if (undesCount !== +undesInput.value || +undesInput.value === 0) {
		if (!catRezerse) {
			catRun.style.transform = `translateX(${coordinateX += 2}px`;
			if (coordinateX === screenWidth - 160) reverseCat();
		} else {
			catRun.style.transform = `translateX(${coordinateX -= 2}px`;
			if (coordinateX === 0) reverseCat();
		}
		newSpeed.textContent = coordinateX;
	} else {
		stopCat();
	}
}

// Функция расчета прогресса в процентах
function calcProgress() {
	if (+undesInput.value !== 0) {
		progressBar.style.top = '6px';
		progress.value = Math.round(undesCount / +undesInput.value * 100);
		progressStatus.textContent = `${progress.value}%`;
	} else {
		progressBar.style.top = null;
		progress.value = 0;
		progressStatus.textContent = '0%';
	}
}

// Функция реверса кота
function reverseCat() {
	undes.textContent = ++undesCount;
	if (!catRezerse) {
		catRezerse = true;
		catImg.classList.add('cat-reverse');
	} else {
		catRezerse = false;
		catImg.classList.remove('cat-reverse');
	}
}

// Функция старта кота
function startCat() {
	interval = setInterval(translateCat, Math.abs(+speedCat.value - 10));
	undesInput.setAttribute('disabled', '');
	speedCat.setAttribute('disabled', '');
	controlsCat[0].textContent = 'Стоп';
	titleCounter.textContent = 'Развороты: ';
	catImg.src = 'cat_walk.gif';
	switchButtonStart = true;
	undes.textContent = undesCount;
}

// Функция остановки кота
function stopCat() {
	clearInterval(interval);
	if (undesCount === +undesInput.value && +undesInput.value !== 0) resetCat();
	speedCat.removeAttribute('disabled', '');
	controlsCat[0].textContent = 'Cтарт';
	catImg.src = 'cat_walk_no_anim.gif';
	switchButtonStart = false;
}

// Функция сброса всех режимов
function resetCat() {
	clearInterval(interval);
	undesInput.removeAttribute('disabled', '');
	speedCat.removeAttribute('disabled', '');
	catRezerse = false;
	switchButtonStart = false;
	coordinateX = 0;
	catRun.style.transform = null;
	controlsCat[0].textContent = 'Cтарт';
	titleCounter.textContent = 'Развороты: ';
	catImg.src = 'cat_walk_no_anim.gif';
	catImg.classList.remove('cat-reverse');
	newSpeed.textContent = 0;
	if (undesCount === +undesInput.value && +undesInput.value !== 0) {
		titleCounter.textContent = 'Разворотов: ';
		undes.textContent = +undesInput.value;
	} else {
		undes.textContent = 0;
	}
	undesCount = 0;
	undesInput.value = 0;
}

// Включение радиокнопок "День" и "Ночь" после срабатывания таймера
function disabledRadio() {
	for (let setAttr of timesRadio) setAttr.setAttribute('disabled', '');
	setTimeout(() => {
		for (let setAttr of timesRadio) setAttr.removeAttribute('disabled', '');
	}, 5000);
}

// Отслеживание нажатия кнопки "Старт"
controlsCat[0].onclick = () => {
	if (!switchButtonStart) {
		startCat();
	} else {
		stopCat();
	}
}

// Отслеживание нажатия кнопки "Сброс"
controlsCat[1].onclick = () => {
	resetCat();
	progress.value = 0;
	progressStatus.textContent = '0%';
	progressBar.style.top = null;
}

// Отслеживание ползунка скорости
speedCat.oninput = () => {
	realSpeed.textContent = speedCat.value;
}

// Открытие мобильного меню по клику на кнопке "Меню"
menuButton.onclick = () => {
	menuButton.classList.toggle('open');
	parameters.classList.toggle('open');
}

// Опрос радиокнопок "День" и "Ночь"
for (let time of timesRadio) {

	time.onclick = () => {

		disabledRadio();

		// Переключение классов "day" и "night" в div.cat-road
		switch (time.value) {
			case 'night_time':
				catRoad.classList.remove('day');
				catRoad.classList.add('night');
				break;
			case 'day_time':
				catRoad.classList.remove('night');
				catRoad.classList.add('day');
				break;
		}
	}
}

