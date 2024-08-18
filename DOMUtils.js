"use strict";

function query(...args) {
    let element = document;

    for (let i = 0; i < args.length; i++) {
        if (typeof args[i] === "string") {
            element = element.querySelector(args[i]);
        } else {
            element = args[i];
        }
    }
    
    return element;
}

function useSlider(sliderElement, min, max, value) {
    sliderElement = query(sliderElement);

    sliderElement.min = min;
    sliderElement.max = max;
    sliderElement.value = value;

    const listeners = []

    sliderElement.addEventListener("input", () => listeners.forEach((func) => func(parseInt(sliderElement.value))));

    return (func) => listeners.push(func);
}

export { query, useSlider };
