import { useDrop } from 'react-dnd'
import './Square.css'

export default function Square({ item, potential, children }) {
  const classes = ['square']

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'tile',
    drop: () => { return item },
    collect: (monitor) => ({ isOver: monitor.isOver() })
  }))

  if (isOver) {
    classes.push("over")
  }

  if (children) {
    return (
      <div className={ classes.join(' ') }>
        {children}
      </div>
    )
  } else {
    if (potential) {
      return (<div className={ classes.join(' ') } ref={ drop } />)
    } else {
      return (<div className={ classes.join(' ') } />)
    }
  }
}
