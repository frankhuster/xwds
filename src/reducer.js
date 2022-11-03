import Game from "./game/Game"

export default function reducer(round, action) {
  const game = new Game(round)

  switch (action.type) {

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

    case 'reset': {
      game.reset()
      return game.toRound()
    }

    case 'new': {
      game.newGame()
      return game.toRound()
    }

    case 'submit': {
      game.submitWord()
      return game.toRound()
    }

    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
