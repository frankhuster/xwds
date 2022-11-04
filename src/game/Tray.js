import LetterBag from './LetterBag'
import Constants from '../Constants'

export default class Tray {
  constructor(tileArray) {
    this.tiles = new Map(tileArray)
  }

  toTileArray() {
    return Array.from(this.tiles.entries())
  }

  add(t, letter) {
    if (this.tiles.has(t)) throw new Error(`Cannot add ${letter} over existing tray tile ${t}`)
    this.tiles.set(t, { letter: letter })
  }

  addAll(tiles) {
    const letters = []
    tiles.forEach(tile => { letters.push(tile.letter) })

    for (var t = 0; t < Constants.traySize; t++) {
      if (this.tiles.has(t)) continue
      this.add(t, letters.shift())
    }

    if (letters.length > 0) throw new Error(`No room to place all letters on tray`)
  }

  del(t) {
    if (this.tiles.has(t)) {
      this.tiles.delete(t)
    } else {
      throw new Error(`Cannot delete inexistant tray tile ${t}`)
    }
  }

  get(t) {
    return this.tiles.get(t)
  }

  isEmpty(t) {
    return !this.get(t)
  }

  deselect() {
    this.tiles.forEach(tile => delete tile.selected)
  }

  select(t) {
    const tile = this.tiles.get(t)
    if (tile) {
      this.deselect()
      tile.selected = true
    } else {
      throw new Error(`Cannot select inexistant tray tile ${t}`)
    }
  }

  getSelected() {
    var id = null
    this.tiles.forEach((val, key) => {
      if (val.selected) {
        id = key
      }
    })
    return id
  }

  isAnySelected() {
    return this.getSelected() !== null
  }

  drop(t, tile) {
    if (this.tiles.has(t)) throw new Error(`Cannot drop ${tile.letter} over existing tray tile ${t}`)
    this.tiles.set(t, tile)
    this.select(t)
  }

  getTiles() {
    return this.tiles
  }

  getLetters() {
    return Array.from(this.tiles.values()).map(e => e.letter)
  }

  getTileCount() {
    return this.tiles.size
  }

  static pickTilesFromBag(letters = []) {
    const tiles = new Map()
    const bag = new LetterBag()
    if (letters.length > 0) bag.remove(letters)
    const picks = bag.pick(Constants.traySize)
    picks.forEach((letter, idx) => {
      tiles.set(idx, { letter: letter })
    })
    return tiles
  }
}
