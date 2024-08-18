"use strict";

/**
 * (Linear Interpolate) Interpolates between two values a and b with t=0 being a and t=1 being b
 * @param {number} a - The value at t=0
 * @param {number} b - The value at t=1
 * @param {number} t - The interpolation value
 * @returns {number} The interpolated value
 */
function createOptions(defaults, options) {
    for (const key in options) {
        defaults[key] = options[key];
    }

    return defaults;
}

export { createOptions };
