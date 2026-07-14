'use strict';

import Game from '../modules/Game.class.js';

const game = new Game();

const startButton = document.querySelector('.button.start');

const score = document.querySelector('.game-score');

score.textContent = game.score;

startButton.addEventListener('click', () => {
  if (game.status === 'playing') {
    return;
  }

  game.start();

  const container = document.querySelectorAll('.field-cell');

  for (let i = 0; i < game.board.flat().length; i++) {
    const value = game.board.flat()[i];

    container[i].textContent = value === 0 ? '' : value;
    container[i].className = `field-cell field-cell--${value}`;
  }
});

document.addEventListener('keydown', (keyboardEvent) => {
  if (keyboardEvent.key === 'left' || keyboardEvent.key === 'ArrowLeft') {
    game.moveLeft();

    const container = document.querySelectorAll('.field-cell');

    for (let i = 0; i < game.board.flat().length; i++) {
      const value = game.board.flat()[i];

      container[i].textContent = value === 0 ? '' : value;
      container[i].className = `field-cell field-cell--${value}`;
    }
    score.textContent = game.score;
    game.addRandomTile();
  }

  if (keyboardEvent.key === 'right' || keyboardEvent.key === 'ArrowRight') {
    game.moveRight();

    const container = document.querySelectorAll('.field-cell');

    for (let i = 0; i < game.board.flat().length; i++) {
      const value = game.board.flat()[i];

      container[i].textContent = value === 0 ? '' : value;
      container[i].className = `field-cell field-cell--${value}`;
    }
    score.textContent = game.score;
    game.addRandomTile();
  }

  if (keyboardEvent.key === 'up' || keyboardEvent.key === 'ArrowUp') {
    game.moveUp();

    const container = document.querySelectorAll('.field-cell');

    for (let i = 0; i < game.board.flat().length; i++) {
      const value = game.board.flat()[i];

      container[i].textContent = value === 0 ? '' : value;
      container[i].className = `field-cell field-cell--${value}`;
    }
    score.textContent = game.score;
    game.addRandomTile();
  }

  if (keyboardEvent.key === 'down' || keyboardEvent.key === 'ArrowDown') {
    game.moveDown();

    const container = document.querySelectorAll('.field-cell');

    for (let i = 0; i < game.board.flat().length; i++) {
      const value = game.board.flat()[i];

      container[i].textContent = value === 0 ? '' : value;
      container[i].className = `field-cell field-cell--${value}`;
    }
    score.textContent = game.score;
    game.addRandomTile();
  }
});
