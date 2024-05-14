const Ship = require('./ship')

class Gameboard {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.missed = [];
        this.ships = [];
        this.sunk = [];

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
                ship.coords.push([(startX + i), startY])
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
                ship.coords.push([startX, (startY + i)])
            }
        }

        this.ships.push(ship);
    }

    receiveAttack(x, y) {
        const attack = this.grid[x][y];

        if (attack instanceof Ship) {
            attack.hit();
            if (attack.isSunk()) {
                this.sunk.push(attack)
            }
            return true;
        } else {
            // Keep track of missed spots
            this.missed.push([x, y])
            return false
        }
    }

    shipCoords() {
        const shipCoords = [];
        for (const s of this.ships) {
            shipCoords.push(...s.coords)
        }
        return shipCoords;
    }

    allShipsSunk() {
        return this.ships.length === this.sunk.length;
    }
}

module.exports = Gameboard;