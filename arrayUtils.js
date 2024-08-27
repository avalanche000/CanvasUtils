"use strict";

/**
 * Returns an array of the specified length filled with the specified value
 * @param {number} length - The length of the array to be created
 * @param {any | Function} value - The value to fill each index of the array with, if this is an object, the same object will be used for each index
 * @returns {any[]} The final array
 */
function arrayOf(length, value) {
    if (typeof value === "function") return Array.from({ length }, () => value());
    
    return Array.from({ length }, () => value);
}

/**
 * Returns an ordered array of increasing consecutive integers either [0, a) or [a, b) depending on the inputs
 * @param {number} a - The start of the array of integers, if b is null then a becomes the end of te array
 * @param {number | undefined} b - If defined, then b is the end of the array
 * @returns {number[]} The array of integers
 */
function range(a, b) {
    let min = 0;
    let max;

    if (b == null) {
        max = a;
    } else {
        min = a;
        max = b;
    }

    const array = [];

    for (let i = min; i < max; i++) array.push(i);

    return array;
}

/**
 * Returns an array of each step in a nested counter where each step itself is an array of counters that increase only when the previous reaches its limit, starting from right to left
 * @param {number[]} args - An array of integers that represent how high each counter should go before reseting
 * @returns {number[][]} The array of steps of the nested counters
 */
function nestedCounter(...args) {
    const array = [];
    const length = args.reduce((total, current) => total * current, 1);

    for (let i = 0; i < length; i++) {
        const counters = [];

        let number = i;

        for (let j = args.length - 1; j >= 0; j--) {
            counters.push(number % args[j]);

            number = Math.floor(number / args[j]);
        }

        counters.reverse();

        array.push(counters);
    }

    return array;
}

function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export { arrayOf, range, nestedCounter, random };
