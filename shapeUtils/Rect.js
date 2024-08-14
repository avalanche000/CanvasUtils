"use strict";

class Rect {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isRect = true;
    }

    static fromPosSize(pos, size) {
        return new Rect(pos[0], pos[1], size[0], size[1]);
    }

    toArray() {
        return [this.x, this.y, this.width, this.height];
    }

    get pos() {
        return new [this.x, this.y];
    }

    get size() {
        return new [this.width, this.height];
    }

    get center() {
        return new [this.x + this.width / 2, this.y + this.height / 2];
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
      return new [this.x + this.width * anchor[0], this.y + this.height * anchor[1]];
    }

    set pos(pos) {
      this.x = pos[0];
      this.y = pos[1];
    }

    set size(size) {
      this.width = size[0];
      this.height = size[1];
    }

    set center(center) {
      this.x = center[0] - this.width / 2;
      this.y = center[1] - this.height / 2;
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
      this.x = pos[0] - this.width * anchor[0];
      this.y = pos[1] - this.height * anchor[0];
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

export default Rect;
