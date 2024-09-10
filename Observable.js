"use strict";

class Observable {
  constructor(...args) {
    const variables = new Map();
    const listeners = new Map();

    args.forEach((variable) => {
      listeners.set(variable, []);

      Object.defineProperty(this, variable, {
        get: () => variables.get(variable),
        set: (value) => {
          variables.set(variable, value);
          listeners.get(variable).forEach((cb) => cb(value));
        },
      });
    });

    this.unsubscribe = (variable, cb) => {
      const array = listeners.get(variable);

      if (array == null) return;

      const index = array.indexOf(cb);

      if (index === -1) return;

      delete array[index];
    };
    this.subscribe = (variable, cb) => {
      const array = listeners.get(variable);

      if (array == null) return;

      array.push(cb);

      return () => this.unsubscribe(variable, cb);
    };
  }
}

export default Observable;
