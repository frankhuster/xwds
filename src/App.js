import { useReducer } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Game from './Game'
import gameReducer from './gameReducer'
import Board from './Board'
import Tray from './Tray'

import "./App.css"


function initialGame() {
  var game = new Game()
  game.addBoardTile('r0c1', { letter: "H" })
  game.addBoardTile('r1c1', { letter: "E" })
  game.addBoardTile('r2c1', { letter: "L" })
  game.addBoardTile('r3c1', { letter: "L" })
  game.addBoardTile('r4c1', { letter: "O" })
  game.addBoardTile('r4c0', { letter: "W" })
  game.addBoardTile('r4c2', { letter: "R" })
  game.addBoardTile('r4c3', { letter: "L" })
  game.addBoardTile('r4c4', { letter: "D" })
  game.addTrayTile(0, { letter: "A", candidate: true })
  game.addTrayTile(1, { letter: "B", candidate: true })
  game.addTrayTile(2, { letter: "C", candidate: true })
  game.calculatePotentials()
  return game
}

export default function App() {
  const [game, dispatch] = useReducer(gameReducer, initialGame())

  function handleTileDrag(obj) {
    if (obj.row) {
      dispatch({type: "selectBoardTile", row: obj.row, col: obj.col})
    } else {
      dispatch({type: "selectTrayTile", t: obj.col})
    }
  }

  function handleTileDrop(obj) {
    if (obj.row) {
      dispatch({type: "dropTileOnBoard", row: obj.row, col: obj.col})
    } else {
      dispatch({type: "dropTileOnTray", t: obj.col})
    }
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
    </div>
  )
}
