import { useDrop } from 'react-dnd'
import './Square.css'

export default function Square({ item, center, children }) {
  const classes = ['square']

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'tile',
    drop: () => { return item },
    collect: (monitor) => ({ isOver: monitor.isOver() })
  }))

  if (isOver) {
    classes.push("over")
  }

  if (center) {
    classes.push("center")
  }

  if (children) {
    return (
      <div className={ classes.join(' ') }>
        {children}
      </div>
    )
  }

  return (<div className={ classes.join(' ') } ref={ drop } />)
}
