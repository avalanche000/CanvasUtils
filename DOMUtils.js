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

function createImage(src) {
    const image = new Image();
    
    return new Promise((resolve, reject) => {
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        
        image.src = src;
    });
}

function preloadImage(imagePath, imageDirectory = "./src/assets/images/") {
    const image = new Image();
    
    return new Promise((resolve, reject) => {
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        
        image.src = imageDirectory + imagePath;
    });
}

function preloadImageGenerator(imagePath, imageDirectory = "./src/assets/images/") {
    const image = new Image();
    
    return new Promise((resolve, reject) => {
        image.addEventListener("load", () => resolve(() => image.cloneNode()));
        image.addEventListener("error", (error) => reject(error));
        
        image.src = imageDirectory + imagePath;
    });
}

async function preloadImages(imagePaths, imageDirectory = "./src/assets/images/") {
    const images = [];

    for (let i = 0; i < imagePaths.length; i++) {
        const image = await preloadImage(imagePaths[i], imageDirectory);

        images.push(image);
    }

    return images;
}

async function preloadImageGenerators(imagePaths, imageDirectory = "./src/assets/images/") {
    const generators = [];

    for (let i = 0; i < imagePaths.length; i++) {
        const generator = await preloadImageGenerator(imagePaths[i], imageDirectory);

        generators.push(generator);
    }

    return generators;
}

async function useSpritesheet(
    path,
    spritesheetDirectory = "/src/assets/spritesheets/"
) {
    const json = await fetch(spritesheetDirectory + path).then((response) =>
        response.json()
    );
    
    const image = await createImage(json.meta.image);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = json.meta.size.w;
    canvas.height = json.meta.size.h;
    
    ctx.drawImage(image, 0, 0);
    
    return (sprite) => {
        const spriteRect = json.frames[sprite].frame;
        const spriteCanvas = document.createElement("canvas");
        const spriteCtx = spriteCanvas.getContext("2d");
        const spriteImageData = ctx.getImageData(
            spriteRect.x,
            spriteRect.y,
            spriteRect.w,
            spriteRect.h
        );
        
        spriteCanvas.width = spriteRect.w;
        spriteCanvas.height = spriteRect.h;
        
        spriteCtx.putImageData(spriteImageData, 0, 0);
        
        return spriteCanvas;
    };
}

export { query, useSlider, useCheckbox, createImage, preloadImage, preloadImageGenerator, preloadImages, preloadImageGenerators, useSpritesheet };
