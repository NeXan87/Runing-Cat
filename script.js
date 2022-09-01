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
let switchButtonStart, catRezerse;
let i = undesCount = 0;
const screenWidth = window.screen.width;

const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

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
const goCat = async () => {
	if (switchButtonStart) {

		calcProgress();

		if (!catRezerse) {

			for (; i < screenWidth - 160; i += 2) {
				if (!switchButtonStart || undesCount === +undesInput.value && +undesInput.value !== 0) {
					stopCat();
					break;
				}
				catImg.classList.remove('cat-reverse');
				catRun.style.transform = 'translateX(' + i + 'px)';
				newSpeed.textContent = i;
				await sleep(-(+speedCat.value - 10));
			}
			reverseCat();

		} else {

			for (; i > 0; i -= 2) {
				if (!switchButtonStart || undesCount === +undesInput.value && +undesInput.value !== 0) {
					stopCat();
					break;
				}
				catImg.classList.add('cat-reverse');
				catRun.style.transform = 'translateX(' + i + 'px)';
				newSpeed.textContent = i;
				await sleep(-(+speedCat.value - 10));
			}
			reverseCat();

		}
	}
}

// Функция расчета прогресса в процентах
function calcProgress() {
	if (+undesInput.value !== 0) {
		progressBar.style.top = '6px';
		progress.value = Math.round(undesCount / +undesInput.value * 100);
		progressStatus.textContent = progress.value + '%';
	} else {
		progressBar.style.top = null;
		progress.value = 0;
		progressStatus.textContent = 0 + '%';
	}
}

// Функция реверса кота
function reverseCat() {
	if (switchButtonStart) {
		undes.textContent = ++undesCount;
		(!catRezerse) ? catRezerse = true : catRezerse = false;
		goCat();
	}
}

// Функция старта кота
function startCat() {
	undesInput.setAttribute('disabled', '');
	controlsCat[0].textContent = 'Стоп';
	titleCounter.textContent = 'Развороты: ';
	catImg.src = 'cat_walk.gif';
	switchButtonStart = true;
	undes.textContent = undesCount;
}

// Функция остановки кота
function stopCat() {
	if (undesCount === +undesInput.value && +undesInput.value !== 0) resetCat();
	controlsCat[0].textContent = 'Cтарт';
	catImg.src = 'cat_walk_no_anim.gif';
	switchButtonStart = false;
}


// Функция сброса всех режимов
function resetCat() {
	undesInput.removeAttribute('disabled', '');
	catRezerse = false;
	switchButtonStart = false;
	i = 0;
	catRun.style.transform = 'translateX(0px)';
	controlsCat[0].textContent = 'Cтарт';
	titleCounter.textContent = 'Развороты: ';
	catImg.src = 'cat_walk_no_anim.gif';
	catImg.classList.remove('cat-reverse');
	newSpeed.textContent = 0;
	undes.textContent = 0;
	undesInput.value = 0;
	if (undesCount === +undesInput.value && +undesInput.value !== 0) {
		titleCounter.textContent = 'Разворотов: ';
		undes.textContent = +undesInput.value;
	}
	undesCount = 0;
	undesInput.value = 0;
}

// Отслеживание нажатия кнопки "Старт"
controlsCat[0].onclick = function () {
	if (!switchButtonStart) {
		startCat();
		goCat();
	} else {
		stopCat();
		goCat();
	}
}

// Отслеживание нажатия кнопки "Сброс"
controlsCat[1].onclick = function () {
	resetCat();
	progress.value = 0;
	progressStatus.textContent = 0 + '%';
	progressBar.style.top = null;
}

// Отслеживание ползунка скорости
speedCat.oninput = function () {
	realSpeed.textContent = speedCat.value;
}

// Опрос радиокнопок "День" и "Ночь"
for (let time of timesRadio) {

	time.onclick = function () {

		// Блокировка радиокнопок "День" и "Ночь" на 5 секунд
		for (let setAttr of timesRadio) setAttr.setAttribute('disabled', '');
		setTimeout(radio_enabled, 5000);

		// Переключение классов "day" и "night" в div.cat-road
		if (time.value === 'night_time') {
			catRoad.classList.remove('day');
			catRoad.classList.add('night');
		} else {
			catRoad.classList.remove('night');
			catRoad.classList.add('day');
		}
	}

}

// Включение радиокнопок "День" и "Ночь" после срабатывания таймера
function radio_enabled() {
	for (let time of timesRadio) time.removeAttribute('disabled', '');
}

// Открытие мобильного меню по клику на кнопке "Меню"
menuButton.onclick = function () {
	menuButton.classList.toggle('open');
	parameters.classList.toggle('open');
}