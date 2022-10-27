import Game from "././Game";
import Board from "./Board";
import Tray from "./Tray";

import "./App.css";


export default function App() {
  const game = new Game(true);

  return (
    <div className="app">
      <Board size={game.boardSize} tiles={game.boardTiles} />
      <Tray size={game.traySize} tiles={game.trayTiles} />
    </div>
  );
}
