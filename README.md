# TL;DR

Check if a DOM element is in viewport or not.

## How to use

```js
const inViewport = require("@libshin/in-viewport");

const element = document.getElementById("id");

// inViewport(element: DOMELement, strict: boolean = true)
inViewport(element, true);
// true
```

This function has two modes:

- strict mode
- loose mode

### Strict mode

In strict mode, the function `inViewport` returns `true` is the element is completely within the viewport. If a little part is off the viewport, it will return `false`.

### Loose mode

In loose mode, the function `inViewport` returns `true` is at least a part of the element is within the viewport and returns `false` is the element is completely off the viewport.
