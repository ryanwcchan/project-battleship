// import Ship from './ship';
// import Gameboard from './gameboard';
// import Player from './player';

import './style.css'
import createGrid from './createGrid.js'
import Player from './player.js';
import createShip from './createShip.js'

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

function dragFunctions() {
    const draggables = document.querySelectorAll('.ship-div');
    const playerContainer = document.querySelector('#player-grid');
    const cells = playerContainer.querySelectorAll('.cell');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', '');
            draggable.classList.add('dragging');
            console.log('drag start');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    cells.forEach(cell => {
        cell.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            cell.append(draggable)
        });



        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            if (draggable) {
                cell.append(draggable)
                draggable.classList.remove('dragging')
            };
        });
    });
};

function pickShips(container) {
    const wrapper = document.createElement('div');
    const pickShipDiv = document.createElement('div');
    const rotateButton = document.createElement('button');

    rotateButton.textContent = 'Rotate';
    rotateButton.classList.add('button');
    rotateButton.setAttribute('id', 'rotate-button');
    wrapper.classList.add('pick-ship-wrapper')
    pickShipDiv.classList.add('pick-div');

    let orientation = 'horizontal';

    // Array of ships
    const shipData = [
        { name: 'Carrier', length: 5 },
        { name: 'Battleship', length: 4 },
        { name: 'Destroyer', length: 3 },
        { name: 'Submarine', length: 3 },
        { name: 'Patrol Boat', length: 2 }
    ]

    shipDataShips(shipData, wrapper, orientation)

    rotateButton.addEventListener('click', () => {
        if (orientation === 'horizontal') {
            orientation = 'vertical';
            wrapper.replaceChildren();
            shipDataShips(shipData, wrapper, orientation)
        } else {
            orientation = 'horizontal';
            wrapper.replaceChildren();
            shipDataShips(shipData, wrapper, orientation)
        }
        console.log(orientation);
        dragFunctions()
    });

    pickShipDiv.appendChild(rotateButton);
    pickShipDiv.appendChild(wrapper);
    container.appendChild(pickShipDiv);
}

function shipDataShips(shipData, wrapper, orientation) {
    shipData.forEach(ship => {
        createShip(wrapper, ship, orientation);
    });
}