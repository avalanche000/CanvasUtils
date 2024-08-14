"use strict";

import DrawingUtils from "./DrawingUtils.js";
import VectorRect from "../shapeUtils/VectorRect.js";

class VectorCanvas {
    constructor(DOMObject) {
        this.DOMObject = DOMObject;
        this.draw = new DrawingUtils(this);
        this.rect = new VectorRect;

        window.addEventListener("resize", () => this.resize());

        this.resize();
    }

    resize() {
        this.rect.width = this.DOMObject.width = window.innerWidth;
        this.rect.height = this.DOMObject.height = window.innerHeight;
    }
}

export default VectorCanvas;
