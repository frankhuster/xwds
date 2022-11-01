import Game from "./Game"

export default function gameReducer(game, action) {
  switch (action.type) {

    case 'selectTrayTile': {
      game.selectTrayTile(action.t)
      game.calculatePotentials()
      return Game.clone(game)
    }

    case 'dropTileOnTray': {
      game.dropTileOnTray(action.t)
      game.calculatePotentials()
      return Game.clone(game)
    }

    case 'dropTileOnBoard': {
      game.dropTileOnBoard(action.row, action.col)
      game.calculatePotentials()
      return Game.clone(game)
    }

    case 'selectBoardTile': {
      game.selectBoardTile(action.row, action.col)
      game.calculatePotentials()
      return Game.clone(game)
    }

    case 'reset': {
      game.reset()
      return Game.clone(game)
    }

    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
