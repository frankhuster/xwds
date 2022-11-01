import { useReducer } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Game from './Game'
import gameReducer from './gameReducer'
import Board from './Board'
import Tray from './Tray'

import "./App.css"


function initialGame() {
  const boardTiles = new Map()
  boardTiles.set('r0c1', { letter: "H" })
  boardTiles.set('r1c1', { letter: "E" })
  boardTiles.set('r2c1', { letter: "L" })
  boardTiles.set('r3c1', { letter: "L" })
  boardTiles.set('r4c1', { letter: "O" })
  boardTiles.set('r4c0', { letter: "W" })
  boardTiles.set('r4c2', { letter: "R" })
  boardTiles.set('r4c3', { letter: "L" })
  boardTiles.set('r4c4', { letter: "D" })
  
  const trayTiles = new Map()
  trayTiles.set(0, { letter: "A", candidate: true })
  trayTiles.set(1, { letter: "B", candidate: true })
  trayTiles.set(2, { letter: "C", candidate: true })

  return Game.start(boardTiles, trayTiles)
}

export default function App() {
  const [game, dispatch] = useReducer(gameReducer, initialGame())

  function handleTileDrag(obj) {
    if (obj.row) {
      dispatch({ type: "selectBoardTile", row: obj.row, col: obj.col })
    } else {
      dispatch({ type: "selectTrayTile", t: obj.col })
    }
  }

  function handleTileDrop(obj) {
    if (obj.row) {
      dispatch({ type: "dropTileOnBoard", row: obj.row, col: obj.col })
    } else {
      dispatch({ type: "dropTileOnTray", t: obj.col })
    }
  }

  function handleReset() {
    dispatch({ type: "reset" })
  }

  const potentials = (game.isAnythingSelected() ? game.potentials : new Map())

  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        <Board 
          size={Game.boardSize}
          tiles={game.boardTiles}
          potentials={potentials}
          onDrag={handleTileDrag}
          onDrop={handleTileDrop}
       />
        <Tray 
          size={Game.traySize}
          tiles={game.trayTiles}
          onDrag={handleTileDrag}
          onDrop={handleTileDrop}
        />
      </DndProvider>
      <button onClick={handleReset}>reset</button>
    </div>
  )
}
