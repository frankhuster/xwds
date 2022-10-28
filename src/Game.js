import { idFromRowCol } from "./Helper";

export default class Game {
  constructor(game = null) {
    this.boardSize = 5;
    this.traySize = 5;
    this.boardTiles = new Map();
    this.trayTiles = new Map();
    if (game) {
      game.boardTiles.forEach((v, k) => this.boardTiles.set(k, structuredClone(v)));
      game.trayTiles.forEach((v, k) => this.trayTiles.set(k, structuredClone(v)));
      this.potentials = new Map();
      game.potentials.forEach((v, k) => this.potentials.set(k, v));
    } else {
      this.calculatePotentials();
    }
  }

  isEmpty(row, col) {
    const id = idFromRowCol(row, col);
    if (this.boardTiles.has(id)) {
      return false;
    }
    return true;
  }

  increasePotential(row, col) {
    const id = idFromRowCol(row, col);
    this.potentials.set(id, this.potentials.get(id) + 1);
  }

  calculatePotentials() {
    this.potentials = new Map();

    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        this.potentials.set(idFromRowCol(row, col), 0);
      }
    }

    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        var tile = this.boardTiles.get(idFromRowCol(row, col));
        if (tile && !tile.selected) {
          if (row > 0 && this.isEmpty(row-1, col)) {
            this.increasePotential(row-1, col);
          }
          if (row < (this.boardSize-1) && this.isEmpty(row+1, col)) {
            this.increasePotential(row+1, col);
          }
          if (col > 0 && this.isEmpty(row, col-1)) {
            this.increasePotential(row, col-1);
          }
          if (col < (this.boardSize-1) && this.isEmpty(row, col+1)) {
            this.increasePotential(row, col+1);
          }
        }
      }
    }
  }

  addBoardTile(id, tile) {
    this.boardTiles.set(id, tile);
  }

  removeBoardTile(id) {
    this.boardTiles.delete(id);
  }

  addTrayTile(id, tile) {
    this.trayTiles.set(id, tile);
  }

  selectTrayTile(t) {
    this.trayTiles.forEach((v, k) => { 
      if (k === t) {
        v.selected = true;
      } else {
        v.selected = false;
      }
    });
    this.boardTiles.forEach((v) => {v.selected = false;});
  }

  selectBoardTile(row, col) {
    const id = idFromRowCol(row, col);
    this.boardTiles.forEach((v, k) => { 
      if (k === id) {
        v.selected = true;
      } else {
        v.selected = false;
      }
    });
    this.trayTiles.forEach((v) => {v.selected = false;});
  }

  isAnythingSelected() {
    if (this.getSelectedTrayTileId() != null) return true;
    if (this.getSelectedBoardTileId() != null) return true;
    return false;
  }

  getSelectedTrayTileId() {
    var id = null;
    this.trayTiles.forEach((v, k) => { 
      if (v.selected) {
        id = k;
      }
    });
    return (id);
  }

  getSelectedBoardTileId() {
    var id = null;
    this.boardTiles.forEach((v, k) => { 
      if (v.selected) {
        id = k;
      }
    });
    return (id);
  }

  dropTileOnTray(t) {
    if (this.trayTiles.has(t)) throw new Error(`Cannot drop tile on existing tray tile ${t}`);

    var id = this.getSelectedTrayTileId();
    if (id != null) {
      const tile = this.trayTiles.get(id);
      this.trayTiles.set(t, tile);
      this.trayTiles.delete(id);
      return;
    }

    id = this.getSelectedBoardTileId();
    if (id != null) {
      const tile = this.boardTiles.get(id);
      this.trayTiles.set(t, {letter: tile.letter, selected: true});
      this.boardTiles.delete(id);
      return;
    }

    throw new Error("Found no selected tile to drop");
  }

  dropTileOnBoard(row, col) {
    const boardTileId = idFromRowCol(row, col);
    if (this.boardTiles.has(boardTileId)) {
      throw new Error(`Cannot drop tile on existing board tile ${boardTileId}`);
    }

    var id = this.getSelectedTrayTileId();
    if (id != null) {
      const tile = this.trayTiles.get(id);
      this.trayTiles.delete(id);
      this.addBoardTile(boardTileId, { letter: tile.letter, candidate: true });
      this.selectBoardTile(row, col);
      return;
    }

    id = this.getSelectedBoardTileId();
    if (id != null) {
      const tile = this.boardTiles.get(id);
      this.boardTiles.delete(id);
      this.addBoardTile(boardTileId, { letter: tile.letter, candidate: true });
      this.selectBoardTile(row, col);
      return;
    }

    throw new Error("No selected tile in the tray");

  }

  isFinalBoardTile(row, col) {
    const id = idFromRowCol(row, col);
    if (this.boardTiles.has(id)) {
      const tile = this.boardTiles.get(id);
      if (!tile.candidate) {
        return true;
      }
    }
    return false;
  }

  //todo change this strategy with a neighbour count - and decrease the count when removing a tile
  // canDrop(row, col) {
  //   if (row > 0) {
  //     if (this.isFinalBoardTile(row-1, col)) {
  //       return true;
  //     }
  //   }
  //   if (row < (this.boardSize-1)) {
  //     if (this.isFinalBoardTile(row+1, col)) {
  //       return true;
  //     }
  //   }
  //   if (col > 0) {
  //     if (this.isFinalBoardTile(row, col-1)) {
  //       return true;
  //     }
  //   }
  //   if (col < (this.boardSize-1)) {
  //     if (this.isFinalBoardTile(row, col+1)) {
  //       return true;
  //     }
  //   }
  // }
}
