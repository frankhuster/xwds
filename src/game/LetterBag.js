export default class LetterBag {
  constructor() {
    const frequencies = [78,20,40,38,110,14,30,23,86,2,10,53,27,72,61,28,2,73,87,67,33,10,9,2,16,4]

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    var tmp = []
    frequencies.forEach((e,i) => {tmp = tmp.concat(Array(e).fill(alphabet[i]))})
    this.letters = Array.from(tmp)
    console.log(`The letter bag size is ${this.letters.length}`)
  }

  pickOne() {
    const i = Math.floor(Math.random() * this.letters.length)
    const letter = this.letters[i]
    this.letters.splice(i, 1)
    console.log(`Picked ${letter} out of the bag, the new bag size is ${this.letters.length}`)
    return letter
  }

  pick(count) {
    const letters = []
    for (var i = 0; i < count; i++) {
      letters.push(this.pickOne())
    }
    console.log(`Picked [${letters.join(', ')}], the new bag size is ${this.letters.length}`)
    return letters
  }

  remove(letters) {
    letters.forEach(letter => {
      const i = this.letters.findIndex((e) => e === letter)
      if (i < 0) throw new Error(`No letter ${letter} remains to be removed from the bag`)
      this.letters.splice(i, 1)
    })
    console.log(`Removed [${letters.join(', ')}], the new bag size is ${this.letters.length}`)
  }
}
