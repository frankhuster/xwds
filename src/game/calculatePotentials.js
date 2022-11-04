import Constants from '../Constants'
import { id2rc, rc2id } from '../helper'

function incPotential(potentials, row, col) {
  if (row < 0 || row >= Constants.boardSize || col < 0 || col >= Constants.boardSize) return

  const id = rc2id(row, col)
  const potential = potentials.get(id) || 0
  potentials.set(id, potential + 1)
}

export default function calculatePotentials(tiles) {
  const potentials = new Map()

  if (tiles.size === 0) {
    incPotential(potentials, (Constants.boardSize - 1) / 2, (Constants.boardSize - 1) / 2)
    return potentials
  }

  tiles.forEach((tile, key) => {
    if (!tile.selected) {
      const [row, col] = id2rc(key)
      incPotential(potentials, row - 1, col, tiles)
      incPotential(potentials, row, col - 1, tiles)
      incPotential(potentials, row + 1, col, tiles)
      incPotential(potentials, row, col + 1, tiles)
    }
  })

  return potentials
}
