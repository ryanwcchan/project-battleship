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

// function createGrid(grid) {
//     for (let i = 0; i < 100; i++) {
//         const cell = document.createElement('div');
//         cell.classList.add('cell');
//         cell.setAttribute('data-id', i);
//         grid.appendChild(cell);
//     }
// }

function createGrid(container) {
    for (let i = 0; i < 10; i++) {
        createRow(container, 10, i);
    }
}

function createRow(container, size, rowIndex) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let i = 0; i < size; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-row', rowIndex);
        cell.setAttribute('data-column', i);
        row.appendChild(cell);
    }
    container.appendChild(row);
}