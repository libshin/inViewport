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

## Listener

```js
const viewportListener = require("@libshin/in-viewport.listener");

const element = document.getElementById("id");

function onVisibilityChange(visible) {
  // content
}

// viewportListener.attach(element: DOMElement, strict: boolean, callback: visible => any, options) => id: number
const id = viewportListener.attach(element, true, onVisibilityChange, {});

// viewportListener.detach(id: number)
viewportListener.detach(id);
```

`onVisibilityChange` will only be called when the visibility changes.

The strict / loose mode is the same as previously.

## Options

```js
const defaultOptions = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  now: false
};
```

`top`, `bottom`, `left`, `right` are extension values of the viewport (`bottom: 50` extends the viewport of 50px at the bottom)

`now` triggers the scan function immediately, and doesn't wait for a scroll, resize, load event.
