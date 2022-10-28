import { idFromRowCol } from "./Helper";
import "./Board.css"

function Tile({ tile, onClick }) {
  var classes = ["board-tile"];
  if (tile.candidate) {
    classes.push("candidate");
    if (tile.selected) {
      classes.push("selected");
    }
  }
  return(
    <button className={classes.join(" ")} onClick={onClick}>
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

function renderSquare(row, col, tile, potential, onSquareClick, onTileClick) {
  if (tile) {
    if (tile.candidate) {
      return (
        <Square key={col}>
          <Tile tile={tile} onClick={() => onTileClick(row, col)} />
        </Square>
        );  
    } else {
      return (
      <Square key={col}>
        <Tile tile={tile} />
      </Square>
      );
    }
  }
  if (potential) {
    return (<Square key={col} onClick={() => onSquareClick(row, col)} />);
  } else {
    return (<Square key={col} />);
  }
}

function renderRow(row, size, tiles, potentials, onSquareClick, onTileClick) {
  return (
    <div key={row} className="board-row">
      {Array(size).fill().map((x,col) => {
        const id = idFromRowCol(row, col);
        const tile = tiles.get(id);
        const potential = potentials.get(id);
        return (renderSquare(row, col, tile, potential, onSquareClick, onTileClick));
      })}
    </div>
  );
}

export default function Board({ size, tiles, potentials, onSquareClick, onTileClick }) {
  return(
    <div className="board">
      {Array(size).fill().map((x,row) => 
        renderRow(row, size, tiles, potentials, onSquareClick, onTileClick))}
    </div>
  );
}
