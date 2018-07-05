// https://codepen.io/ayc0/pen/rKgNEe

import inViewport from "../";

const store = {};

function addListener(fn) {
  const id = String(Math.random()).substr(2) + Date.now();
  store[id] = fn;
  return id;
}

function removeListener(id) {
  return delete store[id];
}

function onVisibilityChange(element, strict, callback) {
  let old_visible;
  return () => {
    const visible = inViewport(element, strict);
    if (visible !== old_visible) {
      old_visible = visible;
      if (typeof callback == "function") {
        callback(visible);
      }
    }
  };
}

/**
 * @callback visibleCallback
 * @param {boolean} visible
 */

/**
 * Add listener on load, scroll, resize, content load, and call callback
 * function when the visibility of the element changes
 * @param {HTMLImageElement} element
 * @param {boolean} strict
 * @param {visibleCallback} callback
 * @param {{top: number, bottom: number, left: number, right: number, now: boolean}} options
 * @return {number}
 */
export function attach(element, strict, callback, options = {}) {
  const handler = onVisibilityChange(element, strict, callback, options);
  if (options.now) {
    handler();
  }
  if (window.addEventListener) {
    window.addEventListener("DOMContentLoaded", handler, false);
    window.addEventListener("load", handler, false);
    window.addEventListener("scroll", handler, false);
    window.addEventListener("resize", handler, false);
    return addListener(handler);
  }
  if (window.attachEvent) {
    window.attachEvent("onDOMContentLoaded", handler);
    window.attachEvent("onload", handler);
    window.attachEvent("onscroll", handler);
    window.attachEvent("onresize", handler);
    return addListener(handler);
  }
}

/**
 * Detach listener previously added
 * @param {number} id
 * @return {boolean}
 */
export function detach(id) {
  const handler = store[id];
  if (window.removeEventListener) {
    window.removeEventListener("DOMContentLoaded", handler, false);
    window.removeEventListener("load", handler, false);
    window.removeEventListener("scroll", handler, false);
    window.removeEventListener("resize", handler, false);
    return removeListener(handler);
  }
  if (window.detachEvent) {
    window.detachEvent("onDOMContentLoaded", handler);
    window.detachEvent("onload", handler);
    window.detachEvent("onscroll", handler);
    window.detachEvent("onresize", handler);
    return removeListener(handler);
  }
}
