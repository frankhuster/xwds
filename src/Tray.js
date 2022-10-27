import "./Tray.css"

function Tile({ tile, onClick }) {
  var classes = ["tray-tile"];
  if (tile.selected) {
    classes.push("selected");
  }
  return(
    <button className={ classes.join(" ")} onClick={onClick}>
      {tile.letter}
    </button>
  )
}

function Square({ onClick, children }) {
  return (
    <div className="tray-square" onClick={onClick} >
      {children}
    </div>
    );
  
}

function renderSquare(col, tile, onTileClick, onSquareClick) {
  if (tile) {
    return (
    <Square key={col}>
      <Tile tile={tile} onClick={() => onTileClick(col)} />
    </Square>
    );
  } 
  return (<Square key={col} onClick={() => onSquareClick(col)} />);
}

export default function Tray({ size, tiles, onTileClick, onSquareClick }) {
  return(
    <div className="tray">
      {Array(size).fill().map((x, col) => {
        const tile = tiles.get(col);
        return (renderSquare(col, tile, onTileClick, onSquareClick));
      })}
    </div>
  );
}
