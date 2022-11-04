export default function ensureMinimumLength(helper) {
  const errors = []
  const minimumLength = 2

  if (helper.candidates.length < minimumLength) {
    errors.push(`Words must be at least ${minimumLength} letters long`)
  }

  return errors
}
