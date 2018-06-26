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

	if (allEvents.length == 1) {
		timer();
	}
	if (currentEvents.length < 3) {
	event.target.classList.add("open");
	}
	
	if (currentEvents.length > 2) {
		currentEvents.pop();
	}
	
	if (currentEvents.length == 2) {
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
		
		let cardMatch = document.getElementsByClassName("match");
		if (cardMatch.length == 16) {
			
			modal();
	}
}
				
,500)}

//matching two cards with the same symbols
function match() {
	if (symbols[0]===symbols[1]) {
		
		for (var item of currentEvents) {
			item.classList.add("match");
		};		
	}	
}

//unmatching two cards with different symbols	
function unmatch() {
	if  (symbols[0]!==symbols[1]) {
		for (var item of currentEvents) {
			item.classList.remove("open");
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
let	min = 0;
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

}, 1000)}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}