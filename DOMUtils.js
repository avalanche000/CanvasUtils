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

    return [
        () => parseInt(sliderElement.value),
        (value) => sliderElement.value = value,
    ];
}

export { query, useSlider };
