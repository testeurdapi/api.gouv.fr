/**
 * All or part of the element is visible
 */
export const isElementVisible = (el, offsetTop = 0) => {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return !(rect.top > windowHeight - offsetTop || rect.bottom < 0 + offsetTop);
};

/**
 * Get hash from window location
 */
export const getWindowHash = () => {
  if (typeof window === 'undefined' || !window.location.hash) {
    return null;
  }
  return window.location.hash.substr(1);
};

/**
 * Generate random id
 */
export const randomId = (length = 10) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
