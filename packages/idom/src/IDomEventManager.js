import { IDom } from './IDom';

IDom.prototype.on = function (eventName, eventHandler, life) {
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
  this._evbus.on(eventName, eventHandler, life);

  return this;
};

IDom.prototype.once = function (eventName, eventHandler) {
  this.on(eventName, eventHandler, 1);

  return this;
};

IDom.prototype.off = function (eventName, eventHandler) {
  this._evbus.off(eventName, eventHandler);
  if (!eventName) {
    this._clearEventHandler();
  } else {
    this._checkAndDetachEventHandler(eventName);
  }

  return this;
};

IDom.prototype._checkAndAttachEventHandler = function (eventName) {
  if (!this._evbus.has(eventName)) {
    const handler = this._handleEvent(eventName);

    this.each(element => element.addEventListener(eventName, handler));
    this._evmap[eventName] = handler;
  }
};

IDom.prototype._checkAndDetachEventHandler = function (eventName) {
  if (!this._evbus.has(eventName)) {
    const handler = this._evmap[eventName];

    this.each(element => element.removeEventListener(eventName, handler));
  }
};

IDom.prototype._clearEventHandler = function () {
  Object.keys(this._evmap).forEach(eventName => {
    const handler = this._evmap[eventName];

    if (handler) {
      this.each(element => element.removeEventListener(eventName, handler));
    }
  });
};

IDom.prototype._handleEvent = function (eventName) {
  return e => {
    this._evbus.emit(eventName, e);
  };
};
