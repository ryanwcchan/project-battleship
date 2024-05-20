// import Ship from './ship';
// import Gameboard from './gameboard';
// import Player from './player';

import './style.css'
import createGrid from './createGrid.js'

document.addEventListener('DOMContentLoaded', () => {
    const playerGrid = document.getElementById('player-grid');
    const enemyGrid = document.getElementById('enemy-grid');

    createGrid(playerGrid, 10, 10);
    createGrid(enemyGrid, 10, 10);
});

