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

describe('Ship.hit()', () => {
    it('should increase number of hits to ship.', () => {
        const s = new Ship(3);
        const initial = s.hits

        s.hit();

        expect(s.hit()).toBe(initial + 1)
    });
});

describe('Ship.isSunk()', () => {
    it('should calculate if a ship is sunk based on its length and number of hits received.', () => {
        let s1 = new Ship(5);
        s1.hits = 5

        expect(s1.isSunk()).toBe(true)
    });
});