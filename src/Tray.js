import "./Tray.css"

function Tile({ tile }) {
  return(
    <button className="tray-tile">
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

export default function Tray({ size, tiles }) {
  return(
    <div className="tray">
      {Array(size).fill().map((x, col) => {
        const tile = tiles.get(col);
        return (renderSquare(col, tile));
      })}
    </div>
  );
}
