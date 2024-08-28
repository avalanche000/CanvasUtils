"use strict";

import DrawingUtils from "./DrawingUtils.js";
import Rect from "../shapeUtils/Rect.js";

class Canvas {
    constructor(DOMObject) {
        this.DOMObject = DOMObject;
        this.draw = new DrawingUtils(this);
        this.rect = new Rect(0, 0, 0, 0);

        window.addEventListener("resize", () => this.resize());

        this.resize();
    }

    resize() {
        this.rect.width = this.DOMObject.width = window.innerWidth;
        this.rect.height = this.DOMObject.height = window.innerHeight;
    }
}

export default Canvas;
