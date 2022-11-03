export default function ensureWord(helper) {
  const errors = []

  if (helper.candidates.length === 0) {
    errors.push('No candidate tiles')
  } else if (helper.candidates.length === 1) {
    const candidate = helper.candidates[0]
    if (!helper.hasNeighbour(candidate.row, candidate.col)) {
      errors.push(`Candidate tile [row: ${candidate.row}, col: ${candidate.col}] must be next to a tile`)
    }
  } else {

  }

  return errors
}

// function sameRow(candidates) {
//   const row = candidates[0].row
//   return !candidates.some((e) => e.row !== row)
// }

// function sameCol(candidates) {
//   const col = candidates[0].col
//   return !candidates.some((e) => e.col !== col)
// }
