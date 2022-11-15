import Game from './game/Game';

export default function gameReducer(state, action) {
  const game = new Game(state);

  switch (action.type) {
    case 'newGame': {
      game.newGame();
      return game.reduce();
    }

    case 'selectTrayTile': {
      game.selectTrayTile(action.t);
      return game.reduce();
    }

    case 'dropTileOnTray': {
      game.dropTileOnTray(action.t);
      return game.reduce();
    }

    case 'dropTileOnBoard': {
      game.dropTileOnBoard(action.row, action.col);
      return game.reduce();
    }

    case 'selectBoardTile': {
      game.selectBoardTile(action.row, action.col);
      return game.reduce();
    }

    case 'newPlayer': {
      game.setPlayer(action.name, action.id);
      return game.reduce();
    }

    case 'clear': {
      game.clear();
      return game.reduce();
    }

    case 'submit': {
      game.submit();
      return game.reduce();
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
