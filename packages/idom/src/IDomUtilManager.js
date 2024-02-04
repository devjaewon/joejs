import { IDom } from './IDom';

IDom.prototype.each = function (callback) {
  this._el.forEach(callback);
};

IDom.prototype.isEmpty = function () {
  return this._el.length === 0;
};
