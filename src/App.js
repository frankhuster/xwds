import { useReducer } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Constants from './Constants'
import Game from './game/Game'
import Board from './components/Board'
import Tray from './components/Tray'
import Control from './components/Control'
import './App.css'
import gameReducer from './gameReducer'

const initialState = {
  boardTiles: [],
  trayTiles: [],
  errors: [],
  messages: [],
}

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const game = new Game(state)

  function handleTileDrag(obj) {
    if (obj.hasOwnProperty('row')) {
      dispatch({ type: 'selectBoardTile', row: obj.row, col: obj.col })
    } else {
      dispatch({ type: 'selectTrayTile', t: obj.col })
    }
  }

  function handleTileDrop(obj) {
    if (obj.hasOwnProperty('row')) {
      dispatch({ type: 'dropTileOnBoard', row: obj.row, col: obj.col })
    } else {
      dispatch({ type: 'dropTileOnTray', t: obj.col })
    }
  }

  function buildButtons() {
    const buttons = game.calcControlButtons().map((e, i) => {return (
      <button key={i} className={e.className} onClick={() => dispatch({ type: e.dispatch })}>
        {e.label}
      </button>
    )})
    return buttons
  }

  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        <Board
          size={Constants.boardSize}
          tiles={game.getBoardTiles()}
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
      <Control>
        {buildButtons()}
      </Control>
    </div>
  )
}
