let catRun = document.querySelector('.cat-image');
let controlsCat = document.querySelectorAll('.button');
let speedCat = document.querySelector('.speed-cat');
let realSpeed = document.querySelector('.real-speed');
let newSpeed = document.querySelector('.new-speed');
let titleCounter = document.querySelector('.title-counter');
let corners = document.querySelector('.count-corners');
let cornersInput = document.querySelector('.max-corners');
let switchButtonStart, catRezerse;
let i = 0;
let cornersMax = 0;
let countCorners = 0;
const screenWidth = window.screen.width;
catRun.classList.add('cat-reverse');

const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}


const goCat = async () => {
	if (switchButtonStart) {
		if (!catRezerse) {

			for (i; i < screenWidth - 160; i += 2) {
				if (!switchButtonStart || countCorners === cornersMax && cornersMax !== 0) {
					stopCat();
					break;
				}
				catRun.classList.add('cat-reverse');
				catRun.style.left = i + 'px';
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
				catRun.classList.remove('cat-reverse');
				catRun.style.left = i + 'px';
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
	catRun.src = 'cat_walk.gif';
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
	catRun.src = 'cat_walk_no_anim.gif';
	switchButtonStart = false;
}

function resetCat() {
	cornersInput.removeAttribute('disabled', '');
	catRezerse = false;
	switchButtonStart = false;
	i = 0;
	catRun.style.left = i + 'px';
	controlsCat[0].textContent = 'Cтарт';
	titleCounter.textContent = 'Развороты: ';
	catRun.src = 'cat_walk_no_anim.gif';
	catRun.classList.add('cat-reverse');
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