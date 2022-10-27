import { useReducer } from "react";
import Game from "././Game";
import gameReducer from "./gameReducer";
import Board from "./Board";
import Tray from "./Tray";

import "./App.css";


function initialGame() {
  var game = new Game();
  game.addBoardTile('r0c1', { letter: "H" });
  game.addBoardTile('r1c1', { letter: "E" });
  game.addBoardTile('r2c1', { letter: "L" });
  game.addBoardTile('r3c1', { letter: "L" });
  game.addBoardTile('r4c1', { letter: "O" });
  game.addBoardTile('r4c0', { letter: "W" });
  game.addBoardTile('r4c2', { letter: "R" });
  game.addBoardTile('r4c3', { letter: "L" });
  game.addBoardTile('r4c4', { letter: "D" });
  game.addTrayTile(0, { letter: "A" });
  game.addTrayTile(1, { letter: "B" });
  game.addTrayTile(2, { letter: "C" });
  return game;
}

export default function App() {
  const [game, dispatch] = useReducer(gameReducer, initialGame());

  function handleTrayTileClick(t) {
    dispatch({type: "selectTrayTile", t: t})
  }

  function handleTraySquareClick(t) {
    dispatch({type: "dropTrayTileOnTray", t: t})
  }

  return (
    <div className="app">
      <Board size={game.boardSize} tiles={game.boardTiles} />
      <Tray 
        size={game.traySize}
        tiles={game.trayTiles}
        onTileClick={handleTrayTileClick} 
        onSquareClick={handleTraySquareClick} 
      />
    </div>
  );
}
