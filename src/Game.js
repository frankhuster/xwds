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
    }
  }

  addBoardTile(id, tile) {
    this.boardTiles.set(id, tile);
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

  dropTrayTileOnTray(t) {
    const id = this.getSelectedTrayTileId();
    const tile = this.trayTiles.get(id);
    this.trayTiles.set(t, tile);
    this.trayTiles.delete(id);
  }

  getSelectedTrayTileId() {
    var id = null;
    this.trayTiles.forEach((v, k) => { 
      if (v.selected) {
        id = k;
      }
    });
    if (id === null) {
      throw new Error("No selected tile in the tray");
    }
    return (id);
  }

  dropSelectedTrayTile(row, col) {
    const trayTileId = this.getSelectedTrayTileId();
    const trayTile = this.trayTiles.get(trayTileId);
    this.trayTiles.delete(trayTileId);
    const boardTileId = idFromRowCol(row, col);
    if (this.boardTiles.has(boardTileId)) {
      throw new Error(`Trying to drop tray tile ${trayTileId} on existing tile ${boardTileId}`);
    }
    this.boardTiles.set(boardTileId, { letter: trayTile.letter, candidate: true });
  }
}
