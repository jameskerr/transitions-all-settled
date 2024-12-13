import { SetStack } from "./lib/set-stack.js";
import { Signal } from "./lib/signal.js";

export function transitionsAllSettled(node, timeout = 100) {
  let allEnded = true;
  let hasStarted = false;
  let timeoutId = null;
  const transitions = new SetStack();
  const signal = new Signal();

  function checkDone() {
    if (transitions.empty) {
      off();
      signal.resolve(allEnded);
    }
  }

  function onRun(e) {
    hasStarted = true;
    transitions.push(e.target, e.propertyName);
  }

  function onEnd(e) {
    if (transitions.has(e.target, e.propertyName)) {
      transitions.pop(e.target, e.propertyName);
      checkDone();
    }
  }

  function onCancel(e) {
    if (transitions.has(e.target, e.propertyName)) {
      allEnded = false;
      transitions.pop(e.target, e.propertyName);
      checkDone();
    }
  }

  function off() {
    node.removeEventListener("transitionrun", onRun);
    node.removeEventListener("transitionend", onEnd);
    node.removeEventListener("transitioncancel", onCancel);
    clearTimeout(timeoutId);
  }

  node.addEventListener("transitionrun", onRun);
  node.addEventListener("transitionend", onEnd);
  node.addEventListener("transitioncancel", onCancel);

  timeoutId = setTimeout(() => {
    if (!hasStarted) {
      off();
      const err = new Error(
        "The 'transitionrun' event was not fired after " +
          timeout +
          "ms. Ensure you have css transitions defined on the element."
      );
      signal.reject(err);
    }
  }, timeout);

  return signal.promise;
}
