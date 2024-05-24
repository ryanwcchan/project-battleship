// import Ship from './ship';
// import Gameboard from './gameboard';
// import Player from './player';

import './style.css'
import newGame from './newGame.js'

// New game
const body = document.querySelector('.body');
const newGameButton = document.getElementById('newGame');

newGameButton.addEventListener('click', () => {
    body.replaceChildren();
    newGame(body);
});

newGame(body);