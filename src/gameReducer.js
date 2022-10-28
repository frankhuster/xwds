import Game from "./Game";

export default function gameReducer(game, action) {
  switch (action.type) {

    case 'selectTrayTile': {
      game.selectTrayTile(action.t);
      game.calculatePotentials();
      return new Game(game);
    }

    case 'dropTileOnTray': {
      game.dropTileOnTray(action.t);
      game.calculatePotentials();
      return new Game(game);
    }

    case 'dropTileOnBoard': {
      game.dropTileOnBoard(action.row, action.col)
      game.calculatePotentials();
      return new Game(game);
    }

    case 'selectBoardTile': {
      game.selectBoardTile(action.row, action.col);
      game.calculatePotentials();
      return new Game(game);
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
