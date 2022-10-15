// Variables
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8],
	cardsSeen = 0,
	card1 = null,
	card2 = null;
	firstResult = null,
	secondResult = null,
	counterMovements = 0,
	contadorAciertos = 0,
	timer = 30,
	timerBegin = 30;
	regresiveTimeID = null,
	startRegresiveTime = false,
	timerHideCards = null;

// Variables HTML
const movements = document.getElementById('movements'),
	time = document.getElementById('time'),
	aciertos = document.getElementById('aciertos'),
	buttons = document.querySelectorAll('.table button'),
	winSection = document.querySelector('.replay'),
	winSectionContent = document.querySelector('.replay__container'),
	timeWinSection = document.querySelector('.replay-time'),
	movementsWinSection = document.querySelector('.replay-movements'),
	closeWinMessage = document.getElementById('close-win'),
	replayBtn = document.querySelectorAll('.replay-btn'),
	loseSection = document.querySelector('.lose.replay'),
	loseSectionContent = document.querySelector('.lose.replay__container'),
	loseMovements = document.querySelector('.movements-span'),
	loseAciertos = document.querySelector('.lose-aciertos');
	closeLoseMessage = document.getElementById('close-lose');
	

// Audios
const audioPop = new Audio('./pop.mp3'),
	audioWhoosh = new Audio('./whoosh.mp3');
// Desordenando aleatoriamente los numeros
numbers.sort(()=> {return Math.floor(Math.random() - 0.5)})
console.log(numbers);



/*
		*************
		* FUNCTIONS *
		*************
*/


// Show win messages
const winMessage = ()=> {
	winSection.classList.add('show-replay');
	winSectionContent.classList.add('show-replay-content');
	timeWinSection.textContent = `${timerBegin - timer} segundos`;
	movementsWinSection.textContent = `${counterMovements} movimientos`;
}

// Show lose messages
const loseMessage = ()=>{
	loseSection.classList.add('lose-replay');
	loseSectionContent.classList.add('show-replay-content');
	loseMovements.textContent = `${counterMovements} movimientos`;
	loseAciertos.textContent = `${contadorAciertos} aciertos`;
}

// Removing win messages
const hideWinMessage = ()=> {
	winSection.classList.remove('show-replay');
	winSectionContent.classList.remove('show-replay-content');
}

// Removing lose message
const hideLoseMessage = ()=>{
	loseSection.classList.remove('lose-replay');
	loseSectionContent.classList.remove('show-replay-content');
}

// Showing hidden cards 
const showHiddenCards = ()=> {
	clearTimeout(timerHideCards)
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].textContent = numbers[i];
		buttons[i].classList.add('disabled');
	}
	audioWhoosh.play();
}

// Function for setInterval
const startTimer = ()=>{
	regresiveTimeID = setInterval(()=> {
		timer--;
		// Updating seconds
		time.textContent = timer;

		if(timer === 0) {
			clearInterval(regresiveTimeID);
			showHiddenCards();
			setTimeout(()=> {
				loseMessage();
			}, 1500);
		}
	}, 1000);
}



// Main function
const showNumber = (id)=> {
	cardsSeen++;

	if(startRegresiveTime === false) {
		startTimer();
		startRegresiveTime = true;
	}

	if(cardsSeen === 1) {
		audioPop.play();
		card1 =	document.getElementById(id);
		card1.textContent = numbers[id];
		card1.classList.add('disabled');
		firstResult = numbers[id];
	}

	else if(cardsSeen === 2) {
		audioPop.play();
		card2 =	document.getElementById(id);
		card2.textContent = numbers[id];
		card2.classList.add('disabled');
		secondResult = numbers[id];

		// Aumentanto movimientos
		counterMovements++;
		movements.textContent = counterMovements;

		if(firstResult === secondResult) {
			// Aumentando aciertos
			contadorAciertos++;
			aciertos.textContent = contadorAciertos;

			// Encerando las tarjetas destapadas
			cardsSeen = 0;
			if(contadorAciertos === 8){
				// Stop secons
				clearInterval(regresiveTimeID);
				// Showing Ending message
				setTimeout(()=> {
					winMessage();
				}, 500);
			}
		}

		else {
			timerHideCards = setTimeout(()=> {
				// Sound
				audioWhoosh.play();
				// Tapando las tarjetas
				card1.textContent = "";
				card1.classList.remove('disabled');
				card2.textContent = "";
				card2.classList.remove('disabled');

				// Encerando las tarjetas destapadas
				cardsSeen = 0;
			}, 800)
		}
	}
}

// Function for restart game
const restartGame = ()=>{
	// Variables al valor inicial
	cardsSeen = 0;
	card1 = null;
	card2 = null;
	firstResult = null;
	secondResult = null;
	counterMovements = 0;
	contadorAciertos = 0;
	timer = 30;
	timerBegin = 30;
	regresiveTimeID = null;
	startRegresiveTime = false;

	// Desordenando denuevo los numeros
	numbers.sort(()=> {return Math.floor(Math.random() - 0.5)});

	// Habilitando los botones nuevamente
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].textContent = "";
		buttons[i].classList.remove('disabled');
	}
	audioWhoosh.play();

	// Removing wing message
	winSection.classList.remove('show-replay');
	winSectionContent.classList.remove('show-replay-content');

	// Removing lose message
	loseSection.classList.remove('lose-replay');
	loseSectionContent.classList.remove('show-replay-content');

	// Tablero de estadisticas a su valor por defecto
	aciertos.textContent = "0";
	movements.textContent = "0";
	time.textContent = "30";

	console.log(numbers);

}





// Listeners

closeWinMessage.addEventListener('click', hideWinMessage);
closeLoseMessage.addEventListener('click', hideLoseMessage)


// Because there ar two buttons
replayBtn.forEach(btn=> {
	btn.addEventListener('click', restartGame);
});


// Loader
window.addEventListener("load", function(){
    document.getElementById("loader").classList.toggle("loader2");
})