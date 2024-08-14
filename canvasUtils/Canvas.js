"use strict";

import DrawingUtils from "./DrawingUtils.js";

class Canvas {
    constructor(DOMObject) {
        this.DOMObject = DOMObject;
        this.draw = new DrawingUtils(this);
        this.rect = [0, 0, 0, 0];

        window.addEventListener("resize", () => this.resize());

        this.resize();
    }

    resize() {
        this.rect[2] = this.DOMObject.width = window.innerWidth;
        this.rect[3] = this.DOMObject.height = window.innerHeight;
    }
}

export default Canvas;
