var inViewport = require("./in_viewport");

var store = {};

function addListener(fn) {
  var id = Date.now();
  store[id] = fn;
  return id;
}

function removeListener(id) {
  return delete store[id];
}

function onVisibilityChange(element, strict, callback) {
  var old_visible;
  strict = strict || true;
  return function() {
    var visible = inViewport(element, strict);
    if (visible !== old_visible) {
      old_visible = visible;
      if (typeof callback == "function") {
        callback(visible);
      }
    }
  };
}

/**
 * Add listener on load, scroll, resize, content load, and call callback
 * function when the visibility of the element changes
 * @param {HTMLElement} element
 * @param {boolean} strict
 * @param {function} callback
 * @return {number}
 */
function attach(element, strict, callback) {
  var handler = onVisibilityChange(element, strict, callback);
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
function detach(id) {
  var handler = store[id];
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

module.exports = { attach: attach, detach: detach };
