import "./Board.css"

function Tile({ tile }) {
  return(
    <button className="board-tile">
      {tile.letter}
    </button>
  )
}

function Square({ children }) {
  return (
    <div className="board-square">
      {children}
    </div>
    );
  
}

function renderSquare(col, tile) {
  if (tile) {
    return (
    <Square key={col}>
      <Tile tile={tile} />
    </Square>
    );
  } 
  return (<Square key={col}/>);
}

function idFromRowCol(row, col) {
  return(`r${row}c${col}`);
}

function rowColFromId(id) {
  const r = id.indexOf("r");
  if (r === -1) throw new Error(`invalid id: ${id}`);

  const c = id.indexOf("c");
  if (c === -1) throw new Error(`invalid id: ${id}`);

  const row = parseInt(id.substring(r+1, c+1));
  if (isNaN(row)) throw new Error(`invalid id: ${id}`);

  const col = parseInt(id.substring(c+1));
  if (isNaN(col)) throw new Error(`invalid id: ${id}`);

  return ([row, col]);
}

function renderRow(row, size, tiles) {
  return (
    <div key={row} className="board-row">
      {Array(size).fill().map((x,col) => {
        const tile = tiles.get(idFromRowCol(row, col));
        return (renderSquare(col, tile));
      })}
    </div>
  );
}

export default function Board({ size, tiles }) {
  return(
    <div className="board">
      {Array(size).fill().map((x,row) => renderRow(row, size, tiles))}
    </div>
  );
}
