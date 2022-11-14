import { useDrag } from "react-dnd"
import "./Tile.css"

export default function Tile({ item, tile, onDrag, onDrop }) {
  const classes = ["tile"]

  const [, drag] = useDrag(() => ({
    type: 'tile',
    item: () => {
      onDrag(item)
      return item 
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        onDrop(dropResult)
      }
    },
  }))
 
  if (tile.selected) {
    classes.push("selected")
  }

  if (tile.candidate) {
    classes.push("candidate")
  }

  return(
    <button className={classes.join(" ")} ref={drag}>
      {tile.letter}
    </button>
  )
}
