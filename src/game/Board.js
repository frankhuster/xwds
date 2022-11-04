import { id2rc, rc2id } from '../helper'

export default class Board {
  constructor(tiles) {
    this.tiles = tiles
  }

  static fromRound(round) {
    const tiles = new Map(round.filter(e => typeof e[0] === 'string'))
    return new Board(tiles)
  }

  getTileArray() {
    const tiles = []
    this.tiles.forEach((val, idx) => {
      tiles.push([idx, val])
    })
    return tiles
  }

  add(id, letter) {
    if (this.tiles.has(id)) throw new Error(`Cannot add ${letter} over existing board tile ${id}`)
    this.tiles.set(id, { letter: letter, candidate: true })
  }

  del(id) {
    if (this.tiles.has(id)) {
      this.tiles.delete(id)
    } else {
      throw new Error(`Cannot delete inexistant board tile ${id}`)
    }
  }

  removeAll(tiles) {
    tiles.forEach(tile => {
      const id = rc2id(tile.row, tile.col)
      this.del(id)
    })
  }

  get(id) {
    return this.tiles.get(id)
  }

  isEmpty(row, col) {
    const id = rc2id(row, col)
    return this.get(id) === null
  }

  deselect() {
    this.tiles.forEach(tile => delete tile.selected)
  }

  select(row, col) {
    const id = rc2id(row, col)
    const tile = this.tiles.get(id)
    if (tile) {
      this.deselect()
      tile.selected = true
    } else {
      throw new Error(`Cannot select inexistant board tile ${id}`)
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

  drop(row, col, tile) {
    const id = rc2id(row, col)
    if (this.tiles.has(id)) throw new Error(`Cannot drop ${tile.letter} over existing board tile ${id}`)
    this.tiles.set(id, tile)
    this.deselect()
  }

  getTiles() {
    return this.tiles
  }

  getTileCount() {
    return this.tiles.size
  }

  getCandidates() {
    const candidates = []
    this.tiles.forEach((tile, key) => {
      if (tile.candidate) {
        const [row, col] = id2rc(key)
        candidates.push({ row: row, col: col, letter: tile.letter })
      }
    })
    return candidates
  }

  hasCandidates() {
    var itDoes = false
    for (const [, tile] of this.tiles) {
      if (tile.candidate) {
        itDoes = true
        break
      }
    }
    return itDoes
  }
}
