const Gameboard = require('./gameboard');
const Ship = require('./ship')

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
        it('should be able to place ships at specific coordinates by calling the ship class', () => {
            let newBoard = new Gameboard(5, 5);
            newBoard.placeShip(1, 2, 2, "horizontal")
            const cell = newBoard.grid[1][2];
            expect(cell).toBeInstanceOf(Ship);
        });

        it('should return an error if out of bounds', () => {
            let newBoard = new Gameboard(4, 4);
            expect(() => newBoard.placeShip(-1, -1, 3, 'vertical')).toThrowError()
        });
    })

    describe("recieveAttack function", () => {
        it('should takes a pair of coordinates and determines if the attack hit a ship.', () => {
            let newBoard = new Gameboard(8, 8);
            newBoard.placeShip(0, 0, 5, 'vertical');

            expect(newBoard.recieveAttack(0, 0)).toBe(true)
        })
    })
})