import Game from "././Game";
import Board from "./Board";

import "./App.css";


export default function App() {
  const game = new Game(true);

  return (
    <div className="app">
      <Board 
        size={game.boardSize}
        tiles={game.boardTiles} 
      />
    </div>
  );
}
