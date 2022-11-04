import Game from "./game/Game"

export default function reducer(round, action) {
  const game = new Game(round)

  switch (action.type) {

    case 'startNewGame': {
      game.startNewGame()
      return game.toRound()
    }

    case 'selectTrayTile': {
      game.selectTrayTile(action.t)
      return game.toRound()
    }

    case 'dropTileOnTray': {
      game.dropTileOnTray(action.t)
      return game.toRound()
    }

    case 'dropTileOnBoard': {
      game.dropTileOnBoard(action.row, action.col)
      return game.toRound()
    }

    case 'selectBoardTile': {
      game.selectBoardTile(action.row, action.col)
      return game.toRound()
    }

    case 'clear': {
      game.clear()
      return game.toRound()
    }

    case 'new': {
      game.newGame()
      return game.toRound()
    }

    case 'submit': {
      game.submit()
      return game.toRound()
    }

    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
