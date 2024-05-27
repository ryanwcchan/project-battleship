export default function dragFunctions() {
    const draggables = document.querySelectorAll('.ship-div');
    const playerContainer = document.querySelector('#player-grid')
    const cells = playerContainer.querySelectorAll('.cell')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
            console.log('drag start');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    cells.forEach(cell => {
        cell.addEventListener('dragover', () => {
            const draggable = document.querySelector('.dragging')
            cell.appendChild(draggable)
        });
    });
}