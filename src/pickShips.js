import createShip from "./createShip";
import dragFunctions from "./dragFunctions";

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
        createShip(wrapper, ship.length, ship.name, orientation);
    });
}