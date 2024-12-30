// Rock Paper Scissors game, human vs. computer, First to 5 (best of 5?) wins.

// gameplay data objects
import { avatars, compAvatars, userPlayer, compPlayer, gameData } from './components/gameObjects.js';
import { avatarUI, gamePlayUI, historyTR } from "./components/uiObjects.js"

// constants for use in gameplay
const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

// for use in loading into the game
const loadButton = document.querySelector('#load-button');

// variables for plays results
let compPlay;
let userPlay;
let roundResult;

const addLoadListener = function(){
  loadButton.addEventListener('click', loadGame);
};

const setShoot = function() {
  let playConfirm = document.querySelector('#play-confirm');
  playConfirm.innerText = `Shoot ${userPlay}`;
  let userChoice = document.querySelector('#user-choice');
  userChoice.innerHTML = `<img src="img/${userPlay}.png" alt="${userPlay} icon">`
}

// sets the user's play
const setRock = function() {
  userPlay = 'rock';
  console.log(userPlay);
  setShoot();
}

const setPaper = function() {
  userPlay = 'paper';
  console.log(userPlay);
  setShoot();
}

const setScissors = function() {
  userPlay = 'scissors';
  console.log(userPlay);
  setShoot();
}

const addPlayListeners = function(){
  const rockSubmit = document.querySelector('#rockSubmit');
  const paperSubmit = document.querySelector('#paperSubmit');
  const scissorsSubmit = document.querySelector('#scissorsSubmit');
  const shootSubmit = document.querySelector('#play-submit');
  rockSubmit.addEventListener('click', setRock);
  paperSubmit.addEventListener('click', setPaper);
  scissorsSubmit.addEventListener('click', setScissors);
  shootSubmit.addEventListener('click', executeRound);
};

// if a player wins, the winner argument is passed from checkWin, the user is notified in the UI and is given the option to start a new game. 
function gameWinner(){
  let playInput = document.querySelector('#play-input');
  let roundNumber = document.querySelector('#round-number');
  // updateHistory(gameData.round);
  if(userPlayer.lastPoint === 1) {
    roundNumber.innerHTML = `
      <p class="card-text" id="play-confirm"></p>
      <h4>You win the game, good job!</h4>`;
    playInput.innerHTML = `
      <img src="img/char/${userPlayer.avatar}.png" alt="${userPlayer.avatar}">
      <h2>Winner</h2>`;
  } else {
    roundNumber.innerHTML = `
      <p class="card-text" id="play-confirm"></p>
      <h4>You lost the game, sorry.</h4>`
    playInput.innerHTML = `
      <img src="img/comp/${compPlayer.avatar}.png" alt="${compPlayer.avatar} icon">
      <h2>Winner</h2>`;
  }
  addResetButtons('inputarea');
};

// play-input
const updatePlayCounts = function() {
  document.querySelector('#compRockCount').innerText = compPlayer.rockCount;
  document.querySelector('#compPaperCount').innerText = compPlayer.paperCount;
  document.querySelector('#compScissorsCount').innerText = compPlayer.scissorsCount;
  document.querySelector('#userRockCount').innerText = userPlayer.rockCount;
  document.querySelector('#userPaperCount').innerText = userPlayer.paperCount;
  document.querySelector('#userScissorsCount').innerText = userPlayer.scissorsCount;
  document.querySelector('#play-confirm').innerHTML = roundResult;
}

// Displays the result of the round
// If a player gets to five points: 
  // Declares a winner
  // Gives the option to play again
function checkWin(userScore, compScore) {
  console.log('user score:', userScore + ',', 'comp score:', compScore + '.');
  if(userScore == 5) {
    console.log('user won the game.');
    gameWinner();
    return;
  }
  if(compScore == 5) {
    console.log('comp won the game.');
    gameWinner();
    return;
  }
}

//win(), loss(), tie() functions update appropriate scores and updates the scoreboard
function loss(userPlay, compPlay) {
  const shootSubmit = document.querySelector('#play-submit');
  shootSubmit.innerHTML = `<img src="img/shoot.png" alt="shoot emoji"><span id="user-choice"></span>`;
  roundResult = `<img src="img/${userPlay}.png" alt="${userPlay} icon">vs<img src="img/${compPlay}.png" alt="${compPlay} icon">`;
  userPlayer.updatePlayerScore(0, userPlay);
  compPlayer.updatePlayerScore(1, compPlay);
  document.querySelector('#comp-score').innerText = compPlayer.score;
  document.querySelector('#user-score').innerText = userPlayer.score;
  checkWin(userPlayer.score, compPlayer.score);
}

