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

export { query };
