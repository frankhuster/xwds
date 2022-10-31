export function idFromRowCol(row, col) {
  return(`r${row}c${col}`)
}

export function rowColFromId(id) {
  const r = id.indexOf("r")
  if (r === -1) throw new Error(`invalid id: ${id}`)

  const c = id.indexOf("c")
  if (c === -1) throw new Error(`invalid id: ${id}`)

  const row = parseInt(id.substring(r+1, c+1))
  if (isNaN(row)) throw new Error(`invalid id: ${id}`)

  const col = parseInt(id.substring(c+1))
  if (isNaN(col)) throw new Error(`invalid id: ${id}`)

  return ([row, col])
}
