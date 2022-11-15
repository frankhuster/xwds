// think about passing in a game object and having this drive game play

export default class Conductor {
  static initialStage() {
    console.log('stage: initial');
    return 'initial';
  }

  constructor(stage) {
    this.stage = stage;
  }

  isInitial() {
    return this.stage === 'initial';
  }

  setPlayer() {
    if (this.isInitial()) {
      console.log('stage: withPlayer');
      this.stage = 'withPlayer';
    } else {
      throw new Error('setPlayer can only be called from the initial stage');
    }
  }

  hasPlayer() {
    return this.stage === 'withPlayer';
  }

  setOpponent() {
    if (this.hasPlayer()) {
      this.stage = 'playing';
      console.log('stage: playing');
    } else {
      throw new Error(
        'setOpponent can only be called from the withPlayer stage'
      );
    }
  }

  isPlaying() {
    return this.stage === 'playing';
  }

  begin() {
    if (!this.isInitial())
      throw new Error(`Can't begin from the ${this.stage} stage`);
    this.stage = 'begin';
  }
}
