import { idFromRowCol } from "./Helper";
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
