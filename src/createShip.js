export default function createShip(name, length, isHorizontal, container) {
    const ship = document.createElement('div');
    ship.classList.add('ship');
    ship.setAttribute('data-length', length);
    ship.setAttribute('data-name', name);
    ship.setAttribute('draggable', true)
    ship.setAttribute('data-horizontal', isHorizontal);

    if (isHorizontal) {
        ship.classList.add('horizontal');
    } else {
        ship.classList.add('vertical');
    }

    for (let i = 0; i < length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add('ship-cell');
        ship.appendChild(cell);
    }

    container.append(ship);
}