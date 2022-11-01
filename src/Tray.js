import { useDrag } from "react-dnd"
import { useDrop } from "react-dnd"
import "./Tray.css"

function Tile({ col, tile, onDrag, onDrop }) {
  const classes = ["tray-tile"]

  const [, drag] = useDrag(() => ({
    type: 'tile',
    item: () => {
      const item = { col: col }
      console.log('Tray.onDrag.item - item:')
      console.log(item)
      onDrag(col)
      return item 
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      console.log('Tray.onDrag.end - item:')
      console.log(item)
      console.log('Tray.onDrag.end - dropResult:')
      console.log(dropResult)
      if (item && dropResult) {
        onDrop(dropResult.col)
      }
    },
  }))
 
  if (tile.selected) {
    classes.push("selected")
  }

  return(
    <button className={classes.join(" ")} ref={drag}>
      {tile.letter}
    </button>
  )
}

function Square({ col, children }) {
  const classes = ['tray-square']

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'tile',
    drop: () => ({ col: col }),
    collect: (monitor) => ({ isOver: monitor.isOver() })
  }))

  if (isOver) {
    classes.push("over")
  }

  return (
    <div className={ classes.join(' ') } ref={ drop } >
      {children}
    </div>
  )
}

function renderSquare(col, tile, onTileDrag, onTileDrop) {
  if (tile) {
    return (
    <Square key={col} col={col}>
      <Tile col={col} tile={tile} onDrag={onTileDrag} onDrop={onTileDrop} />
    </Square>
    )
  } 
  return (<Square key={col} col={col} />);
}

export default function Tray({ size, tiles, onTileDrag, onTileDrop }) {
  return(
    <div className="tray">
      {Array(size).fill().map((x, col) => {
        const tile = tiles.get(col);
        return (renderSquare(col, tile, onTileDrag, onTileDrop));
      })}
    </div>
  );
}
