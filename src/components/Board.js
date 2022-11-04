import { rc2id } from '../helper'
import Square from './Square'
import Tile from './Tile'
import './Board.css'

export default function Board({ size, tiles, onDrag, onDrop }) {

  return (
    <div className="board">{
      Array(size).fill().map((x, row) => { return (
        <div key={row} className="board-row">{
          Array(size).fill().map((y, col) => {
            const id = rc2id(row, col)
            const tile = tiles.get(id)
            const item = { row: row, col: col }
            const center = row === (size - 1) / 2 && col === (size - 1) / 2

            if (tile) { return (
              <Square key={col} item={item} center={center}>
                <Tile item={item} tile={tile} onDrag={onDrag} onDrop={onDrop} />
              </Square>
            ) } else { return (
              <Square key={col} item={item}  center={center} potential={true} />
            ) }
          })
        }</div>
      ) })
    }</div>
  );
}
