const Ship = require('./ship')

class Gameboard {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.missed = [];

        for (let i = 0; i < this.rows; i++) {
            let row = []
            for (let j = 0; j < this.cols; j++) {
                row.push(null);
            }
            this.grid.push(row);
        }
    }

    placeShip(startX, startY, length, orientation) {
        // Create new ship object
        const ship = new Ship(length);

        // Placing ship on coordinates
        if (orientation === "horizontal") {
            for (let i = 0; i < length; i++) {
                if (startX + i >= this.cols) {
                    throw new Error("Ship placement out of bounds")
                }

                if (this.grid[startX + i][startY] !== null) {
                    throw new Error("Cannot place ship here");
                }

                this.grid[startX + i][startY] = ship;
            }
        } else if (orientation === "vertical") {
            for (let i = 0; i < length; i++) {
                if (startY + i >= this.rows) {
                    throw new Error("Ship placement out of bounds")
                }

                if (this.grid[startX][startY + i] !== null) {
                    throw new Error("Cannot place ship here");
                }

                this.grid[startX][startY + i] = ship;
            }
        }
    }

    receiveAttack(x, y) {
        const attack = this.grid[x][y];

        if (attack instanceof Ship) {
            attack.hit();
            return true;
        } else {
            // Keep track of missed spots
            this.missed.push({ x, y })
            return false
        }
    }
}

module.exports = Gameboard;