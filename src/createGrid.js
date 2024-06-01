export default function createGrid(container) {
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < 10; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-column', j);
            row.appendChild(cell);
        }

        container.appendChild(row);
    }
}