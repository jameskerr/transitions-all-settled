# Transitions All Settled

This package exports a single function that accepts an HTML node and returns a promise. The promise resolves when all CSS transitions on the HTML node and its children have settled.

This is useful for exit animations to wait for all CSS transitions to settle before removing the node from the DOM.

## Usage

```js
import {transitionsAllSettled} from "transitions-all-settled

await transitionsAllSettled(node)
// do something else
```

## Installation

This package is on NPM so you can install it using your favorite package manager. There are quite a few these days, so I'll only show the npm way in this readme.

```bash
npm install transitions-all-settled
```

If you are not using a bundler, first, well done, second, you can grab this code using an HTTP import.

```js
import {transitionsAllSettled} from "https://esm.run/transitions-all-settled"
```

## How it Works

The term "settled" means that if a node received a `transitionstart` event, it also received a `transitionend` or `transitioncancel` event. This function keeps track of each transitioning css attribute and waits for it to settle.

The package is very small. Take a look at the source to see exactly how it works.

Authored by [James Kerr](http://jameskerr.blog)
