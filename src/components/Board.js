import { rc2id } from '../helper'
import Square from './Square'
import Tile from './Tile'
import './Board.css'

export default function Board({ size, tiles, potentials, onDrag, onDrop }) {
  return (
    <div className="board">{
      Array(size).fill().map((x, row) => { return (
        <div key={row} className="board-row">{
          Array(size).fill().map((y, col) => {
            const id = rc2id(row, col)
            const tile = tiles.get(id)
            const potential = potentials.get(id)
            const item = { row: row, col: col }

            if (tile) { return (
              <Square key={col} item={item}>
                <Tile item={item} tile={tile} onDrag={onDrag} onDrop={onDrop} />
              </Square>
            ) } else { return (
              <Square key={col} item={item} potential={potential} />
            ) }
          })
        }</div>
      ) })
    }</div>
  );
}
