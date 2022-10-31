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
  game.calculatePotentials();
  return game;
}

export default function App() {
  const [game, dispatch] = useReducer(gameReducer, initialGame());

  function handleTrayTileClick(t) {
    console.log(`handleTrayTileClick(${t})`);
    dispatch({type: "selectTrayTile", t: t})
  }

  function handleTraySquareClick(t) {
    console.log(`handleTraySquareClick(${t})`);
    dispatch({type: "dropTileOnTray", t: t})
  }

  function handleBoardSquareClick(row, col) {
    console.log(`handleBoardSquareClick(${row}, ${col})`);
    dispatch({type: "dropTileOnBoard", row: row, col: col})
  }

  function handleBoardTileClick(row, col) {
    console.log(`handleBoardTileClick(${row}, ${col})`);
    dispatch({type: "selectBoardTile", row: row, col: col})
  }

  const potentials = (game.isAnythingSelected() ? game.potentials : new Map());

  return (
    <div className="app">
      <Board 
        size={Game.boardSize}
        tiles={game.boardTiles}
        potentials={potentials}
        onSquareClick={handleBoardSquareClick}
        onTileClick={handleBoardTileClick}
     />
      <Tray 
        size={Game.traySize}
        tiles={game.trayTiles}
        onTileClick={handleTrayTileClick} 
        onSquareClick={handleTraySquareClick} 
      />
    </div>
  );
}
