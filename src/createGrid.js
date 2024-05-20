export default function createGrid(container, width, height) {
    for (let i = 0; i < width; i++) {
        createRow(container, height);
    }
}

function createRow(container, size) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let i = 0; i < size; i++) {
        let cell = document.createElement('div');
        // Add id to div 
        // cell.id = `cell-${i}`
        // Add class to div
        cell.classList.add('cell');
        row.appendChild(cell);
    }
    container.appendChild(row);
}

