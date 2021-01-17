 // Function for computer taking it's turn. Uses a random number on [0,1) to determine choice
let computerPlay = function() {
    let computerChoice = Math.random();

    if (computerChoice < (1 / 3)) {
        return 'rock';
    } else if (computerChoice < (2 / 3)) {
        return 'paper';
    } else {
        return 'scissors';
    }
};

// Determines winner of given round for each players' selection. Hidden easter egg is present too
// 0 represents the computer
// 1 represents the player
// 2 represents a tied round
let playRound = function(playerSelection, computerSelection) {
    if (
      (playerSelection === 'rock' && computerSelection === 'scissors') 
      || (playerSelection === 'paper' && computerSelection === 'rock')
      || (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        message.textContent = `You Win! ${playerSelection} beats ${computerSelection}!`;
        container.appendChild(message);
        return keepScore(1);
    } else if (
      (playerSelection === 'rock' && computerSelection === 'paper')
      || (playerSelection === 'paper' && computerSelection === 'scissors')
      || (playerSelection === 'scissors' && computerSelection === 'rock')
    ) {
        message.textContent = `You Lose! ${computerSelection} beats ${playerSelection}.`;
        container.appendChild(message);
        return keepScore(0);
    } else if (playerSelection === 'gun') {
        message.textContent = `Jesus, you fucking killed him! Here's a point though, I guess.`
        container.appendChild(message);
        return keepScore(1);
    } else {
        message.textContent = `The game is tied. You both selected ${playerSelection}.`
        container.appendChild(message); 
        return keepScore(2);
    }
};

// Keeps track of player and computer score
let keepScore = function(winner) {
    let rounds = 5;
    
    if (winner === 0) {
        computerScore++;
        document.getElementById("scoreComputer").innerHTML = `${computerScore}`;
    } else if (winner === 1) {
        playerScore++;
        document.getElementById("scorePlayer").innerHTML = `${playerScore}`;
    }

    roundsPlayed++;

    if (roundsPlayed === rounds) {
        alert(`The final score is:\nYou: ${playerScore}\nComputer: ${computerScore}`);
        playerScore = 0;
        computerScore = 0;
        roundsPlayed = 0;
        document.getElementById("scorePlayer").innerHTML = `${playerScore}`;
        document.getElementById("scoreComputer").innerHTML = `${computerScore}`;
        return;
    }
};

// Initialize player scores
let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

// Setup event listeners for buttons and round text
const container = document.querySelector('#container');

const message = document.createElement('message');
message.classList.add('message');

const dispPlayerScore = document.createElement('dispPlayerScore');
dispPlayerScore.classList.add('dispPlayerScore');

const dispComputerScore = document.createElement('dispComputerScore');
dispComputerScore.classList.add('dispComputerScore');

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        playerSelection = button.id;
        message.remove();

        playRound(playerSelection, computerPlay());
    });
});