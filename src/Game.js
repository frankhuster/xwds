import { idFromRowCol, rowColFromId } from "./Helper";

export default class Game {
  constructor(game = null) {
    this.boardSize = 5;
    this.traySize = 5;
    this.boardTiles = new Map();
    this.potentials = new Map();
    this.trayTiles = new Map();
    if (game) {
      game.boardTiles.forEach((v, k) => this.boardTiles.set(k, structuredClone(v)));
      game.potentials.forEach((v, k) => this.potentials.set(k, structuredClone(v)));
      game.trayTiles.forEach((v, k) => this.trayTiles.set(k, structuredClone(v)));
    }
  }

  isEmpty(row, col) {
    const id = idFromRowCol(row, col);
    if (this.boardTiles.has(id)) {
      return false;
    }
    return true;
  }

  addPotential(row, col) {
    const id = idFromRowCol(row, col);
    if (this.potentials.has(id)) {
      return;
    }
    this.potentials.set(id, true);
  }

  addBoardTile(id, tile) {
    this.potentials.delete(id);
    this.boardTiles.set(id, tile);
    const [row, col] = rowColFromId(id);
    if (row > 0 && this.isEmpty(row-1, col)) {
      this.addPotential(row-1, col);
    }
    if (row < (this.boardSize-1) && this.isEmpty(row+1, col)) {
      this.addPotential(row+1, col);
    }
    if (col > 0 && this.isEmpty(row, col-1)) {
      this.addPotential(row, col-1);
    }
    if (col < (this.boardSize-1) && this.isEmpty(row, col+1)) {
      this.addPotential(row, col+1);
    }
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

  dropTrayTileOnTray(t) {
    const id = this.getSelectedTrayTileId();
    if (id === null) {
      throw new Error("No selected tile in the tray");
    }
    const tile = this.trayTiles.get(id);
    this.trayTiles.set(t, tile);
    this.trayTiles.delete(id);
  }

  dropTrayTileOnBoard(row, col) {
    const trayTileId = this.getSelectedTrayTileId();
    if (trayTileId === null) {
      throw new Error("No selected tile in the tray");
    }
    const tile = this.trayTiles.get(trayTileId);
    this.trayTiles.delete(trayTileId);
    const boardTileId = idFromRowCol(row, col);
    if (this.boardTiles.has(boardTileId)) {
      throw new Error(`Trying to drop tray tile ${trayTileId} on existing tile ${boardTileId}`);
    }
    this.addBoardTile(boardTileId, { letter: tile.letter, candidate: true });
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

  canDrop(row, col) {
    if (row > 0) {
      if (this.isFinalBoardTile(row-1, col)) {
        return true;
      }
    }
    if (row < (this.boardSize-1)) {
      if (this.isFinalBoardTile(row+1, col)) {
        return true;
      }
    }
    if (col > 0) {
      if (this.isFinalBoardTile(row, col-1)) {
        return true;
      }
    }
    if (col < (this.boardSize-1)) {
      if (this.isFinalBoardTile(row, col+1)) {
        return true;
      }
    }
  }
}
