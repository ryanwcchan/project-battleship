import './style.css'
import createGrid from './createGrid';
import createShip from './createShip';

// Global Game state variables
let isHorizontal = true;

let shipsData = [
    { name: 'Carrier', length: 5 },
    { name: 'Battleship', length: 4 },
    { name: 'Cruiser', length: 3 },
    { name: 'Submarine', length: 3 },
    { name: 'Patrol-Boat', length: 2 },
]

let placedShips = [];

// Initialization
const playerGrid = document.getElementById('player-grid');
const computerGrid = document.getElementById('computer-grid');
const shipSelector = document.getElementById('ship-selection');
const buttonDiv = document.querySelector('.button-container');

// Initialize game

function initializeGame() {
    createGrid(playerGrid);
    createGrid(computerGrid);

    // Create rotate and reset button next to ship selection
    const rotateButton = document.createElement('button');
    const resetButton = document.createElement('button');

    rotateButton.classList.add('rotate-button');
    resetButton.classList.add('reset-button');

    rotateButton.textContent = "Rotate";
    resetButton.textContent = "Reset";

    buttonDiv.append(rotateButton, resetButton)

    rotateButton.addEventListener('click', () => {
        isHorizontal = !isHorizontal
        renderShips()
    })

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    renderShips()

    playerGrid.addEventListener('dragover', (e) => {
        e.preventDefault();
    })
    
    playerGrid.addEventListener('drop', drop)

    placeComputerShips();
}

function renderShips() {
    shipSelector.replaceChildren();
    shipsData.forEach(ship => {
        if (!placedShips.includes(ship.name)) {
            createShip(ship.name, ship.length, isHorizontal, shipSelector)
        }
    });

    const ships = document.querySelectorAll('.ship');

    ships.forEach(ship => {
        ship.addEventListener('dragstart', () => {
            ship.classList.add('dragging');
        })

        ship.addEventListener('dragend', () => {
            ship.classList.remove('dragging');
        })
    })
}

function drop(e) {
    e.preventDefault()

    const targetCell = e.target;

    if (!targetCell.classList.contains('cell')) {
        return;
    }

    const ship = document.querySelector('.dragging');

    if (!ship) {
        return;
    }

    const shipName = ship.getAttribute('data-name');
    const shipLength = parseInt(ship.getAttribute('data-length'));
    const shipIsHorizontal = ship.getAttribute('data-horizontal') === 'true';

    if (targetCell.classList.contains('cell')) {
        const cellX = parseInt(targetCell.getAttribute('data-row'));
        const cellY = parseInt(targetCell.getAttribute('data-column'));

        if (validatePlacement(cellX, cellY, shipLength, shipIsHorizontal)) {
            console.log(`Dropped ${shipName} at [${cellX}, ${cellY}]`)
            placeShipOnGrid(cellX, cellY, shipLength, shipIsHorizontal, shipName, playerGrid)

            shipSelector.removeChild(ship);

            placedShips.push(shipName);

            // Remove ship from shipData
            shipsData = shipsData.filter(s => s.name !== shipName)

            renderShips()
        } else {
            console.log(`Invalid Placement at [${cellX}, ${cellY}]`)
        }
    }
}

function validatePlacement(startX, startY, length, isHorizontal, grid) {
    if (isHorizontal) {
        if (startY + length > 10) {
            return false;
        }
        for (let i = 0; i < length; i++) {
            const cell = grid.querySelector(`.cell[data-row='${startX}'][data-column='${startY + i}']`)
            if (!cell || cell.classList.contains('placed')) {
                return false;
            }
        }
    } else {
        if (startX + length > 10) {
            return false;
        }
        for (let i = 0; i < length; i++) {
            const cell = grid.querySelector(`.cell[data-row='${startX + i}'][data-column='${startY}']`)
            if (!cell || cell.classList.contains('placed')) {
                return false;
            }
        }
    }
    return true;
}

function placeShipOnGrid(startX, startY, length, isHorizontal, shipName, grid) {
    if (isHorizontal) {
        for (let i = 0; i < length; i++) {
            const cell = grid.querySelector(`.cell[data-row='${startX}'][data-column='${startY + i}']`);
            if (cell) {
                cell.classList.add('placed');
                cell.classList.add('ship-part');
                cell.classList.add(shipName);
            }
        }
    } else {
        for (let i = 0; i < length; i++) {
            const cell = grid.querySelector(`.cell[data-row='${startX + i}'][data-column='${startY}']`);
            if (cell) {
                cell.classList.add('placed');
                cell.classList.add('ship-part');
                cell.classList.add(shipName);
            }
        }
    }
}

function placeComputerShips() {
    const computerShips = [...shipsData]

    computerShips.forEach(ship => {
        let placed = false;

        while (!placed) {
            const randomX = Math.floor(Math.random() * 10);
            const randomY = Math.floor(Math.random() * 10);
            const isHorizontal = Math.random() < 0.5;
            if (validatePlacement(randomX, randomY, ship.length, isHorizontal, computerGrid)) {
                placeShipOnGrid(randomX, randomY, ship.length, isHorizontal, ship.name, computerGrid);
                placed = true;
            }
        }
    })
}

function resetGame() {
    playerGrid.replaceChildren();
    computerGrid.replaceChildren();

    isHorizontal = true;

    createGrid(playerGrid);
    createGrid(computerGrid);

    shipsData = [
        { name: 'Carrier', length: 5 },
        { name: 'Battleship', length: 4 },
        { name: 'Cruiser', length: 3 },
        { name: 'Submarine', length: 3 },
        { name: 'Patrol-Boat', length: 2 },
    ];

    placedShips = [];

    renderShips();
    placeComputerShips();
}

initializeGame();