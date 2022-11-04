import Board from './Board'
import rulesEnforcer from './rulesEnforcer'
import Tray from './Tray'

export default class Game {
  constructor(state) {
    this.board = new Board(state.board)
    this.tray = new Tray(state.tray)
    this.errors = Array.from(state.errors)
    this.messages = Array.from(state.messages)
  }

  newGame() {
    this.board = new Board(new Map())
    this.tray = new Tray(Tray.pickTilesFromBag())
  }

  reduce() {
    const state = {}
    state.board = this.board.toTileArray()
      state.tray = this.tray.toTileArray()
      state.errors = this.errors ? Array.from(this.errors) : []
      state.messages = this.messages ? Array.from(this.messages) : []
    return state
  }

  calcControlButtons() {
    const buttons = []

    if (this.board.getTileCount() === 0 && this.tray.getTileCount() === 0) {
      buttons.push({ className: "new-game", label: "New Game", dispatch: "newGame" })
    }

    if (this.board.hasCandidates()) {
      buttons.push({ className: "submit", label: "Submit", dispatch: "submit" })
      buttons.push({ className: "clear", label: "Clear", dispatch: "clear" })
    }

    return buttons
  }

  hasStatus(status) {
    return !!this.getStatuses().find(e => e === status)
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

    throw new Error("Found no selected tile to drop on the tray")
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
      this.board.del(id)
      return
    }

    throw new Error("Found no selected tile to drop on the board")
  }

  selectTrayTile(t) {
    this.tray.select(t)
    this.board.deselect()
  }

  selectBoardTile(row, col) {
    this.board.select(row, col)
    this.tray.deselect()
  }

  submit() {
    this.errors = rulesEnforcer(this.getBoardTiles())
    console.log(this.errors.join(', ') || 'no errors')
    if (this.errors.length > 0) return
    this.board.acceptCandidates()
    this.tray.complete()
  }

  clear() {
    const candidates = this.board.getCandidates()
    this.tray.addAll(candidates)
    this.board.removeAll(candidates)
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

  isInProgress() {
    return this.board.hasCandidates()
  }
}
