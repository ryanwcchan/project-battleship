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

    describe("receiveAttack function", () => {
        it('should takes a pair of coordinates and determines if the attack hit a ship.', () => {
            let newBoard = new Gameboard(8, 8);
            newBoard.placeShip(0, 0, 5, 'vertical');

            expect(newBoard.receiveAttack(0, 0)).toBe(true)
        })
    })

    describe('Gameboard.shipCoords', () => {
        it('should report coordinates where ships exist', () => {
            let gameboard = new Gameboard(6, 6);
            gameboard.placeShip(0, 0, 5, 'vertical');
            expect(gameboard.shipCoords()).toEqual([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
        });
    });

    describe('Gameboard.missed', () => {
        it('should keep track of missed attacks and display them properly.', () => {
            let board = new Gameboard(7, 7);
            board.placeShip(0, 0, 1, 'horizontal');
            board.receiveAttack(0, 1)
            expect(board.missed).toEqual([[0, 1]])
        });
    });

    describe('Gameboard.sunk', () => {
        it('should return an array of sunk ships.', () => {
            let board = new Gameboard(5, 5);
            board.placeShip(0, 0, 2, "vertical"); // Ship 1
            board.placeShip(1, 1, 2, "horizontal"); // Ship 2
            // Sink ship 2
            board.receiveAttack(1, 1);
            board.receiveAttack(2, 1);

            expect(board.sunk.length).toBe(1);
        });
    });
});
