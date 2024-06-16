import './style.css'
import createGrid from './createGrid';
import createShip from './createShip';
import Player from './player'

// Global Game state variables
let player;
let computer;
let isHorizontal = true;
let gameStart = false;

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
const newGameBtn = document.getElementById('newGame');

// Initialize game

function initializeGame() {
    createGrid(playerGrid);
    createGrid(computerGrid);
    createButtons()
    renderShips()

    player = new Player('Player', 'real')
    computer = new Player('Computer', 'computer')

    playerGrid.addEventListener('dragover', (e) => {
        e.preventDefault();
    })
    
    playerGrid.addEventListener('drop', drop)

    placeComputerShips();

    newGameBtn.addEventListener('click', ()=> {
        resetGame()
    })

    computerGrid.addEventListener('click', attackCell);
}

function createButtons() {
    // Create rotate and reset button next to ship selection
    const rotateButton = document.createElement('button');
    const resetButton = document.createElement('button');
    const randomize = document.createElement('button')

    rotateButton.classList.add('button');
    resetButton.classList.add('button');
    randomize.classList.add('button')

    rotateButton.textContent = "Rotate";
    resetButton.textContent = "Reset";
    randomize.textContent = "Randomize Placement"

    buttonDiv.append(rotateButton, resetButton, randomize)

    rotateButton.addEventListener('click', () => {
        isHorizontal = !isHorizontal
        renderShips()
    })

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    randomize.addEventListener('click', () => {
        randomizePlacements();
    })
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

        if (validatePlacement(cellX, cellY, shipLength, shipIsHorizontal, playerGrid)) {
            console.log(`Dropped ${shipName} at [${cellX}, ${cellY}]`)
            player.gameboard.placeShip(cellX, cellY, shipLength, shipIsHorizontal);
            placeShipOnGrid(cellX, cellY, shipLength, shipIsHorizontal, shipName, playerGrid)

            shipSelector.removeChild(ship);
            placedShips.push(shipName);

            // Remove ship from shipData
            shipsData = shipsData.filter(s => s.name !== shipName)

            renderShips()

            if (placedShips.length === 5) {
                createStartButton();
            }


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
                computer.gameboard.placeShip(randomX, randomY, ship.length, isHorizontal);
                placed = true;
                console.log(randomX, randomY, ship.length)
            }
        }
    })
}

function randomizePlacements() {
    const playerShips = [...shipsData]

    playerShips.forEach(ship => {
        let placed = false;

        while (!placed) {
            const randomX = Math.floor(Math.random() * 10);
            const randomY = Math.floor(Math.random() * 10);
            const isHorizontal = Math.random() < 0.5;
            if (validatePlacement(randomX, randomY, ship.length, isHorizontal, computerGrid)) {
                placeShipOnGrid(randomX, randomY, ship.length, isHorizontal, ship.name, playerGrid);
                player.gameboard.placeShip(randomX, randomY, ship.length, isHorizontal);
                placed = true;
                console.log(randomX, randomY, ship.length)

                // Remove ship from shipData
                shipsData = shipsData.filter(s => s.name !== ship.name)

                const shipElement = shipSelector.querySelector(`[data-name='${ship.name}']`);
                if (shipElement) {
                    shipSelector.removeChild(shipElement);
                }

                placedShips.push(ship.name);

                renderShips()

                if (placedShips.length === 5) {
                    createStartButton();
                }
            }
        }
    })
}

function createStartButton() {
    buttonDiv.replaceChildren();

    const startButton = document.createElement('button');
    startButton.setAttribute('id', 'start-button');
    startButton.classList.add('button');
    startButton.textContent = 'Start Game';
    shipSelector.append(startButton)

    startButton.addEventListener('click', () => {
        startGame();
    });
}

function resetGame() {
    playerGrid.replaceChildren();
    computerGrid.replaceChildren();

    isHorizontal = true;
    gameStart = false

    createGrid(playerGrid);
    createGrid(computerGrid);

    shipsData = [
        { name: 'Carrier', length: 5 },
        { name: 'Battleship', length: 4 },
        { name: 'Cruiser', length: 3 },
        { name: 'Submarine', length: 3 },
        { name: 'Patrol-Boat', length: 2 },
    ];
    
    player = new Player('Player', 'real')
    computer = new Player('Computer', 'computer')

    placedShips = [];

    renderShips();
    placeComputerShips();

    buttonDiv.replaceChildren()
    createButtons();
}

function attackCell(e) {
    if (gameStart) {
        let targetCell = e.target;

        if (!targetCell.classList.contains('cell') || targetCell.classList.contains('attacked')) {
            console.log('Cell already attacked')
            return;
        }
    
        const cellX = parseInt(targetCell.getAttribute('data-row'));
        const cellY = parseInt(targetCell.getAttribute('data-column'));
    
        console.log(cellX, cellY)
    
        let attackSuccess = computer.gameboard.receiveAttack(cellX, cellY);
    
        console.log(attackSuccess)
    
        if (attackSuccess) {
            targetCell.classList.add('hit');
        } else {
            targetCell.classList.add('miss');
        }

        targetCell.classList.add('attacked');
    
        if (computer.gameboard.allShipsSunk()) {
            winMessage('You win!');
            gameStart = false;
        } else {
            computerAttack();
        }
    }
}

function computerAttack() {
    let cellX = Math.floor(Math.random() * 10);
    let cellY = Math.floor(Math.random() * 10);
    let targetCell = playerGrid.querySelector(`.cell[data-row='${cellX}'][data-column='${cellY}']`);

    // Check if the cell has already been attacked
    if (targetCell.classList.contains('attacked')) {
        computerAttack();

        return;
    }

    console.log(`Computer attacks [${cellX}, ${cellY}]`);

    const attackSuccess = player.gameboard.receiveAttack(cellX, cellY);

    if (attackSuccess) {
        targetCell.classList.add('hit');
    } else {
        targetCell.classList.add('miss');
    }

    targetCell.classList.add('attacked');

    if (player.gameboard.allShipsSunk()) {
        winMessage('Computer wins!');
        gameStart = false; // Optionally stop the game if all ships are sunk
    }
}

function winMessage(msg) {
    const message = document.createElement('h1');
    message.classList.add('win-message');
    message.textContent = msg;
    shipSelector.append(message)
}

function startGame() {
    console.log('Start Game')
    
    gameStart = true

    shipSelector.replaceChildren();
}

initializeGame();

