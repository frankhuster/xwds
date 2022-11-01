import Square from './Square'
import Tile from './Tile'
import './Tray.css'

export default function Tray({ size, tiles, onDrag, onDrop }) {
  return(
    <div className="tray">{
      Array(size).fill().map((x, col) => {
        const tile = tiles.get(col)
        const item = { col: col }
        
        if (tile) { return (
          <Square key={col} item={item}>
            <Tile item={item} tile={tile} onDrag={onDrag} onDrop={onDrop} />
          </Square>
        ) } else { return (
          <Square key={col} item={item} potential />
        ) }
      })
    }</div>
  );
}
