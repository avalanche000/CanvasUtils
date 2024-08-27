"use strict";

import { createOptions } from "./functionUtils.js";

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

function useSlider(sliderElement, min, max, options) {
    options = createOptions({ value: min, step: 1 }, options);

    sliderElement = query(sliderElement);

    sliderElement.min = min;
    sliderElement.max = max;
    sliderElement.step = options.step;
    sliderElement.value = options.value;

    const listeners = [];

    sliderElement.addEventListener("input", () => listeners.forEach((func) => func(parseFloat(sliderElement.value))));

    return {
        element: sliderElement,
        useValue: (func) => listeners.push(func),
        setValue: (value) => {
            sliderElement.value = value ?? options.value;

            listeners.forEach((func) => func(parseFloat(sliderElement.value)));
        },
    };
}

function useCheckbox(checkboxElement, options) {
    options = createOptions({ checked: false }, options);

    checkboxElement = query(checkboxElement);

    checkboxElement.checked = options.checked;

    const listeners = [];

    checkboxElement.addEventListener("input", () => listeners.forEach((func) => func(checkboxElement.checked)));

    return {
        element: checkboxElement,
        useChecked: (func) => listeners.push(func),
        setChecked: (checked) => {
            checkboxElement.checked = checked ?? options.checked;

            listeners.forEach((func) => func(checkboxElement.checked));
        },
    };
}

async function preloadImage(imagePath, imageDirectory = "./src/assets/images/") {
    return new Promise((resolve, reject) => {
        const path = imageDirectory + imagePath;
        const image = document.createElement("img");

        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);

        image.src = path;
    });
}

async function preloadImageGenerator(imagePath, imageDirectory = "./src/assets/images/") {
    return new Promise((resolve, reject) => {
        const path = imageDirectory + imagePath;
        const image = document.createElement("img");

        image.onload = () => resolve(() => image.cloneNode());
        image.onerror = (error) => reject(error);

        image.src = path;
    });
}

export { query, useSlider, useCheckbox, preloadImage, preloadImageGenerator };
