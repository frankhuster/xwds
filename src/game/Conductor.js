// think about passing in a game object and having this drive game play

export default class Conductor {
  static initialStage() {
    return 'initial'
  }

  constructor(stage) {
    this.stage = stage
  }

  isInitial() {
    return this.stage === 'initial'
  }

  begin() {
    if (!this.isInitial()) throw new Error(`Can't begin from the ${this.stage} stage`)
    this.stage = 'begin'
  }
}
