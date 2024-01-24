/* eslint-disable @typescript-eslint/no-this-alias */
import { IDom } from './IDom';

IDom.prototype.on = function (eventName, eventHandler, life) {
  this._eventBus.on(eventName, eventHandler, life);
  switch (typeof eventName) {
    case 'string': {
      this._checkAndAttachEventHandler(eventName);
      break;
    }
    case 'object': {
      if (eventName) {
        Object.keys(eventName).forEach(name => this._checkAndAttachEventHandler(name));
      }
      break;
    }
  }

  return this;
};

IDom.prototype.once = function (eventName, eventHandler) {
  this.on(eventName, eventHandler, 1);

  return this;
};

IDom.prototype.off = function (eventName, eventHandler) {
  this._eventBus.off(eventName, eventHandler);
  if (!eventName) {
    this._clearEventHandler();
  } else {
    this._checkAndDetachEventHandler(eventName);
  }

  return this;
};

IDom.prototype._checkAndAttachEventHandler = function (eventName) {
  if (!this._eventBus.has(eventName)) {
    const handler = this._handleEvent(eventName);

    this._element.addEventListener(eventName, handler);
    this._eventMap[eventName] = handler;
  }
};

IDom.prototype._checkAndDetachEventHandler = function (eventName) {
  if (this._eventBus.has(eventName)) {
    const handler = this._eventMap[eventName];

    this._element.removeEventListener(eventName, handler);
  }
};

IDom.prototype._clearEventHandler = function () {
  Object.keys(this._eventMap).forEach(eventName => {
    const handler = this._eventMap[eventName];

    if (handler) {
      this._element.removeEventListener(eventName, handler);
    }
  });
};

IDom.prototype._handleEvent = function (eventName) {
  const self = this;

  return function (e) {
    self._eventBus.emit(eventName, e);
  };
};