function win(userPlay, compPlay) {
  const shootSubmit = document.querySelector('#play-submit');
  shootSubmit.innerHTML = `<img src="img/shoot.png" alt="shoot emoji"><span id="user-choice"></span>`;
  roundResult = `<img src="img/${userPlay}.png" alt="${userPlay} icon">vs<img src="img/${compPlay}.png" alt="${compPlay} icon">`;
  userPlayer.updatePlayerScore(1, userPlay);
  compPlayer.updatePlayerScore(0, compPlay);
  document.querySelector('#user-score').innerText = userPlayer.score;
  checkWin(userPlayer.score, compPlayer.score);
}

function tie(userPlay, compPlay) {
  const shootSubmit = document.querySelector('#play-submit');
  shootSubmit.innerHTML = `<img src="img/shoot.png" alt="shoot emoji"><span id="user-choice"></span>`;
  userPlayer.updatePlayerScore(0, userPlay);
  compPlayer.updatePlayerScore(0, compPlay);
  roundResult = `<img src="img/${userPlay}.png" alt="${userPlay} icon">vs<img src="img/${compPlay}.png" alt="${compPlay} icon">&nbsp;Shoot Again`;
  console.log(roundResult);
}

//switch function to determine win or loss, runs appropriate win(), loss(), tie() functions.
function updateScore(userLastPlay, compLastPlay){
  let scoreCase = userLastPlay + compLastPlay;
  switch(scoreCase) {
    case 'rockpaper': 
      loss(userLastPlay, compLastPlay);
      break;
    case 'rockscissors': 
      win(userLastPlay, compLastPlay);
      break;
    case 'paperrock':
      win(userLastPlay, compLastPlay);
      break;
    case 'paperscissors':
      loss(userLastPlay, compLastPlay);
      break;
    case 'scissorsrock':
      loss(userLastPlay, compLastPlay);
      break;
    case 'scissorspaper':
      win(userLastPlay, compLastPlay);
      break;
    default: 
      tie(userLastPlay, compLastPlay);
  }
  updatePlayCounts();
}

//updates the UI with player selections
function playNotice(userLastPlay, compLastPlay){
  console.log('User plays', userLastPlay);
  console.log('Comp plays', compLastPlay);
}

const updateHistory = function(round) {
  let gameHistory = document.querySelector('#game-history');
  let historyRow = document.createElement('tr');
  historyRow.classList = "history-view";
  historyRow.innerHTML = historyTR;
  let userDisk = historyRow.querySelector('.user-disk');
  let usrPrevPlay = historyRow.querySelector('.user-play');
  let prevRound = historyRow.querySelector('.history-round');
  let cmpPrevPlay = historyRow.querySelector('.comp-play');
  let compDisk = historyRow.querySelector('.comp-disk');
  if (userPlayer.lastPoint === 1) {
    userDisk.innerHTML = `&#128994;`;
  } 
  if (compPlayer.lastPoint === 1) {
    compDisk.innerHTML = `&#128308;`;
  }
  switch(userPlayer.lastPlay) {
    case 'rock':
      usrPrevPlay.innerHTML = 
        '<img src="img/rock.png" alt="rock">';
      break;
    case 'paper':
      usrPrevPlay.innerHTML = 
        '<img src="img/paper.png" alt="paper">';
      break;
    case 'scissors':
      usrPrevPlay.innerHTML = 
          '<img src="img/scissors.png" alt="scissors">';
      break;
  } 
  prevRound.innerText = (round.toString()).padStart(2, '0');
  switch(compPlayer.lastPlay) {
    case 'rock':
      cmpPrevPlay.innerHTML = 
        '<img src="img/rock.png" alt="rock">';
      break;
    case 'paper':
      cmpPrevPlay.innerHTML = 
        '<img src="img/paper.png" alt="paper">';
      break;
    case 'scissors':
      cmpPrevPlay.innerHTML = 
          '<img src="img/scissors.png" alt="scissors">';
      break;
  } 
  gameHistory.prepend(historyRow);
}

//randomizes the computer play and updates that variable
function compShoot(){
  let rand = Math.floor(Math.random() * 3 );
  switch(rand) {
    case 0: 
      compPlay = rock;
      break;
    case 1: 
      compPlay = paper;
      break;
    case 2:
      compPlay = scissors;
      break;
  }
}

//runs functions for one round of play
function executeRound() {
  if(userPlay) {
    userPlayer.lastPlay = userPlay;
  compShoot();
  compPlayer.lastPlay = compPlay;
  console.log('round ' + (gameData.round) + ':');
  gameData.updateRound();
  document.querySelector('#round-number').innerText = 'Round: ' + gameData.round;
  playNotice(userPlayer.lastPlay, compPlayer.lastPlay);
  updateScore(userPlayer.lastPlay, compPlayer.lastPlay);
  updateHistory((gameData.round-1));
  } else {
    document.querySelector('#play-confirm').innerHTML = `<span class="warning">Please select a play.</span>`;
  }
  
};

