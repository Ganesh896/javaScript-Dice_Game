"use strict";

const score0 = document.querySelector("#score0");
const score1 = document.querySelector("#score1");
const dice = document.querySelector(".dice");
const current0 = document.getElementById("current0");
const current1 = document.getElementById("current1");

// const score = document.querySelector('.score');

const player0 = document.querySelector(".player0");
const player1 = document.querySelector(".player1");

//declaring variables globally
let currentScore, finalScore, playing, activePlayer;

//selecting all the buttons
const btnNew = document.querySelector(".btnNew");
const btnRoll = document.querySelector(".btnRoll");
const btnHold = document.querySelector(".btnHold");

//resetting the game
const reStart = function () {
  currentScore = 0;
  activePlayer = 0;
  finalScore = [0, 0];
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  current1.textContent = 0;
  current0.textContent = 0;
  dice.classList.add("hidden");
  document.querySelector(`.player0`).classList.remove("player--winner");
  document.querySelector(`.player1`).classList.remove("player--winner");
  player0.classList.add("playerActive");
  player1.classList.remove("playerActive");
};
reStart(); //calling the restart function

//Switching the player
const switchPlayer = function () {
  document.querySelector(`#current${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("playerActive");
  player1.classList.toggle("playerActive");
};

//adding click event to the roll dice button
btnRoll.addEventListener("click", function () {
  if (playing) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    dice.src = `dice-${randomNumber}.png`;
    dice.classList.remove("hidden");

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.querySelector(
        `#current${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Adding click event to Hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    finalScore[activePlayer] += currentScore;

    document.querySelector(`#score${activePlayer}`).textContent =
      finalScore[activePlayer];

    if (finalScore[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add("player--winner");
      dice.classList.add("hidden");
      // document.querySelector(`.player${activePlayer}`).classList.remove('playerActive');
    } else {
      switchPlayer();
    }
  }
});

//Adding click event to Restart button
btnNew.addEventListener("click", reStart);
