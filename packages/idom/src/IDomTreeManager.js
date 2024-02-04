import { IDom } from './IDom';

IDom.prototype.find = function (selector) {
  const newElements = [];

  this.each(element => {
    element.querySelectorAll(selector).forEach(element => {
      newElements.push(element);
    });
  });

  return new IDom(newElements);
};

IDom.prototype.first = function () {
  return new IDom(this.isEmpty() ? [] : [this._el[0]]);
};

IDom.prototype.last = function () {
  return new IDom(this.isEmpty() ? [] : [this._el[this._el.length - 1]]);
};
