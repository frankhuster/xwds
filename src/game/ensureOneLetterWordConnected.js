export default function ensureOneLetterWordConnected(helper) {
  const errors = []

  if (helper.candidates.length === 1) {
    const candidate = helper.candidates[0]
    if (!helper.hasNeighbour(candidate.row, candidate.col)) {
      errors.push(`Candidate tile [row: ${candidate.row}, col: ${candidate.col}] must be next to a tile`)
    }
  }

  return errors
}
