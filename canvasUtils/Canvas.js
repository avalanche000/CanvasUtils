"use strict";

import DrawingUtils from "./DrawingUtils.js";
import Rect from "../shapeUtils/Rect.js";

class Canvas {
    constructor(options) {
        this.DOMObject = options?.DOMObject ?? document.createElement("canvas");
        this.draw = new DrawingUtils(this);
        this.rect = new Rect(0, 0, 0, 0);

        this.DOMObject.addEventListener("resize", () => this.resize());

        if (options?.size) this.setSize(options?.size);
        else this.resize();
    }

    setSize(size) {
        this.rect.width = this.DOMObject.width = size[0];
        this.rect.height = this.DOMObject.height = size[1];   
    }

    resize() {
        this.setSize(this.DOMObject.innerWidth, this.DOMObject.innerHeight);
    }
}

export default Canvas;
