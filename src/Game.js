export default class Game {
  constructor(isDemo = true) {
    this.boardSize = 5;
    this.boardTiles = new Map();
    if (isDemo) {
      this.#setupDemo();
    }
  }

  #setupDemo() {
    this.boardTiles.set('r0c1', { letter: "H" });
    this.boardTiles.set('r1c1', { letter: "E" });
    this.boardTiles.set('r2c1', { letter: "L" });
    this.boardTiles.set('r3c1', { letter: "L" });
    this.boardTiles.set('r4c1', { letter: "O" });
    this.boardTiles.set('r4c0', { letter: "W" });
    this.boardTiles.set('r4c2', { letter: "R" });
    this.boardTiles.set('r4c3', { letter: "L" });
    this.boardTiles.set('r4c4', { letter: "D" });
  }
}
