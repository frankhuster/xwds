export default class Tray {
  constructor(tiles) {
    this.tiles = tiles
  }

  static fromRound(round) {
    const tiles = new Map(round.filter(e => typeof e[0] === 'number'))
    return new Tray(tiles)
  }

  getTileArray() {
    const tiles = []
    this.tiles.forEach((val, idx) => {
      tiles.push([idx, val])
    })
    return tiles
  }

  add(t, letter) {
    if (this.tiles.has(t)) throw new Error(`Cannot add ${letter} over existing tray tile ${t}`)
    this.tiles.set(t, { letter: letter })
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
    return this.get(t) === null
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
    this.deselect()
  }

  getTiles() {
    return this.tiles
  }
}
