export function id2rc(id) {
  const r = id.indexOf("r")
  if (r === -1) throw new Error(`invalid board tile id: ${id}`)

  const c = id.indexOf("c")
  if (c === -1) throw new Error(`invalid board tile id: ${id}`)

  const row = parseInt(id.substring(r+1, c+1))
  if (isNaN(row)) throw new Error(`invalid board tile id: ${id}`)

  const col = parseInt(id.substring(c+1))
  if (isNaN(col)) throw new Error(`invalid board tile id: ${id}`)

  return ([row, col])
}

export function rc2id(r,c) {
  return `r${r}c${c}`
}
