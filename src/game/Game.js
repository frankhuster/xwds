import Board from './Board'
import Tray from './Tray'

export default class Game {
  constructor(round = []) {
    this.board = Board.fromRound(round)
    this.tray = Tray.fromRound(round)
  }

  startNewGame() {
    this.board = new Board(new Map())
    this.tray = new Tray(Tray.pickTilesFromBag())
  }

  toRound() {
    const round = this.board.getTileArray().concat(this.tray.getTileArray())
    return round
  }

  isAnySelected() {
    return this.tray.isAnySelected() || this.board.isAnySelected()
  }

  dropTileOnTray(t) {
    var id = this.tray.getSelected()
    if (id != null) {
      const tile = this.tray.get(id)
      this.tray.drop(t, tile)
      this.tray.del(id)
      return
    }

    id = this.board.getSelected()
    if (id != null) {
      const tile = this.board.get(id)
      this.tray.drop(t, tile)
      this.board.del(id)
      return
    }

    throw new Error("Found no selected tile to drop")
  }

  dropTileOnBoard(row, col) {
    var id = this.tray.getSelected()
    if (id != null) {
      const tile = this.tray.get(id)
      tile.candidate = true
      this.board.drop(row, col, tile)
      this.tray.del(id)
      return
    }

    id = this.board.getSelected()
    if (id != null) {
      const tile = this.board.get(id)
      this.board.drop(row, col, tile)
      this.boardTiles.delete(id)
      return
    }

    throw new Error("No selected tile in the tray")
  }

  selectTrayTile(t) {
    this.tray.select(t)
    this.board.deselect()
  }

  selectBoardTile(row, col) {
    this.board.select(row, col)
    this.tray.deselect()
  }

  submitWord() {
  }

  reset() {
  }

  getBoardTiles() {
    return this.board.getTiles()
  }

  getTrayTiles() {
    return this.tray.getTiles()
  }

  getMessages() {
    return this.messages || []
  }

  getErrors() {
    return this.errors || []
  }
}
