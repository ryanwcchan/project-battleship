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
        createShip(wrapper, ship.length, ship.name, orientation);
    });

    rotateButton.addEventListener('click', () => {
        if (orientation === 'horizontal') {
            orientation = 'vertical';
            wrapper.replaceChildren();
            shipData.forEach(ship => {
                createShip(wrapper, ship.length, ship.name, orientation);
            });
        } else {
            orientation = 'horizontal';
            wrapper.replaceChildren();
            shipData.forEach(ship => {
                createShip(wrapper, ship.length, ship.name, orientation);
            });
        }
        console.log(orientation);
    });

    pickShipDiv.appendChild(rotateButton);
    pickShipDiv.appendChild(wrapper);
    container.appendChild(pickShipDiv);
}

function createShip(container, length, name, orientation) {
    const shipWrapper = document.createElement('div');
    const shipDiv = document.createElement('div');
    const shipName = document.createElement('span');
    shipWrapper.classList.add('ship-wrapper');
    shipName.classList.add('ship-name');
    shipName.textContent = name;
    shipDiv.classList.add('ship-div');

    if (orientation === 'horizontal') {
        createGrid(shipDiv, 1, length);
    } else {
        createGrid(shipDiv, length, 1);
    }

    const cells = shipDiv.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'red'
    });

    shipDiv.setAttribute('draggable', 'true')

    shipWrapper.appendChild(shipDiv);
    shipWrapper.appendChild(shipName);
    container.appendChild(shipWrapper);
}