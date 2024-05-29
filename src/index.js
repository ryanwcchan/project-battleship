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

function shipSelection() {

}