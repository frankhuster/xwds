import ensureWord from './ensureWord'
import RulesHelper from './RulesHelper'

export default function rulesEnforcer(boardTiles) {
  const helper = new RulesHelper(boardTiles)
  const errors = []

  errors.push(...ensureWord(helper))

  return errors
}
