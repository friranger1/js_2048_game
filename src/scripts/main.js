'use strict';

import Game from '../modules/Game.class.js';

const game = new Game();
const startButton = document.querySelector('.button.start');
const score = document.querySelector('.game-score');
const messageStart = document.querySelector('.message-start');
const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');

function showMessage() {
  messageStart.classList.add('hidden');
  messageLose.classList.add('hidden');
  messageWin.classList.add('hidden');

  if (game.status === 'idle') {
    messageStart.classList.remove('hidden');
  }

  if (game.status === 'win') {
    messageWin.classList.remove('hidden');
  }

  if (game.status === 'lose') {
    messageLose.classList.remove('hidden');
  }
}

score.textContent = game.score;

const moves = {
  ArrowLeft: () => game.moveLeft(),
  ArrowRight: () => game.moveRight(),
  ArrowUp: () => game.moveUp(),
  ArrowDown: () => game.moveDown(),
};

function render() {
  const cells = document.querySelectorAll('.field-cell');
  const flatBoard = game.board.flat();

  for (let i = 0; i < flatBoard.length; i++) {
    const value = flatBoard[i];

    cells[i].textContent = value === 0 ? '' : value;
    cells[i].className = `field-cell field-cell--${value}`;
  }

  showMessage();
  score.textContent = game.score;
}

function animateRecentTiles() {
  const cells = document.querySelectorAll('.field-cell');
  const recentTiles = game.recentTiles.flat();

  for (let i = 0; i < recentTiles.length; i++) {
    if (recentTiles[i] !== 0) {
      cells[i].classList.add('field-cell--new');
    }
  }
}

startButton.addEventListener('click', () => {
  if (game.status === 'idle') {
    game.start();
    startButton.textContent = 'Restart';
    startButton.classList.remove('start');
    startButton.classList.add('restart');
  } else {
    game.restart();
  }

  render();
  animateRecentTiles();

  const container = document.querySelectorAll('.field-cell');

  for (let i = 0; i < game.board.flat().length; i++) {
    const value = game.board.flat()[i];

    container[i].textContent = value === 0 ? '' : value;
    container[i].className = `field-cell field-cell--${value}`;
  }
});

document.addEventListener('keydown', (keyboardEvent) => {
  if (game.status !== 'playing') {
    return;
  }

  const move = moves[keyboardEvent.key];

  if (!move) {
    return;
  }

  const boardCopy = structuredClone(game.board);
  let boardChanged = false;

  game.resetRecentTiles();
  move();

  for (let i = 0; i < game.board.flat().length; i++) {
    if (game.board.flat()[i] !== boardCopy.flat()[i]) {
      boardChanged = true;
      break;
    }
  }

  if (!boardChanged) {
    return;
  }

  game.addRandomTile();
  game.updateStatus();
  render();
  animateRecentTiles();
});
