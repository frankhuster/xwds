import Constants from '../Constants'

export default function ensureFirstWordOnCenter(helper) {
  const errors = []
  const center = (Constants.boardSize - 1) / 2

  if (helper.candidates.findIndex(e => e.row === center && e.col === center) < 0) {
    errors.push('The first word must be placed on the center square')
  }

  return errors
}
