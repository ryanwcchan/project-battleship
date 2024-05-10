const Ship = require('./ship')

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

    placeShip(startY, startX, length, orientation) {
        // Create new ship object
        const ship = new Ship(length);

        // Placing ship on coordinates
        if (orientation === "horizontal") {
            for (let i = 0; i < length; i++) {
                if (startX + i >= this.cols) {
                    throw new Error("Ship placement out of bounds")
                }

                if (this.grid[startY][startX + i] !== null) {
                    throw new Error("Cannot place ship here");
                }

                this.grid[startY][startX + i] = ship;
            }
        } else if (orientation === "vertical") {
            for (let i = 0; i < length; i++) {
                if (startY + i >= this.rows) {
                    throw new Error("Ship placement out of bounds")
                }

                if (this, grid[startY + i][startX] !== null) {
                    throw new Error("Cannot place ship here");
                }

                this.grid[startY + i][startX] = ship;
            }
        }
    }
}

module.exports = Gameboard;