const setAvatars = function() {
  let playerIcon = document.querySelectorAll('.player-icon');
  playerIcon.forEach((item) => {
    item.innerHTML = `
    <img src="img/char/${userPlayer.avatar}.png" alt="${userPlayer.avatar}" aria-hidden="true"><h3 class="sr-conly>${userPlayer.avatar}</h3>`
  })
  let compIcon = document.querySelectorAll('.comp-icon');
  compIcon.forEach((item) => {
    item.innerHTML = `
    <img src="img/comp/${compPlayer.avatar}.png" alt="${compPlayer.avatar}"><h3 class="sr-conly>${compPlayer.avatar}</h3>`
  })
};

// .forEach((container) => {

const addResetButtons = function(location) {
  if(location == 'nav') {
    const startButton = document.querySelector('#start-button');
    startButton.innerText = 'Clear Board';
    startButton.classList = 'btn btn-outline-primary btn-md';
    // if the restart button exists, don't make it again
    if(document.querySelector('#restart-button')) {}
    else {
      const resetButtons = document.querySelector('#reset-buttons');
      let reStartButton = document.createElement('button');
      reStartButton.setAttribute('type', 'button');
      reStartButton.classList = 'btn btn-outline-primary btn-md';
      reStartButton.innerText = 'Avatar Selection';
      reStartButton.id = "restart-button";
      reStartButton.addEventListener('click', loadGame);
      resetButtons.append(reStartButton);
    };
  };
  if(location == 'inputarea') {
    const playInput = document.querySelector('#play-input');
    let playAgain = document.createElement('button');
    playAgain.setAttribute('type', 'button');
    playAgain.classList = 'btn btn-outline-primary btn-md';
    playAgain.innerText = 'Play Again';
    playAgain.id = "play-again";
    playAgain.addEventListener('click', loadGame);
    playInput.append(playAgain);
  };
};

// chooses a random computer avatar
const compAvatar = function(){
  let rand = Math.floor(Math.random() * 9);
  compPlayer.avatar = compAvatars[rand];
  console.log('comp avatar is ' + compPlayer.avatar);
}


// sets the board for a new game
function startGame() {
  // initializes imported player objects and plays
  compPlayer.init(0);
  userPlayer.init(0);
  userPlay = undefined;
  // sets/resets user interface
  const gameBoard = document.querySelector('#app');
  gameBoard.innerHTML = gamePlayUI;
  addPlayListeners();
  addResetButtons('nav');
  gameData.round = 1;
  console.clear();
  compAvatar();
  setAvatars();
};

//loads avatars for selection
let displayAvatars = () => {
  let avatarRow = document.createElement('div');
  avatarRow.classList = 'row';
  avatarRow.id = 'avatarRow';
  const addAvatarItem = function(element) {
    let avatarItem = document.createElement('div');
    avatarItem.classList = 'col-sm-4 col-md-2 col-lg-2 avatar-item';
    avatarItem.id = element;
    avatarItem.innerHTML = `
    <img class="img-fluid avatar-img" src="img/char/${element}.png" alt="${element} face emoji">`
    avatarRow.append(avatarItem);
  }
  avatars.forEach(addAvatarItem);
  // game play UI happens here
  const gameBoard = document.querySelector('#app');
  gameBoard.append(avatarRow);
}

// For each avatar container, add eventlisteners for selections
const addAvatarListeners = function() { 
  const avatarContainers = document.querySelectorAll(".avatar-item");
  const startButton = document.querySelector('#start-button');
  avatarContainers.forEach((container) => {
    // Set/remove background highlights on click
    container.addEventListener("click", () => {
      avatarContainers.forEach((item) => {
        item.classList.remove('avatar-item-active');
        item.classList.add('avatar-item');
      });
      container.classList.remove('avatar-item');
      container.classList.add('avatar-item-active');
      startButton.innerHTML= `PLAY AS <img src="img/char/${container.id}.png" img alt="${container.id}" class="start-avatar">`;
      startButton.classList.remove('disabled');
      userPlayer.avatar = container.id;
      console.log('User chose', userPlayer.avatar);
    });
  });
};

const loadGame =  () => {
  //load the avatar space
  document.body.innerHTML = avatarUI;
  // for use in starting & restarting the game
  const startButton = document.querySelector('#start-button');
  // adds a listener to UI so user can start a new game
  const addStartListener = function(){
    startButton.addEventListener('click', startGame);
  };
  addStartListener();
    // watch for avatar being selected
  // Get all avatar containers iot add event listeners
  // get the avatar options onto the page
  displayAvatars();
  addAvatarListeners();
}

addLoadListener();