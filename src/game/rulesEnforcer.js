import RulesHelper from './RulesHelper'
import ensureMinimumLength from './ensureMinimumLength'
import ensureWord from './ensureWord'
import ensureFirstWordOnCenter from './ensureFirstWordOnCenter'

const rules = [
  [ensureMinimumLength, ensureWord],
  [ensureFirstWordOnCenter]
]

export default function rulesEnforcer(boardTiles) {
  const helper = new RulesHelper(boardTiles)
  const errors = []

  rules.forEach(subrules => {
    var keepChecking = true
    subrules.forEach(rule => {
      if (keepChecking) {
        const ruleErrors = rule(helper)
        if (ruleErrors.length > 0) {
          keepChecking = false
          errors.push(...ruleErrors)
        }
      }
    })
  })

  return errors
}
