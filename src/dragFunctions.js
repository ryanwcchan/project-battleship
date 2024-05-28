export default function dragFunctions() {
    const draggables = document.querySelectorAll('.ship-div');
    const playerContainer = document.querySelector('#player-grid');
    const cells = playerContainer.querySelectorAll('.cell');

    draggables.forEach(draggable => {
        // originalContainer = draggable.parentNode
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', '');
            draggable.classList.add('dragging');
            console.log('drag start');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            // const validDrop = checkValid(draggable);
            // if (!validDrop) {
            //     originalContainer.appendChild(draggable)
            // }
        });
    });

    cells.forEach(cell => {
        cell.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging')
            if (draggable) {
                cell.appendChild(draggable);
            }
        });

        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            if (draggable) {
                cell.append(draggable)
                draggable.classList.remove('dragging')
            };
        });
    });
};

// function checkValid(draggable, targetCell) {
//     const grid = document.querySelector('#player-grid');
//     const cells = Array.from(grid.querySelectorAll('.cell'));
//     const length = parseInt(draggable.getAttribute('data-length'));
//     const orientation = draggable.getAttribute('data-orientation');
//     const startIndex = cells.indexOf(targetCell);

//     const row = Math.floor(startIndex / 10);
//     const col = startIndex % 10;

//     return canPlaceShip(row, col, length, orientation)
// }

// function canPlaceShip(row, col, length, orientation) {
//     if (orientation === 'horizontal' && col + length > 10) {
//         return false;
//     }

//     if (orientation === 'vertical' && row + length) {
//         return false;
//     }

//     return true;
// }

// function placeShip(startCell, draggable) {
//     const grid = document.querySelector('#player-grid');
//     const cells = Array.from(grid.querySelectorAll('.cell'));
//     const length = parseInt(draggable.getAttribute('data-length'));
//     const orientation = draggable.getAttribute('data-orientation');
//     const startIndex = cells.indexOf(startCell);

    
// }