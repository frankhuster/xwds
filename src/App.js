import { useReducer } from "react";
import Game from "././Game";
import gameReducer from "./gameReducer";
import Board from "./Board";
import Tray from "./Tray";

import "./App.css";


export default function App() {
  const [game, dispatch] = useReducer(gameReducer, new Game(null, null, true));

  function handleTrayClick(t) {
    dispatch({type: "selectTrayTile", t: t})
  }

  return (
    <div className="app">
      <Board size={game.boardSize} tiles={game.boardTiles} />
      <Tray size={game.traySize} tiles={game.trayTiles} onClick={handleTrayClick} />
    </div>
  );
}
