import createGrid from "./createGrid";

export default function pickShips(container) {
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

    shipData.forEach(ship => {
        createShip(wrapper, 1, ship.length, ship.name);
    });

    rotateButton.addEventListener('click', () => {
        if (orientation === 'horizontal') {
            orientation = 'vertical';

        } else {
            orientation = 'horizontal';
        }
        console.log(orientation)
    });

    pickShipDiv.appendChild(rotateButton);
    pickShipDiv.appendChild(wrapper);
    container.appendChild(pickShipDiv);
}

function createShip(container, height, length, name) {
    const shipDiv = document.createElement('div');
    const shipName = document.createElement('span')
    shipName.classList.add('ship-name');
    shipName.textContent = name;
    shipDiv.classList.add('ship-div');
    createGrid(shipDiv, height, length);

    const rows = shipDiv.querySelectorAll('.row')

    rows.forEach(row => {
        const cells = row.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.backgroundColor = 'red'
        })

        row.setAttribute('draggable', 'true');
    });

    shipDiv.appendChild(shipName)
    container.appendChild(shipDiv);
}

