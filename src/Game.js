import { idFromRowCol } from "./Helper"

export default class Game {
  static boardSize = 5
  static traySize = 5
  constructor(game = null) {
  if (game) {
      this.boardTiles = structuredClone(game.boardTiles)
      this.trayTiles = structuredClone(game.trayTiles)
      this.potentials = structuredClone(game.potentials)
    } else {
      this.boardTiles = new Map()
      this.trayTiles = new Map()
      this.calculatePotentials()
    }
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
        var tile = this.boardTiles.get(idFromRowCol(row, col))
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
      this.trayTiles.set(t, { letter: tile.letter })
      this.trayTiles.delete(id)
      return
    }

    id = this.getSelectedBoardTileId()
    if (id != null) {
      const tile = this.boardTiles.get(id)
      this.trayTiles.set(t, { letter: tile.letter })
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
      this.addBoardTile(boardTileId, { letter: tile.letter, candidate: true })
      this.selectBoardTile(row, col)
      return
    }

    id = this.getSelectedBoardTileId()
    if (id != null) {
      const tile = this.boardTiles.get(id)
      this.boardTiles.delete(id)
      this.addBoardTile(boardTileId, { letter: tile.letter, candidate: true })
      this.selectBoardTile(row, col)
      return
    }

    throw new Error("No selected tile in the tray")
  }

  isFinalBoardTile(row, col) {
    const id = idFromRowCol(row, col)
    if (this.boardTiles.has(id)) {
      const tile = this.boardTiles.get(id)
      if (!tile.candidate) {
        return true
      }
    }
    return false
  }
}
