import Game from "./Game";

export default function gameReducer(game, action) {
  switch (action.type) {

    case 'selectTrayTile': {
      game.trayTiles.forEach((v, k) => { 
        if (k === action.t) {
          v.selected = true;
        } else {
          v.selected = false;
        }
      })
      return new Game(game.boardTiles, game.trayTiles, false);
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
