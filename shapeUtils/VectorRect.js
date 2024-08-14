"use strict";

import Vector2D from "./Vector2D.js";

class VectorRect {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isRect = true;
    }

    static fromPosSize(pos, size) {
        return new Rect(pos.x, pos.y, size.x, size.y);
    }

    toArray() {
        return [this.x, this.y, this.width, this.height];
    }

    get pos() {
        return new Vector2D(this.x, this.y);
    }

    get size() {
        return new Vector2D(this.width, this.height);
    }

    get center() {
        return new Vector2D(this.x + this.width / 2, this.y + this.height / 2);
    }

    get bottom() {
        return this.y;
    }

    get top() {
        return this.y + this.height;
    }

    get left() {
        return this.x;
    }

    get right() {
        return this.x + this.width;
    }

    get centerX() {
        return this.x + this.width / 2;
    }

    get centerY() {
        return this.y + this.height / 2;
    }

    getAnchor(anchor) {
      return new Vector2D(this.x + this.width * anchor.x, this.y + this.height * anchor.y);
    }

    set pos(pos) {
      this.x = pos.x;
      this.y = pos.y;
    }

    set size(size) {
      this.width = size.x;
      this.height = size.y;
    }

    set center(center) {
      this.x = center.x - this.width / 2;
      this.y = center.y - this.height / 2;
    }

    set bottom(bottom) {
        this.y = bottom;
    }

    set top(top) {
        this.y = top - this.height;
    }

    set left(left) {
        this.x = left;
    }

    set right(right) {
        this.x = right - this.width;
    }

    set centerX(centerX) {
        this.x = centerX - this.width / 2;
    }

    set centerY(centerY) {
        this.y = centerY - this.height / 2;
    }

    setAnchor(anchor, pos) {
      this.x = pos.x - this.width * anchor.x;
      this.y = pos.y - this.height * anchor.y;
    }

    clone() {
        return new Rect(this.x, this.y, this.width, this.height);
    }

    copy(other) {
      this.x = other.x;
      this.y = other.y;
      this.width = other.width;
      this.height = other.height;
    }

    timesScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.width *= scalar;
        this.height *= scalar;

        return this;
    }

    divScalar(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        this.width /= scalar;
        this.height /= scalar;

        return this;
    }
}

export default VectorRect;
