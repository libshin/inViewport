/**
 * Check if element is in viewport
 * @param {HTMLElement} element
 * @param {boolean} strict
 * @return {boolean}
 */
function inViewport(element, strict) {
  const rect = element.getBoundingClientRect();
  const height = window.innerHeight || document.documentElement.clientHeight;
  const width = window.innerWidth || document.documentElement.clientWidth;

  // All 4 corners should be in viewport
  if (strict) {
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= height && rect.right <= width;
  }

  // At least 1 corner is in viewport
  return rect.right >= 0 && rect.bottom >= 0 && rect.left <= width && rect.top <= height;
}

export default inViewport;