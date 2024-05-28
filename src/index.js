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
const wrapper = document.createElement('div');
const pickDiv = document.createElement('div');
wrapper.classList.add('wrapper');
pickDiv.classList.add('pick-ship-div');
playerGrid.classList.add('grid-container');
enemyGrid.classList.add('grid-container');
playerGrid.setAttribute("id", "player-grid");
enemyGrid.setAttribute("id", "enemy-grid");
wrapper.appendChild(playerGrid);
wrapper.appendChild(enemyGrid);
body.appendChild(wrapper);
body.appendChild(pickDiv);

createGrid(playerGrid, 10, 10);
createGrid(enemyGrid, 10, 10);

newGameButton.addEventListener('click', () => {
    reset();
    let newPlayer = new Player
    let newEnemy = new Player
    newPlayer.gameboard = createGrid(playerGrid, 10, 10);
    newEnemy.gameboard = createGrid(enemyGrid, 10, 10);
    pickShips(pickDiv);
    dragFunctions();
});

pickShips(pickDiv);
dragFunctions();

function reset() {
    pickDiv.replaceChildren();
    playerGrid.replaceChildren();
    enemyGrid.replaceChildren();
}