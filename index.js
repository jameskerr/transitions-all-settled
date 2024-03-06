import {SetStack} from "./lib/set-stack.js"
import {Signal} from "./lib/signal.js"

export function transitionsAllSettled(node) {
  let allEnded = true
  const transitions = new SetStack()
  const signal = new Signal()

  function checkDone() {
    if (transitions.empty) {
      off()
      signal.resolve(allEnded)
    }
  }

  function onRun(e) {
    transitions.push(e.target, e.propertyName)
  }

  function onEnd(e) {
    if (transitions.has(e.target, e.propertyName)) {
      transitions.pop(e.target, e.propertyName)
      checkDone()
    }
  }

  function onCancel(e) {
    if (transitions.has(e.target, e.propertyName)) {
      allEnded = false
      transitions.pop(e.target, e.propertyName)
      checkDone()
    }
  }

  function off() {
    node.removeEventListener("transitionrun", onRun)
    node.removeEventListener("transitionend", onEnd)
    node.removeEventListener("transitioncancel", onCancel)
  }

  // add an expectation that a transition run will start in a few milliseconds,
  // otherwise throw an error indicating that the transition is maybe not working.

  node.addEventListener("transitionrun", onRun)
  node.addEventListener("transitionend", onEnd)
  node.addEventListener("transitioncancel", onCancel)

  return signal.promise
}
