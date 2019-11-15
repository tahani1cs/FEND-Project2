// By Tahani Alnefaie
// SEP 2019
// Email: tahani.alnefaie1@gmail.com

const deck      = document.querySelector('.deck');
let openCard    = [];
let matched     = false;
let moves       = 0 ;
const moveInfo  = document.querySelector('.moves');
const starLi    = document.querySelectorAll('.stars li');
let time        = 0;
let clockId;
let numStar;
let bgScreen    = document.querySelector('.bgScreen');
let countStars  = 0;
let clickT      = 0;
let finalClock;
let finalMoves;


window.onload = startGame();

function startGame(){
  shuffleDeck();
}

function shuffleDeck() { 
  let shuffleCards = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(shuffleCards);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
  temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

$('.card').on('click', function(){
  clickT++;
  if(clickT ==1){
    startClock(); 
  }
  checkCard(this);  
});

function checkCard(card){
  // Check if card opened
  if(opened(card)){
    return;
  }
  //Display Card
  $(card).addClass('show open');
  markedOpen(card);
}

// open function check if card opened doesn't count move
function opened(card){
  if ( $(card).hasClass('show') || $(card).hasClass('open')){
    return true;
  }
  return false;
}

function markedOpen(card){
  if (openCard.length < 2){
    openCard.push(card);
    matching(openCard);
    openCard = [];
  }
  //else{
    //openCard.push(card);
  //}
  movesCount();
  stars();
}

function matching(openCard){
  if( openCard[0].firstElementChild.className === openCard[1].firstElementChild.className ){
    for(let i = 0; i <=openCard.length ;  i++){
      $(openCard[i]).addClass('match');
    }
  }

  else{
// return true;
    setTimeout(function(){
      for(let i = 0; i <=openCard.length ;  i++){
        $(openCard[i]).removeClass('open show');
      }

    },980);
  }
  matchedOrnot();
}

function matchedOrnot(){
  $('.card').each(function(){
    matched=$(this).hasClass('match');
      return matched;
      })
    
  if (matched){
    stopClock();
    gameOver();
    finalResult();
  }
}

function movesCount(){
  moves++
  moveInfo.innerHTML = moves;
  finalMoves = moves;
}

function stars() {
  if (moves === 8 || moves === 16 ) {
    for (star of starLi) {
      if (star.style.display !== 'none') {
        star.style.display = 'none';
            break;
      }
    }
  }
}

//startClock & displayTime from http://github.com
//count timer
function startClock() {
  time = 0;
  clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}
  
function displayTime() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  clock.innerHTML = time;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } 
  else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
  finalClock = clock.innerHTML;
}

function stopClock() {
  clearInterval(clockId);
}

document.querySelector('.restart').addEventListener('click', restartGame);

function restartGame(){
//About cards
  shuffleDeck();
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
  clickT=0;
//About time
  stopClock();
  const clock = document.querySelector('.clock');
  clock.innerHTML = '0:00';
//About moves
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
//About stars
  countStars  = 0;
  for (star of starLi) {
    star.style.display = 'inline';
  }
}

document.querySelector('#cancel').addEventListener('click', cancelGame);
document.querySelector('#playAgain').addEventListener('click', again);

function cancelGame(){
  bgScreen.classList.toggle('hide');
}

function again(){
  restartGame();
  bgScreen.classList.toggle('hide');
}

function gameOver(){
  bgScreen.classList.toggle('hide');  
}

function finalStar(){
  for (star of starLi) {
    if (star.style.display !== 'none') {
      countStars++;
    }
  }
  return countStars;
}

function finalResult() {
  var showTime = document.querySelector('.time');
  var showStars = document.querySelector('.starsShow');
  var showMoves = document.querySelector('.movesShow');
  numStar = finalStar();
  finalMoves++;
  showTime.innerHTML = "Time = " + finalClock;
  showStars.innerHTML = "Stars = " + numStar;
  showMoves.innerHTML = "Moves = " + finalMoves;
}

