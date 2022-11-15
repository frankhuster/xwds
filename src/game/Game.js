import Board from './Board';
import rulesEnforcer from './rulesEnforcer';
import Tray from './Tray';
import LetterBag from './LetterBag';
import Conductor from './Conductor';
import Constants from '../Constants';
import Player from './Player';

export default class Game {
  static initialState() {
    return {
      boardTiles: [],
      trayTiles: [],
      errors: [],
      // this belongs in the conductor, no?
      messages: ["Welcome to xwds, what's your player name?"],
      stage: Conductor.initialStage(),
    };
  }

  constructor(state) {
    this.board = new Board(state.board);
    this.tray = new Tray(state.tray);
    this.errors = Array.from(state.errors);
    this.messages = Array.from(state.messages);
    this.conductor = new Conductor(state.stage);
    this.player = new Player(state.playerName, state.playerId);
  }

  newGame() {
    this.board = new Board(new Map());
    this.tray = new Tray(new Map());
    this.completeTray();
  }

  reduce() {
    const state = {};
    state.board = this.board.toTileArray();
    state.tray = this.tray.toTileArray();
    state.errors = this.errors ? Array.from(this.errors) : [];
    state.messages = this.messages ? Array.from(this.messages) : [];
    if (this.player) {
      state.playerName = this.player.name;
      state.playerId = this.player.id;
    }
    return state;
  }

  setPlayer(name, id) {
    this.player = new Player(name, id);
    this.conductor.setPlayer();
    this.messages = ['Waiting for an opponent...'];
  }

  isInProgress() {
    return this.board.getTileCount() > 0 || this.tray.getTileCount() > 0;
  }

  isAnySelected() {
    return this.tray.isAnySelected() || this.board.isAnySelected();
  }

  dropTileOnTray(t) {
    var id = this.tray.getSelected();
    if (id != null) {
      const tile = this.tray.get(id);
      this.tray.drop(t, tile);
      this.tray.del(id);
      return;
    }

    id = this.board.getSelected();
    if (id != null) {
      const tile = this.board.get(id);
      this.tray.drop(t, tile);
      this.board.del(id);
      return;
    }

    throw new Error('Found no selected tile to drop on the tray');
  }

  dropTileOnBoard(row, col) {
    var id = this.tray.getSelected();
    if (id != null) {
      const tile = this.tray.get(id);
      tile.candidate = true;
      this.board.drop(row, col, tile);
      this.tray.del(id);
      return;
    }

    id = this.board.getSelected();
    if (id != null) {
      const tile = this.board.get(id);
      this.board.drop(row, col, tile);
      this.board.del(id);
      return;
    }

    throw new Error('Found no selected tile to drop on the board');
  }

  selectTrayTile(t) {
    this.tray.select(t);
    this.board.deselect();
  }

  selectBoardTile(row, col) {
    this.board.select(row, col);
    this.tray.deselect();
  }

  completeTray() {
    if (this.tray.getTileCount() >= Constants.traySize) return;

    const bag = new LetterBag();
    const trayLetters = this.tray.getLetters();
    const boardLetters = this.board.getLetters();
    bag.remove(trayLetters);
    bag.remove(boardLetters);

    for (var t = 0; t < Constants.traySize; t++) {
      if (this.tray.isEmpty(t)) {
        this.tray.add(t, bag.pickOne());
      }
    }
  }

  submit() {
    this.errors = rulesEnforcer(this.getBoardTiles());
    console.log(this.errors.join(', ') || 'no errors');
    if (this.errors.length > 0) return;
    this.board.acceptCandidates();
    this.completeTray();
  }

  clear() {
    const candidates = this.board.getCandidates();
    this.tray.addAll(candidates);
    this.board.removeAll(candidates);
  }

  getBoardTiles() {
    return this.board.getTiles();
  }

  getTrayTiles() {
    return this.tray.getTiles();
  }

  getMessages() {
    return this.messages || [];
  }

  getErrors() {
    return this.errors || [];
  }
}
