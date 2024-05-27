import createGrid from "./createGrid";

export default function createShip(container, length, name, orientation) {
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