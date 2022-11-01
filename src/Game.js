import { idFromRowCol } from "./Helper"

export default class Game {
  static boardSize = 5
  static traySize = 5

  static clone(game) {
    const g = new Game()
    g.boardTiles = structuredClone(game.boardTiles)
    g.trayTiles = structuredClone(game.trayTiles)
    g.potentials = structuredClone(game.potentials)
    g.originalTrayTiles = structuredClone(game.originalTrayTiles)
    return g
  }

  static start(boardTiles, trayTiles) {
    const g = new Game()
    g.boardTiles = structuredClone(boardTiles)
    g.trayTiles = structuredClone(trayTiles)
    g.originalTrayTiles = structuredClone(trayTiles)
    g.calculatePotentials()
    return g
  }

  isBoardEmpty(row, col) {
    const id = idFromRowCol(row, col)
    return !this.boardTiles.has(id)
  }

  increasePotential(row, col) {
    const id = idFromRowCol(row, col)
    this.potentials.set(id, this.potentials.get(id) + 1)
  }

  calculatePotentials() {
    this.potentials = new Map()

    for (let row = 0; row < Game.boardSize; row++) {
      for (let col = 0; col < Game.boardSize; col++) {
        this.potentials.set(idFromRowCol(row, col), 0)
      }
    }

    for (let row = 0; row < Game.boardSize; row++) {
      for (let col = 0; col < Game.boardSize; col++) {
        const tile = this.boardTiles.get(idFromRowCol(row, col))
        if (tile && !tile.selected) {
          if (row > 0 && this.isBoardEmpty(row-1, col)) {
            this.increasePotential(row-1, col)
          }
          if (row < (Game.boardSize-1) && this.isBoardEmpty(row+1, col)) {
            this.increasePotential(row+1, col)
          }
          if (col > 0 && this.isBoardEmpty(row, col-1)) {
            this.increasePotential(row, col-1)
          }
          if (col < (Game.boardSize-1) && this.isBoardEmpty(row, col+1)) {
            this.increasePotential(row, col+1)
          }
        }
      }
    }
  }

  addBoardTile(id, tile) {
    this.boardTiles.set(id, tile)
  }

  removeBoardTile(id) {
    this.boardTiles.delete(id)
  }

  addTrayTile(id, tile) {
    this.trayTiles.set(id, tile)
  }

  removeTrayTile(id) {
    this.trayTiles.delete(id)
  }

  selectTrayTile(t) {
    this.trayTiles.forEach((v, k) => { v.selected = (k === t) })
    this.boardTiles.forEach((v) => { v.selected = false })
  }

  selectBoardTile(row, col) {
    const id = idFromRowCol(row, col)
    this.boardTiles.forEach((v, k) => { v.selected = (k === id) })
    this.trayTiles.forEach((v) => {v.selected = false})
  }

  isAnythingSelected() {
    return this.getSelectedTrayTileId() !== null || this.getSelectedBoardTileId() !== null 
  }

  getSelectedTrayTileId() {
    for (const [key, val] of this.trayTiles) {
      if (val.selected) return key
    }
    return null
  }

  getSelectedBoardTileId() {
    for (const [key, val] of this.boardTiles) {
      if (val.selected) return key
    }
    return null
  }

  dropTileOnTray(t) {
    if (this.trayTiles.has(t)) throw new Error(`Cannot drop tile over existing tray tile ${t}`)

    var id = this.getSelectedTrayTileId()
    if (id != null) {
      const tile = this.trayTiles.get(id)
      this.trayTiles.set(t, tile)
      this.trayTiles.delete(id)
      return
    }

    id = this.getSelectedBoardTileId()
    if (id != null) {
      const tile = this.boardTiles.get(id)
      this.trayTiles.set(t, tile)
      this.boardTiles.delete(id)
      return
    }

    throw new Error("Found no selected tile to drop")
  }

  dropTileOnBoard(row, col) {
    const boardTileId = idFromRowCol(row, col)
    if (this.boardTiles.has(boardTileId)) {
      throw new Error(`Cannot drop tile over existing board tile ${boardTileId}`)
    }

    var id = this.getSelectedTrayTileId()
    if (id != null) {
      const tile = this.trayTiles.get(id)
      this.trayTiles.delete(id)
      this.addBoardTile(boardTileId, tile)
      return
    }

    id = this.getSelectedBoardTileId()
    if (id != null) {
      const tile = this.boardTiles.get(id)
      this.boardTiles.delete(id)
      this.addBoardTile(boardTileId, tile)
      return
    }

    throw new Error("No selected tile in the tray")
  }

  reset() {
    this.boardTiles.forEach((val, key, map) => {
      if (val.candidate) {
        map.delete(key)
      }
    })
    this.trayTiles = structuredClone(this.originalTrayTiles)
  }
}
