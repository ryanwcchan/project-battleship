class Ship {
    constructor() {
        this.hits = 0
        this.length = 0
    }

    hit() {
        return this.hits
    }

    isSunk() {
        return this.hits === this.length
    }
}

describe('Ship.hit()', () => {
    it('should return number of hits to ship.', () => {
        const s = new Ship();

        expect(s.hit()).toBe(0)
    });
});

describe('Ship.isSunk()', () => {
    it('should calculate if a ship is sunk based on its length and number of hits received.', () => {
        let s1 = new Ship();
        s1.length = 5;
        s1.hits = 5

        expect(s1.isSunk()).toBe(true)
    });
});