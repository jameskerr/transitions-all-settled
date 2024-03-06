This package exports a single function that accepts an HTML node and returns a promise. The promise resolves when all CSS transitions on the HTML node and its children have settled.

```js
await transitionsAllSettled(node)
```

This is useful for exit animations to wait for all CSS transitions to settle before removing the node from the DOM.

The term "settled" means that if a node received a `transitionstart` event, it also received a `transitionend` or `transitioncancel` event.

The package is very small. Take a look at the source to see exactly how it works.

Authored by [James Kerr](http://jameskerr.blog)
