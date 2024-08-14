"use strict";

/**
 * Converts an angle in radians to degrees
 * @param {float} rad - The angle in radians
 * @returns {float} The angle in degrees
 */
function toDeg(rad) {
  return rad * 180 / Math.PI;
}

/**
 * Converts an angle in degrees to radians
 * @param {float} rad - The angle in degrees
 * @returns {float} The angle in radians
 */
function toRad(deg) {
  return deg * Math.PI / 180;
}

/**
 * Wraps a value between a min and max where any out-of-bounds number will be added or subtracted by the range until it falls within the boundary [min, max)
 * @param {float} min - The minimum value of the wrap range, the return value can equal this number
 * @param {float} max - The maximum vlaue of the wrap range, the return value may not equal this number
 * @param {float} x - The number to wrap
 * @returns {float} The wrapped number on the range [min, max)
 */
function wrap(min, max, x) {
    const wrapRange = max - min;

    while (x < min) x += wrapRange;
    while (x >= max) x -= wrapRange;

    return x;
}

/**
 * Clamps a value between a min and max where any out-of-bounds number will become either the min or the max depending on which direction it has left the range [min, max]
 * @param {float} min - The minimum value of the clamp range, the return value can equal this number
 * @param {float} max - The maximum vlaue of the clamp range, the return value can equal this number
 * @param {float} x - The number to clamp
 * @returns {float} The clamped number on the range [min, max]
 */
function clamp(min, max, x) {
    if (x > max) return max;
    if (x < min) return min;
    return x;
}

export { toDeg, toRad, wrap, clamp };
