import RulesHelper from './RulesHelper'
import ensureOneLetterWordConnected from './ensureOneLetterWordConnected'
import ensureStartingWordOnCenter from './ensureStartingWordOnCenter'
import ensureWordShape from './ensureWordShape'

const rules = [
  [ensureStartingWordOnCenter],
  [ensureOneLetterWordConnected],
  [ensureWordShape],
//  [ensureMinimumLength],
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
