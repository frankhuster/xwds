import { idFromRowCol } from "./Helper";
import "./Board.css"

function Tile({ tile }) {
  var classes = ["board-tile"];
  if (tile.candidate) {
    classes.push("candidate");
  }
  return(
    <button className={classes.join(" ")}>
      {tile.letter}
    </button>
  )
}

function Square({ onClick, children }) {
  return (
    <div className="board-square" onClick={onClick}>
      {children}
    </div>
    );
}

function renderSquare(row, col, tile, onSquareClick) {
  if (tile) {
    return (
    <Square key={col}>
      <Tile tile={tile} />
    </Square>
    );
  }
  return (<Square key={col} onClick={() => onSquareClick(row, col)} />);
}

function renderRow(row, size, tiles, onSquareClick) {
  return (
    <div key={row} className="board-row">
      {Array(size).fill().map((x,col) => {
        const tile = tiles.get(idFromRowCol(row, col));
        return (renderSquare(row, col, tile, onSquareClick));
      })}
    </div>
  );
}

export default function Board({ size, tiles, onSquareClick }) {
  return(
    <div className="board">
      {Array(size).fill().map((x,row) => renderRow(row, size, tiles, onSquareClick))}
    </div>
  );
}
