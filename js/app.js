/*
 * Create a list that holds all of your cards
 */
var arr = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",  "fa fa-cube",
	   "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
	   "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"]

const fragment = document.createDocumentFragment();
const deck = document.querySelector(".deck");
let listCards = shuffle(arr);
const card = document.getElementsByClassName('card');
const movesCounter = document.querySelector(".moves");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//function is called when restart button is clicked or button <Play again> in popup modal
function StartGame() {
    //reset timer
    clearInterval(time);
    allEvents =[];
    sec = 0;
	min=0;
  
    document.querySelector(".timer").innerHTML = min+"0m" + ":"+ sec+"0s";   
  
	//reset moves
	move = 0;
	movesCounter.textContent = 0;

	//reset the previous cards and set the new one
	deck.innerHTML = "";
	listCards = shuffle(arr);
	createCards();
	click();
	deck.style.pointerEvents = "auto";
	
	resetStar();
	clearAll();
}

//reset stars
function resetStar(){
	const whiteStar = document.getElementsByClassName("fa-star-o"); 
	const countWhiteStar = whiteStar.length; 
	
	for (let i=0; i<=countWhiteStar-1;i++) {
    
	    whiteStar[0].classList.replace("fa-star-o", "fa-star");
}}

//create the new deck of the cards
function createCards() {
    for (let i=0; i < listCards.length; i++) {
	
	    const newEl = document.createElement("li");
	    newEl.className = "card";

    	const newElement = document.createElement('i');
	    newElement.className = listCards[i];
	    
	    newEl.appendChild(newElement);
	    fragment.appendChild(newEl);
	
	}

deck.appendChild(fragment);

}

createCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let allEvents = [];   // array holding all events
let currentEvents = [];   // array with the clicked cards
let symbols = [];     // array with the class of the names of the symbols

//for over the game this function is called
function game(event) { 
    let f = event.target.firstChild.className;
    let h = event.target;
	symbols.push(f);
	currentEvents.push(h);
	allEvents.push(h);

	for (var item of currentEvents) {
		item.classList.add("disabled");
		item.classList.add("open");
	}

	if (allEvents.length == 1) {
		timer();
	}
	
	if (currentEvents.length == 2) {
		deck.style.pointerEvents = "none";
		twoCards();
		moves();
		ratingStars();		
	} 
	
true}

//adding event listeners to each cards
function click() {
	for (let i=0; i < listCards.length; i++) {
		card[i].addEventListener('click', game);		
	}
}

click();

//function which match, unmatch the opened cards and open congratulations modal
function twoCards() { 
    setTimeout(function(event){

		match();
		unmatch();
		clearAll();
		
		//display open model when all cards match
		deck.style.pointerEvents = "auto";
		let cardMatch = document.getElementsByClassName("match");
		
		if (cardMatch.length == 16) {
			clearInterval(time);
			modal();
	}
},500)}

//matching two cards with the same symbols
function match() {
	if (symbols[0]===symbols[1]) {
		
		for (var item of currentEvents) {
			item.classList.add("match");
			item.removeEventListener("click", game);
		};		
	}	
}

//unmatching two cards with different symbols	
function unmatch() {
	if  (symbols[0]!==symbols[1]) {
		for (var item of currentEvents) {
			item.classList.remove("open");
			item.classList.remove("disabled");
			}
		}	
	}

//function to clear arrays
function clearAll() {
	
	symbols = [];
	currentEvents = [];	
}

//setting timer
let sec = 0;
let min = 0;
var time;

function timer () {

 time = setInterval(function() {
    sec++;
   
    if (sec == 60) {
       min++; 
       sec = 0;
    }
    	sec = checkTime(sec);
 	
    if (min >= 10) {
    	document.querySelector(".timer").innerHTML = min+"m" + ":"+ sec+"s";
    }

    if (min < 10) {
    
    	document.querySelector(".timer").innerHTML = "0"+min+"m" + ":"+ sec+"s";
    }  

},1000)}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

//increment moves counter when two cards were clicked
let move = 0;

function moves () {
	 {
		move++;
		movesCounter.textContent = move;
	}
}

//removing one black star when amount of moves is divisible by 7
const blackStar = document.getElementsByClassName("fa fa-star");

function ratingStars () {
	let currentMoves = document.querySelector(".moves").textContent; 

	if ((currentMoves > 0) && (currentMoves % 7 == 0)) {
		blackStar[blackStar.length-1].classList.replace("fa-star", "fa-star-o");		
}}

//conratulations modal
const popup = document.querySelector(".modal");

function modal() {
	 
	popup.style.display = "block";
	document.querySelector(".moves-1").textContent = movesCounter.textContent;
	document.querySelector(".time-1").textContent = document.querySelector(".timer").textContent;
	document.querySelector(".stars-1").textContent = blackStar.length;
}

//close modal
var span = document.getElementsByClassName("close")[0];

function closeModal () {
	popup.style.display = "none";
}

span.onclick = function() {
    closeModal();
}

//restart button to start new game
const button = document.querySelector("#button");

button.onclick = function() {
			closeModal();
			StartGame();
}
