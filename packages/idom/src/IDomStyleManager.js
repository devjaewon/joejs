import { IDom } from './IDom';

IDom.prototype.css = function (cssMapOrCssProperty, cssValue) {
  switch (typeof cssMapOrCssProperty) {
    case 'string': {
      switch (cssValue) {
        case undefined:
          return this._getCssValue(cssMapOrCssProperty);
        case null:
          return this._removeCssValue(cssMapOrCssProperty);
        default:
          return this._setCssValue(cssMapOrCssProperty, cssValue);
      }
    }
    case 'object': {
      if (cssMapOrCssProperty === null) {
        return;
      }
      Object.entries(cssMapOrCssProperty).forEach(([cssPropery, cssValue]) => {
        this.css(cssPropery, cssValue);
      });
      break;
    }
  }
};

IDom.prototype._getCssValue = function (cssKey) {
  if (this.isEmpty()) {
    return null;
  }

  return this._elements[0].style.getPropertyValue(cssKey) || null;
};

IDom.prototype._removeCssValue = function (cssKey) {
  this.each(element => element.style.removeProperty(cssKey));
};

IDom.prototype._setCssValue = function (cssKey, cssValue) {
  this.each(element => element.style.setProperty(cssKey, cssValue));
};
