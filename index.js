import METADATA from './metadata.js';

let firstGuess = ''
let secondGuess = ''
let guesses = 0
let previousTarget = null

window.addEventListener('DOMContentLoaded', createCards, { once: true })


function createCards() {
	for (let i = 0; i < 16; i++) {
		const card = document.createElement('div')
		const cardFront = document.createElement('div')
		const cardBack = document.createElement('div')
		cardFront.className = 'cardFront'
		cardBack.className = 'cardBack'
		cardFront.addEventListener('click', checkMatch)
		card.append(cardFront, cardBack)
		document.querySelector('.cardsGrid').appendChild(card)
	}
	loadImages();
}


function resetGuesses() {
	firstGuess = ''
	secondGuess = ''
	guesses = 0
	previousTarget = null
	document.querySelectorAll('.selected').forEach(card => card.classList.remove('selected'));
}


function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}


function loadImages() {
	resetGuesses();
	const shuffledImages = getImages();

	const matchedCards = document.querySelectorAll('.matched');
	const cardFronts = document.querySelectorAll(".cardFront");
	const cardBacks = document.querySelectorAll(".cardBack");

	matchedCards.forEach(card => card.classList.remove('matched'));
	cardFronts.forEach((card, i) => card.dataset.id = shuffledImages[i]);
	cardBacks.forEach((card, i) => card.style.backgroundImage = `url('images/${shuffledImages[i]}.jpg')`);
}


function getImages() {
	const randomImages = shuffle(Object.keys(METADATA)).slice(0, 8);
	if (randomImages.length < 8) console.error(`Only ${randomImages.length} images in the collection!`);
	const shuffledImages = shuffle(randomImages.concat(randomImages));
	return shuffledImages
}


function checkMatch(event) {
	if (event.target.classList.contains("cardsGrid") || 
		event.target === previousTarget || 
		event.target.parentNode.classList.contains('selected') || 
		event.target.parentNode.classList.contains('matched'))
		return;

	guesses++;
	if (guesses === 1) {
		firstGuess = event.target.dataset.id;
		event.target.parentNode.classList.add('selected');
	}

	if (guesses === 2) {
		secondGuess = event.target.dataset.id;
		event.target.parentNode.classList.add('selected');
		if (firstGuess === secondGuess) {
			setTimeout(function() {
				document.querySelectorAll('.selected').forEach(card => card.classList.add('matched'));
			}, 1200)
		};
		setTimeout(resetGuesses, 1200);
	};
	
	previousTarget = event.target;
}