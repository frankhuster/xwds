import { useReducer } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Constants from './Constants'
import Game from './game/Game'
import reducer from './reducer'
import Board from './components/Board'
import Tray from './components/Tray'
import Message from './components/Message'
import './App.css'

// const startingRound = [
//   ['r0c1', { letter: 'H' }],
//   ['r1c1', { letter: 'E' }],
//   ['r2c1', { letter: 'L' }],
//   ['r3c1', { letter: 'L' }],
//   ['r4c1', { letter: 'O' }],
//   ['r4c0', { letter: 'W' }],
//   ['r4c2', { letter: 'R' }],
//   ['r4c3', { letter: 'L' }],
//   ['r4c4', { letter: 'D' }],
//   [0, { letter: 'A' }],
//   [1, { letter: 'B' }],
//   [2, { letter: 'C' }],
// ]

export default function App() {
  const [round, dispatch] = useReducer(reducer)
  const game = new Game(round)

  if (game.tray.getTileCount() === 0 && game.board.getTileCount() === 0) {
    dispatch({ type: 'startNewGame' })
  }

  function handleTileDrag(obj) {
    if (obj.row) {
      dispatch({ type: 'selectBoardTile', row: obj.row, col: obj.col })
    } else {
      dispatch({ type: 'selectTrayTile', t: obj.col })
    }
  }

  function handleTileDrop(obj) {
    if (obj.row) {
      dispatch({ type: 'dropTileOnBoard', row: obj.row, col: obj.col })
    } else {
      dispatch({ type: 'dropTileOnTray', t: obj.col })
    }
  }

  function handleSubmit() {
    dispatch({ type: 'submit' })
  }

  function handleReset() {
    dispatch({ type: 'reset' })
  }

  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        <Board
          size={Constants.boardSize}
          tiles={game.getBoardTiles()}
          potentials={game.getBoardPotentials()}
          onDrag={handleTileDrag}
          onDrop={handleTileDrop}
       />
        <Tray
          size={Constants.traySize}
          tiles={game.getTrayTiles()}
          onDrag={handleTileDrag}
          onDrop={handleTileDrop}
        />
      </DndProvider>
      <button className="submit" onClick={handleSubmit}>Submit Word</button>
      <button className="reset" onClick={handleReset}>Reset Tray</button>
      <Message messages={game.getMessages()} errors={game.getErrors()} />
    </div>
  )
}
