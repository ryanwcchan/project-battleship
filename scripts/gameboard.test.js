class Gameboard {
    constructor() {

    }
}

describe('Gameboard', () => {
    it('should exist', () => {
        let newBoard = new Gameboard();
        expect(typeof newBoard).toBe('object')
    })
})