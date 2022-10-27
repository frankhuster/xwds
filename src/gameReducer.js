import Game from "./Game";

export default function gameReducer(game, action) {
  switch (action.type) {

    case 'selectTrayTile': {
      game.selectTrayTile(action.t);
      return new Game(game);
    }

    case 'dropTrayTileOnTray': {
      game.dropTrayTileOnTray(action.t);
      return new Game(game);
    }

    case 'dropTrayTileOnBoard': {
      game.dropTrayTileOnBoard(action.row, action.col)
      return new Game(game);
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
