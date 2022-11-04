import { id2rc } from '../helper'
import Constants from '../Constants'

export default class RulesHelper {
  constructor(tiles) {
    const [existing, candidates] = extractExistingAndCandidates(tiles)
    this.existing = existing
    this.candidates = candidates
  }

  hasNeighbour(row, col) {
    return (
      this.hasExistingLeft(row, col) ||
      this.hasExistingTop(row, col) ||
      this.hasExistingRight(row, col) ||
      this.hasExistingBottom(row, col) ||
      this.hasCandidateLeft(row, col) ||
      this.hasCandidateTop(row, col) ||
      this.hasCandidateRight(row, col) ||
      this.hasCandidateBottom(row, col)
      )
  }

  hasExistingNeighbour(row, col) {
    return (
      this.hasExistingLeft(row, col) ||
      this.hasExistingTop(row, col) ||
      this.hasExistingRight(row, col) ||
      this.hasExistingBottom(row, col)
      )
  }

  hasCandidateLeft(row, col) {
    if (col > 0) {
      if (this.getCandidate(row, col - 1)) {
        return true
      }
    }
    return false
  }

  hasCandidateTop(row, col) {
    if (row > 0) {
      if (this.getCandidate(row - 1, col)) {
        return true
      }
    }
    return false
  }

  hasCandidateRight(row, col) {
    if (col < Constants.boardSize - 1) {
      if (this.getCandidate(row, col + 1)) {
        return true
      }
    }
    return false
  }

  hasCandidateBottom(row, col) {
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

  hasExistingLeft(row, col) {
    if (col > 0) {
      if (this.getExisting(row, col - 1)) {
        return true
      }
    }
    return false
  }

  hasExistingTop(row, col) {
    if (row > 0) {
      if (this.getExisting(row - 1, col)) {
        return true
      }
    }
    return false
  }

  hasExistingRight(row, col) {
    if (col < Constants.boardSize - 1) {
      if (this.getExisting(row, col + 1)) {
        return true
      }
    }
    return false
  }

  hasExistingBottom(row, col) {
    if (row < Constants.boardSize - 1) {
      if (this.getExisting(row + 1, col)) {
        return true
      }
    }
    return false
  }

  getExisting(row, col) {
    return getTile(row, col, this.existing)
  }

  hasExisting(row, col) {
    return !!this.getExisting(row, col)
  }

  getCandidate(row, col) {
    return getTile(row, col, this.candidates)
  }

  hasCandidate(row, col) {
    return !!this.getCandidate(row, col)
  }

  hasAny(row, col) {
    return this.hasCandidate(row, col) || this.hasExisting(row, col)
  }
}

function getTile(row, col, tiles) {
  return tiles.find(e => e.row === row && e.col === col)
}

function extractExistingAndCandidates(tiles) {
  const existing = []
  const candidates = []

  tiles.forEach((val, key) => {
    const [row, col] = id2rc(key)
    if (val.candidate) {
      candidates.push({ row: row, col: col, letter: val.letter })
    } else {
      existing.push({ row: row, col: col, letter: val.letter })
    }
  })

  return [existing, candidates]
}
