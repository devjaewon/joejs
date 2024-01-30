import { IDom } from './IDom';

IDom.prototype.attr = function (attrMapOrAttrName, attrValue) {
  switch (typeof attrMapOrAttrName) {
    case 'string': {
      switch (attrValue) {
        case undefined:
          return this._getAttrValue(attrMapOrAttrName);
        case null:
          return this._removeAttrValue(attrMapOrAttrName);
        default:
          return this._setAttrValue(attrMapOrAttrName, attrValue);
      }
    }
    case 'object': {
      if (attrMapOrAttrName === null) {
        return;
      }
      Object.entries(attrMapOrAttrName).forEach(([attrName, attrValue]) => {
        this.attr(attrName, attrValue);
      });
      break;
    }
  }
};

IDom.prototype.data = function (dataMapOrDataKey, dataValue, opt) {
  switch (typeof dataMapOrDataKey) {
    case 'string': {
      switch (dataValue) {
        case undefined:
          return this._getDataValue(dataMapOrDataKey, opt);
        case null:
          return this._removeDataValue(dataMapOrDataKey);
        default:
          return this._setDataValue(dataMapOrDataKey, dataValue);
      }
    }
    case 'object': {
      if (dataMapOrDataKey === null) {
        return;
      }
      Object.entries(dataMapOrDataKey).forEach(([attrName, attrValue]) => {
        this.data(attrName, attrValue);
      });
      return;
    }
  }
};

IDom.prototype._getAttrValue = function (attrName) {
  if (this.isEmpty()) {
    return null;
  }

  return this._elements[0].getAttribute(attrName) || null;
};

IDom.prototype._removeAttrValue = function (attrName) {
  this.each(element => element.removeAttribute(attrName));
};

IDom.prototype._setAttrValue = function (attrName, attrValue) {
  this.each(element => element.setAttribute(attrName, attrValue));
};

IDom.prototype._getDataValue = function (dataKey, opt) {
  if (this.isEmpty()) {
    return null;
  }

  const value = this._elements[0].dataset[dataKey] || null;
  if (!value || (opt && opt.noTypeConversion)) {
    return value;
  }

  switch (value) {
    case 'true':
      return true;
    case 'false':
      return false;
  }

  const numValue = parseFloat(value);
  if (Number.isNaN(numValue)) {
    return value;
  }

  return numValue;
};

IDom.prototype._removeDataValue = function (dataKey) {
  this.each(element => {
    delete element.dataset[dataKey];
  });
};

IDom.prototype._setDataValue = function (dataKey, dataValue) {
  this.each(element => {
    element.dataset[dataKey] = dataValue.toString();
  });
};
