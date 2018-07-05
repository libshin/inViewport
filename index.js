/**
 * Check if element is in viewport
 * @param {HTMLElement} element
 * @param {boolean} strict
 * @return {boolean}
 */
function inViewport(element, strict, options) {
  const rect = element.getBoundingClientRect();
  const height = window.innerHeight || document.documentElement.clientHeight;
  const width = window.innerWidth || document.documentElement.clientWidth;
  const offset = { left: 0, right: 0, top: 0, bottom: 0, ...options };

  // All 4 corners should be in viewport
  if (strict) {
    return (
      rect.top >= -offset.top &&
      rect.left >= -offset.left &&
      rect.bottom <= height + offset.bottom &&
      rect.right <= width + offset.right
    );
  }

  // At least 1 corner is in viewport
  return (
    rect.right >= -offset.left &&
    rect.bottom >= -offset.top &&
    rect.left <= width + offset.right &&
    rect.top <= height + offset.bottom
  );
}

export default inViewport;
