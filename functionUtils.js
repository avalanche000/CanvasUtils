"use strict";

/**
 * Fills out the default option paramters with the inputted ones
 * @param {object} default - The default options
 * @param {object} options - The inputs uptions to be updated
 * @returns {object} The default object with the options updated
 */
function createOptions(defaults, options) {
    for (const key in options) {
        defaults[key] = options[key];
    }

    return defaults;
}

export { createOptions };
