const Gameboard = require('./gameboard');

describe('Gameboards', () => {
    describe('should initialize a grid based on declared rows and cols when', () => {
        it('a new instance of Gameboard class with 8 rows and 8 columns is created.', () => {
            let newBoard = new Gameboard(8, 8);

            expect(newBoard.grid.length).toBe(8);
            newBoard.grid.forEach(row => {
                expect(row.length).toBe(8)
            })
        })
    })

    describe('placeShip function', () => {
        it.todo('should be able to place ships at specific coordinates by calling the ship class')
    })


    it.todo('should have a recieveAttack function that takes a pair of coordinates and determines if the attack hit a ship.')


})