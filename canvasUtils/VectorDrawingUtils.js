"use strict";

class VectorDrawingUtils {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.DOMObject.getContext("2d");
    }

    clear() {
        this.ctx.clearRect(...this.canvas.rect.toArray());
    }

    fillRect(color, rect) {
        this.ctx.fillStyle = color;
        
        this.ctx.fillRect(...rect.toArray());
    }

    fill(color) {
        this.fillRect(color, this.canvas.rect);
    }

    circle(color, pos, radius, width) {
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;

        this.ctx.beginPath();

        this.ctx.arc(...pos.toArray(), radius, 0, 2 * Math.PI);

        this.ctx.closePath();

        if (width == null) this.ctx.fill();
        else {
            this.ctx.lineWidth = width;
            this.ctx.stroke();
        }
    }

    line(color, startPos, endPos, width = 1) {
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color;

        this.ctx.beginPath();

        this.ctx.moveTo(...startPos.toArray());
        this.ctx.lineTo(...endPos.toArray());

        this.ctx.closePath();

        this.ctx.stroke();
    }

    poly(color, points, width) {
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;

        this.ctx.beginPath();

        this.ctx.moveTo(...points[points.length - 1].toArray());
        points.forEach(point => this.ctx.lineTo(...point.toArray()));
        
        this.ctx.closePath();

        if (width == null) this.ctx.fill();
        else {
            this.ctx.lineWidth = width;
            this.ctx.stroke();
        }
    }
}

export default VectorDrawingUtils;
