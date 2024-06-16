import Gameboard from "./gameboard";

class Player {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.score = 0;
        this.gameboard = new Gameboard(10, 10);
    }

    addShip(x, y) {
        this.gameboard.placeShip(x, y)
    }

    recieveAttack(x, y) {
        this.gameboard.receiveAttack(x, y)
    }
}

export default Player