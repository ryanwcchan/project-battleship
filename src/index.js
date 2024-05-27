// import Ship from './ship';
// import Gameboard from './gameboard';
// import Player from './player';

import './style.css'
import createGrid from './createGrid.js'
import Player from './player.js';
import pickShips from './pickShips.js'
import dragFunctions from './dragFunctions.js';

// New game
const body = document.querySelector('.body');
const newGameButton = document.getElementById('newGame');

// Initiate
const playerGrid = document.createElement('div');
const enemyGrid = document.createElement('div');
const wrapper = document.createElement('div')
wrapper.classList.add('wrapper')
playerGrid.classList.add('grid-container');
enemyGrid.classList.add('grid-container');
playerGrid.setAttribute("id", "player-grid");
enemyGrid.setAttribute("id", "enemy-grid");
wrapper.appendChild(playerGrid);
wrapper.appendChild(enemyGrid);
body.appendChild(wrapper)

createGrid(playerGrid, 10, 10);
createGrid(enemyGrid, 10, 10);

newGameButton.addEventListener('click', () => {
    playerGrid.replaceChildren();
    enemyGrid.replaceChildren();
    let newPlayer = new Player
    let newEnemy = new Player
    newPlayer.gameboard = createGrid(playerGrid, 10, 10);
    newEnemy.gameboard = createGrid(enemyGrid, 10, 10);
    dragFunctions();
});

pickShips(body);
dragFunctions();