import createGrid from './createGrid.js'

export default function newGame(container) {
    const playerGrid = document.createElement('div');
    const enemyGrid = document.createElement('div');
    playerGrid.classList.add('grid-container');
    enemyGrid.classList.add('grid-container');
    playerGrid.setAttribute("id", "player-grid");
    enemyGrid.setAttribute("id", "enemy-grid");

    container.appendChild(playerGrid);
    container.appendChild(enemyGrid);
    createGrid(playerGrid, 10, 10);
    createGrid(enemyGrid, 10, 10);
    console.log("Reset grid")
}