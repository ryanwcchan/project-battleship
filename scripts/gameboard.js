class Gameboard {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];

        for (let i = 0; i < this.rows; i++) {
            let row = []
            for (let j = 0; j < this.cols; j++) {
                row.push(null);
            }
            this.grid.push(row);
        }
    }

    placeShip() {

    }
}

module.exports = Gameboard;