import createGrid from "./createGrid";

export default function createShip(container, ship, orientation) {
    const shipWrapper = document.createElement('div');
    const shipDiv = document.createElement('div');

    shipWrapper.classList.add('ship-wrapper');

    // Add attributes to shipDiv
    shipDiv.classList.add('ship-div');
    shipDiv.draggable = true;
    shipDiv.setAttribute('id', ship.name);
    shipDiv.setAttribute('data-length', ship.length);
    shipDiv.setAttribute('orientation', orientation);

    // Add ship title
    const shipName = document.createElement('span');
    shipName.classList.add('ship-name');
    shipName.textContent = ship.name;

    // Create ship
    if (orientation === 'horizontal') {
        createGrid(shipDiv, 1, ship.length);
    } else {
        createGrid(shipDiv, ship.length, 1);
    }

    // Change ship cells to red
    const cells = shipDiv.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'red'
    });

    // Add to container
    shipWrapper.appendChild(shipDiv);
    shipWrapper.appendChild(shipName);
    container.appendChild(shipWrapper);
}