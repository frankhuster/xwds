import { useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Constants from '../Constants';
import Game from '../game/Game';
import gameReducer from '../gameReducer';
import Board from './Board';
import Tray from './Tray';
import Message from './Message';
import PlayerForm from './PlayerForm';
import './App.css';

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, Game.initialState());
  const game = new Game(state);

  function handleTileDrag(obj) {
    if (obj.hasOwnProperty('row')) {
      dispatch({ type: 'selectBoardTile', row: obj.row, col: obj.col });
    } else {
      dispatch({ type: 'selectTrayTile', t: obj.col });
    }
  }

  function handleTileDrop(obj) {
    if (obj.hasOwnProperty('row')) {
      dispatch({ type: 'dropTileOnBoard', row: obj.row, col: obj.col });
    } else {
      dispatch({ type: 'dropTileOnTray', t: obj.col });
    }
  }

  function handleSetPlayer(name, id) {
    dispatch({ type: 'newPlayer', name: name, id: id });
  }

  // calcControlButtons() {
  //   const buttons = []
  //   buttons.push({ className: "new-game", label: "New Game", dispatch: "newGame",
  //     disabled: this.isInProgress() })
  //   buttons.push({ className: "submit", label: "Submit", dispatch: "submit",
  //     disabled: !this.board.hasCandidates()})
  //   buttons.push({ className: "clear", label: "Clear", dispatch: "clear",
  //     disabled: !this.board.hasCandidates() })
  //   return buttons
  // }

  // function buildButtons() {
  //   const buttons = game.calcControlButtons().map((e, i) => {return (
  //     <button key={i} className={e.className} disabled={e.disabled}
  //       onClick={() => dispatch({ type: e.dispatch })}>
  //       {e.label}
  //     </button>
  //   )})
  //   return buttons
  // }

  return (
    <div className="app">
      <div className="content">
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
        <Message errors={game.getErrors()} messages={game.getMessages()} />
        <div className="control">
          {game.conductor.isInitial() && (
            <PlayerForm setPlayer={handleSetPlayer} />
          )}
          {game.conductor.hasPlayer() && (
            <PlayerForm setPlayer={handleSetPlayer} />
          )}
        </div>
      </div>
    </div>
  );
}
