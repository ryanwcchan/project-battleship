// import Ship from './ship';
// import Gameboard from './gameboard';
// import Player from './player';

import './style.css'
import createGrid from './createGrid.js'
import Player from './player.js';
import pickShips from './pickShips.js'

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
});

pickShips(body)

// Check if cells clicked

// const mode = 'start';

// const shipNames = ['Carrier', 'Battleship', 'Destroyer', 'Submarine', 'Patrol Boat']
// const shipLengths = [5, 4, 3, 3, 2]

// // Ship container
// const pickShipDiv = document.createElement('div');
// const rotateButton = document.createElement('button');
// pickShipDiv.classList.add('pick-div');
// body.appendChild(pickShipDiv);

// let currentOrientation = 'horizontal';

// if (mode === 'start') {
//     // Create div containing ships to place on grid
//     const carrier = document.createElement('div');
//     const battleship = document.createElement('div');
//     const destroyer = document.createElement('div');
//     const submarine = document.createElement('div');
//     const patrolBoat = document.createElement('div');

//     const ships = [carrier, battleship, destroyer, submarine, patrolBoat]

//     for (let i = 0; i < ships.length; i++) {
//         const shipName = document.createElement('span')
//         shipName.classList.add('ship-name')
//         shipName.textContent = shipNames[i]
//         ships[i].setAttribute('id', `${shipNames[i]}`)
//         ships[i].setAttribute('draggable', 'true')
//         ships[i].setAttribute('data-length', shipLengths[i])
//         ships[i].appendChild(shipName)
//         pickShipDiv.appendChild(ships[i])
//     }

//     createGrid(carrier, 1, 5)
//     createGrid(battleship, 1, 4)
//     createGrid(destroyer, 1, 3)
//     createGrid(submarine, 1, 3)
//     createGrid(patrolBoat, 1, 2)

//     const pickCells = pickShipDiv.querySelectorAll('.cell')
//     const rows = pickShipDiv.querySelectorAll('.row')

//     pickCells.forEach(cell => {
//         cell.style.backgroundColor = 'red';
//     });

//     pickShipDiv.addEventListener('click', (e) => {
//         console.log(e.target.parentNode)
//     });
// }

// if (mode === 'setup') {
//     playerGrid.addEventListener('click', function (e) {
//         console.log(e.target)
//     });
// }

// function createShip(name, length) {
//     const ship = document.createElement('div');
//     ship.classList.add('ship');
//     ship.setAttribute('draggable', 'true')
//     ship.setAttribute('data-length', length)
//     ship.setAttribute('data-name', name)
// }
