import { rowColFromId } from '../helper'
import Constants from '../Constants'

export default class RulesHelper {
  constructor(tiles) {
    const [existing, candidates] = extractExistingAndCandidates(tiles)
    this.existing = existing
    this.candidates = candidates
  }

  hasNeighbour(row, col) {
    return (
      this.hasLeftNeighbor(row, col) ||
      this.hasTopNeighbor(row, col) ||
      this.hasRightNeighbor(row, col) ||
      this.hasBottomNeighbor(row, col)
      )
  }

  hasLeftNeighbor(row, col) {
    if (col > 0) {
      if (this.getExisting(row, col - 1)) {
        return true
      }
      if (this.getCandidate(row, col - 1)) {
        return true
      }
    }
    return false
  }

  hasTopNeighbor(row, col) {
    if (row > 0) {
      if (this.getExisting(row - 1, col)) {
        return true
      }
      if (this.getCandidate(row - 1, col)) {
        return true
      }
    }
    return false
  }
  
  hasRightNeighbor(row, col) {
    if (col < Constants.boardSize - 1) {
      if (this.getExisting(row, col + 1)) {
        return true
      }
      if (this.getCandidate(row, col + 1)) {
        return true
      }
    }
    return false
  }
  
  hasBottomNeighbor(row, col) {
    if (row < Constants.boardSize - 1) {
      if (this.getExisting(row + 1, col)) {
        return true
      }
      if (this.getCandidate(row + 1, col)) {
        return true
      }
    }
    return false
  }
  
  getExisting(row, col) {
    return getTile(row, col, this.existing)
  }
  
  getCandidate(row, col) {
    return getTile(row, col, this.candidates)
  }
}

function getTile(row, col, tiles) {
  return tiles.find(e => e.row === row && e.col === col)
}

function extractExistingAndCandidates(tiles) {
  const existing = []
  const candidates = []

  tiles.forEach((val, key) => {
    const [row, col] = rowColFromId(key)
    if (val.candidate) {
      candidates.push({ row: row, col: col, letter: val.letter })
    } else {
      existing.push({ row: row, col: col, letter: val.letter })
    }
  })

  return [existing, candidates]
}
