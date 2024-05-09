class Ship {
    constructor(length) {
        this.hits = 0
        this.length = length
        this.sunk = false
    }

    hit() {
        return this.hits++
    }

    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Ship;