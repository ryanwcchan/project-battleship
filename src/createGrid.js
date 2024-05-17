const gridContainer = document.querySelector('.grid-container')

export default function createGrid(width, height) {
    for (let i = 0; i < width; i++) {
        createRow(height);
    }
}

function createRow(size) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let i = 0; i < size; i++) {
        let cell = document.createElement('div');
        // Add id to div 
        // cell.id = `cell-${i}`
        // Add class to div
        cell.classList.add('cell')
        row.appendChild(cell)
    }
    gridContainer.appendChild(row)
}

