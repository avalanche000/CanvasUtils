"use strict";

class Vector2D {
    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.isVector2D = true;
    }

    toString() {
        return `Vec(x=${this.x}, y=${this.y}, mag=${this.mag}, angle=${this.angle})`;
    }

    toArray() {
        return [this.x, this.y];
    }

    get mag() {
        return Math.hypot(this.x, this.y);
    }

    get magSquared() {
        return this.x ** 2 + this.y ** 2;
    }

    get cos() {
        return this.x / this.mag;
    }

    get sin() {
        return this.x / this.mag;
    }

    get angle() {
        return Math.atan2(this.y, this.x); // wraps -180 to 180
    }

    get slope() {
        return this.y / this.x;
    }

    set mag(mag) {
        const mult = mag / this.mag;

        this.x *= mult;
        this.y *= mult;
    }

    set angle(angle) {
        const mag = this.mag;

        this.x = Math.cos(angle) * mag;
        this.y = Math.sin(angle) * mag;
    }

    set slope(slope) {
        const mag = this.mag;
        
        this.x = 1;
        this.y = slope;
        this.mag = mag;
    }

    setX(x) {
        this.x = x;

        return this;
    }

    setY(y) {
        this.y = y;

        return this;
    }

    setMag(mag) {
        this.mag = mag;

        return this;
    }

    setAngle(angle) {
        this.angle = angle;

        return this;
    }

    clone() {
        return new Vector2D(this.x, this.y);
    }

    copy(other) {
        this.x = other.x;
        this.y = other.y;

        return this;
    }

    from(x, y) {
        this.x = x;
        this.y = y;
        
        return this;
    }

    plus(other) {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    minus(other) {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }

    plusScaled(other, scalar) {
        this.x += other.x * scalar;
        this.y += other.y * scalar;

        return this;
    }

    minusScaled(other, scalar) {
        this.x -= other.x * scalar;
        this.y -= other.y * scalar;

        return this;
    }

    plusInvScaled(other, scalar) {
        this.x += other.x / scalar;
        this.y += other.y / scalar;

        return this;
    }

    minusInvScaled(other, scalar) {
        this.x -= other.x / scalar;
        this.y -= other.y / scalar;

        return this;
    }

    timesScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    divScalar(scalar) {
        this.x /= scalar;
        this.y /= scalar;

        return this;
    }

    unaryMinus() {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    }

    inverse() {
        this.mag = 1 / this.mag;

        return this;
    }

    flipX() {
        this.x = -this.x;

        return this;
    }

    flipY() {
        this.y = -this.y;

        return this;
    }

    norm() {
        this.mag = 1;

        return this;
    }

    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

    cross(other) {
        return this.x * other.y - this.y * other.x;
    }

    dist(other) {
        return Math.hypot(other.x - this.x, other.y - this.y);
    }

    rotate(angle) {
        this.angle += angle;

        return this;
    }

    magAtAngle(angle) {
        return Math.cos(this.angle - angle) * this.mag;
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}

function getXY(data) {
    if (data.x != null && data.y != null) return [data.x, data.y];
    if (data.mag != null) {
        if (data.cos != null && data.sin != null) return [
            data.cos * data.mag,
            data.sin * data.mag
        ];
        if (data.angle != null) return [
            Math.cos(data.angle) * data.mag,
            Math.sin(data.angle) * data.mag
        ];
    }
}

function Vec(...args) {
    switch (args.length) {
        case 0:
            return new Vector2D;
        case 1:
            switch (typeof args[0]) {
                case "number":
                    return new Vector2D(args[0], 0);
                case "object":
                    if (args[0].isVector2D) return args[0].clone();
                    if (args[0].length === 2) return new Vector2D(...args[0]);
                    
                    const xy = getXY(args[0]);
                    if (xy == null) throw Error("Unrecognized vector construction data: " + args);
                    return new Vector2D(...xy);
                default:
                    throw Error("Unrecognized vector construction data: " + args);
            }
        case 2:
            return new Vector2D(...args);
        default:
            throw Error("Unrecognized vector construction data: " + args);
    }
}

export default Vector2D;
export { Vec };
