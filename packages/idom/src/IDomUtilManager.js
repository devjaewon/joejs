import { IDom } from './IDom';

IDom.prototype.each = function (callback) {
  this._elements.forEach(callback);
};

IDom.prototype.isEmpty = function () {
  return this._elements.length === 0;
};
