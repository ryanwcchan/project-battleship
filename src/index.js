import './style.css'

const playerGrid = document.getElementById('player-grid');
const computerGrid = document.getElementById('computer-grid');

let draggedShip = null;
let isHorizontal = true;

const shipsData = [
    { name: 'Carrier', length: 5 },
    { name: 'Battleship', length: 4 },
    { name: 'Cruiser', length: 3 },
    { name: 'Submarine', length: 3 },
    { name: 'Patrol Boat', length: 2 },
]

createGrid(playerGrid);
createGrid(computerGrid);

const shipSelector = document.getElementById('ship-selection');
const buttonDiv = document.querySelector('.button-container');

shipPlacer(shipsData, isHorizontal, buttonDiv);



function createGrid(container) {
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < 10; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-column', j);
            row.appendChild(cell);
        }

        container.appendChild(row);
    }
}

function createShip(name, length, isHorizontal) {
    const ship = document.createElement('div');
    ship.classList.add('ship');
    ship.setAttribute('data-length', length);
    ship.setAttribute('data-name', name);
    ship.setAttribute('draggable', true)

    if (isHorizontal) {
        ship.classList.add('horizontal');
        ship.setAttribute('data-horizontal', true)
    } else {
        ship.classList.add('vertical');
        ship.setAttribute('data-horizontal', false)
    }

    for (let i = 0; i < length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add('ship-cell');
        ship.appendChild(cell);
    }
    shipSelector.append(ship);
}

function shipPlacer(shipsData, isHorizontal, buttonDiv) {
    const rotateButton = document.createElement('button');
    const resetButton = document.createElement('button');

    rotateButton.classList.add('rotate-button');
    resetButton.classList.add('reset-button');

    rotateButton.textContent = "Rotate";
    resetButton.textContent = "Reset";

    buttonDiv.append(rotateButton, resetButton)

    shipsData.forEach(ship => {
        createShip(ship.name, ship.length, isHorizontal)
    });
}