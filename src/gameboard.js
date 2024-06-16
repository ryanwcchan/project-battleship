import Ship from './ship';

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

    placeShip(startX, startY, length, isHorizontal) {
        // Create new ship object
        const ship = new Ship(length);

        // Placing ship on coordinates
        if (isHorizontal) {
            for (let i = 0; i < length; i++) {
                // console.log(`gameboard.placeShip = ${[startX]} ${[startY + i]}`)
                this.grid[startX][startY + i] = ship;
                ship.coords.push([startX, (startY + i)])
            }
        } else {
            for (let i = 0; i < length; i++) {
                // console.log(`gameboard.placeShip = ${[startX + i]} ${[startY]}`)
                this.grid[startX + i][startY] = ship;
                ship.coords.push([(startX + i), startY])
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

export default Gameboard;