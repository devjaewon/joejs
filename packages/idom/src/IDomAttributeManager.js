import { IDom } from './IDom';

IDom.prototype.attr = function (attrMapOrAttrName, attrValue) {
  switch (typeof attrMapOrAttrName) {
    case 'string': {
      if (attrValue === undefined) {
        return this._element.getAttribute(attrMapOrAttrName) || null;
      } else {
        this._element.setAttribute(attrMapOrAttrName, attrValue);
      }
      break;
    }
    case 'object': {
      Object.entries(attrMapOrAttrName).forEach(([attrName, attrValue]) => {
        this.attr(attrName, attrValue);
      });
      break;
    }
  }
};
