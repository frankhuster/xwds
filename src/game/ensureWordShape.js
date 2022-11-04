export default function ensureWordShape(helper) {
  const errors = []

  function allEqual(prop) {
    const val = helper.candidates[0][prop]
    for (var i = 1; i < helper.candidates.length; i++) {
      if (helper.candidates[i][prop] !== val) return false
    }
    return true
  }

  function max(prop) {
    var max = helper.candidates[0][prop]
    for (var i = 1; i < helper.candidates.length; i++) {
      if (helper.candidates[i][prop] > max) max = helper.candidates[i][prop]
    }
    return max
  }

  function min(prop) {
    var min = helper.candidates[0][prop]
    for (var i = 1; i < helper.candidates.length; i++) {
      if (helper.candidates[i][prop] < min) min = helper.candidates[i][prop]
    }
    return min
  }

  if (helper.candidates.length > 1) {

    if (allEqual('row')) {
      const row = helper.candidates[0].row
      const left = min('col')
      const right = max('col')
      for (var col = left; col <= right; col++) {
        if (!helper.hasAny(row, col)) {
          errors.push(`The tiles must be contiguous`)
        }
      }
    } else if (allEqual('col')) {
      const col = helper.candidates[0].col
      const top = min('row')
      const bottom = max('row')
      for (var row = top; row <= bottom; row++) {
        if (!helper.hasAny(row, col)) {
          errors.push(`The tiles must be contiguous`)
        }
      }
    } else {
      errors.push(`The tiles must be aligned horizontally or vertically`)
    }
  }

  return errors
}
