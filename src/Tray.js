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

function Square({ children }) {
  return (
    <div className="tray-square">
      {children}
    </div>
    );
  
}

function renderSquare(col, tile, onClick) {
  if (tile) {
    return (
    <Square key={col}>
      <Tile tile={tile} onClick={() => onClick(col)} />
    </Square>
    );
  } 
  return (<Square key={col}/>);
}

export default function Tray({ size, tiles, onClick }) {
  return(
    <div className="tray">
      {Array(size).fill().map((x, col) => {
        const tile = tiles.get(col);
        return (renderSquare(col, tile, onClick));
      })}
    </div>
  );
}
