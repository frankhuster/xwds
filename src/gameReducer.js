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

    // case 'dropSelectedTrayTileOnBoard': {
    //   const id = game.getSelectedTrayTileId();
    //   const tile = game.getTrayTile(id);

    //   game.trayTiles.forEach((v, k) => { 
    //     if (k === action.t) {
    //       v.selected = true;
    //     } else {
    //       v.selected = false;
    //     }
    //   })
    //   return new Game(game);
    // }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
