"use strict";

class Vector {
    constructor(dimension, variables = ["x", "y", "z"]) {
        this.array = typeof dimension === "number" ? Array.from({ length: dimension }, () => 0) : [...dimension];
        this.dimension = this.array.length;
        this.variables = variables;

        this.variables.forEach((variableName, i) => {
            if (i >= this.array.length) return;

            Object.defineProperty(this, variableName, {
                get: () => this.array[i],
                set: (value) => {
                    this.array[i] = value
                },
            });
        });
    }

    toString() {
        return `Vector(${this.array})`;
    }

    toArray() {
        return [...this.array];
    }

    // magnitude
    get mag() {
        return Math.hypot(...this.array);
    }

    // magnitude squared
    get magSqrd() {
        return this.array.reduce((total, curr) => total + curr ** 2, 0);
    }

    set mag(mag) {
        const ratio = mag / this.mag;

        this.array = this.array.map(value => value * ratio);
    }

    set magSqrd(magSqrd) {
        const ratio = Math.sqrt(magSqrd / this.magSqrd);

        this.array = this.array.map(value => value * ratio);
    }

    setIndex(index, value) {
        this.array[index] = value;

        return this;
    }

    setVar(variable, value) {
        this[variable] = value;

        return this;
    }

    setArray(array) {
        this.array = [...array];

        return this;
    }

    setMag(mag) {
        this.mag = mag;

        return this;
    }

    setMagSqrd(magSqrd) {
        this.magSqrd = magSqrd;

        return this;
    }

    plus(other) {
        this.array = this.array.map((value, i) => value + other.array[i]);

        return this;
    }

    minus(other) {
        this.array = this.array.map((value, i) => value - other.array[i]);

        return this;
    }

    plusScaled(other, scalar) {
        this.array = this.array.map((value, i) => value + other.array[i] * scalar);

        return this;
    }

    minusScaled(other, scalar) {
        this.array = this.array.map((value, i) => value - other.array[i] * scalar);

        return this;
    }

    plusInvScaled(other, scalar) {
        this.array = this.array.map((value, i) => value + other.array[i] / scalar);

        return this;
    }

    minusInvScaled(other, scalar) {
        this.array = this.array.map((value, i) => value - other.array[i] / scalar);

        return this;
    }

    timesScalar(scalar) {
        this.array = this.array.map(value => value * scalar);

        return this;
    }

    divScalar(scalar) {
        this.array = this.array.map(value => value / scalar);

        return this;
    }

    unaryMinus() {
        this.array = this.array.map(value => value * -1);

        return this;
    }

    flipIndex(index) {
        this.array[index] *= -1;

        return this;
    }

    flipVar(variable) {
        this[variable] *= -1;

        return this;
    }

    norm() {
        this.mag = 1;

        return this;
    }

    dot(other) {
        return this.array.reduce((total, curr, i) => total + curr * other.array[i], 0);
    }

    dist(other) {
        return Math.hypot(this.array.map((value, i) => value - other.array[i]));
    }

    equals(other) {
        if (this.array.length !== other.array.length) return false;
        
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] !== other.array[i]) return false;
        }

        return true;
    }

    clone() {
        return new Vector(this.array, this.variables);
    }

    copy(other) {
        this.array = [...other.array];

        return this;
    }
}

export default Vector;
