/**
 * @param {number} [duration]
 * @returns {Promise<void>}
 */
export function timeout(duration = 1000) {
  return new Promise(resolve => setTimeout(resolve, duration));
}
