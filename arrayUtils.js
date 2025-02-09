"use strict";

import { wrap } from "./numberUtils.js";

/**
 * Returns an array of the specified length filled with the specified value
 * @param {number} length - The length of the array to be created
 * @param {any | function} value - The value to fill each index of the array with, if you want to use an object then pass in a function that makes a new object each time
 * @returns {any[]} The final array
 */
function arrayOf(length, value) {
    if (typeof value === "function") return Array.from({ length }, () => value());
    
    return Array.from({ length }, () => value);
}

/**
 * Returns an ordered array of increasing consecutive integers either [0, a) or [a, b) depending on the inputs
 * @param {number} a - The start of the array of integers, if b is null then a becomes the end of the array
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
 * Repeatedly calls a function with increasing consecutive integers either [0, a) or [a, b) depending on the inputs
 * @param {number} a - The start of the set of integers, if b is null then a becomes the end of the set
 * @param {number | undefined} b - If defined, then b is the end of the set
 */
function loop(a, b, callback) {
    let min = 0;
    let max;

    if (b == null) {
        max = a;
    } else {
        min = a;
        max = b;
    }

    for (let i = min; i < max; i++) callback(i);
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

/**
 * Chooses a random value from an array
 * @param {any[]} array - Any array
 * @returns {any} The randomly chosen value from the array
 */
function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Cycles through the values of an array, wrapping them around
 * @param {any[]} array - Any array
 * @param {number} num - The offset to shift the array
 * @returns {any[]} The shifted array
 */
function cycle(array, num) {
    return range(array.length).map(i => array[wrap(0, array.length, i + num)]);
}

export { arrayOf, range, loop, nestedCounter, random, cycle };
