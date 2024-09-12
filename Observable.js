"use strict";

class Observable {
  constructor(...variableNames) {
    const variables = new Map();
    const listeners = new Map();

    variableNames.forEach(variable => {
      listeners.set(variable, new Set());

      Object.defineProperty(this, variable, {
        get: () => variables.get(variable),
        set: (value) => {
          if (variables.get(variable) === value) return;

          variables.set(variable, value);
          listeners.get(variable).forEach(cb => cb(value));
        },
      });
    });

    this.unsubscribe = (variable, cb) => listeners.get(variable)?.delete(cb);
    this.subscribe = (variable, cb) => {
      listeners.get(variable)?.add(cb);

      return () => this.unsubscribe(variable, cb);
    };
  }
}

export default Observable;
