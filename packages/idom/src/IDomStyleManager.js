import { IDom } from './IDom';

IDom.prototype.css = function (cssMapOrCssProperty, cssValue) {
  switch (typeof cssMapOrCssProperty) {
    case 'string': {
      switch (cssValue) {
        case undefined:
          return this._getCssValue(cssMapOrCssProperty);
        case null:
          this._removeCssValue(cssMapOrCssProperty);
          break;
        default:
          this._setCssValue(cssMapOrCssProperty, cssValue);
          break;
      }
      break;
    }
    case 'object': {
      if (cssMapOrCssProperty === null) {
        return this;
      }
      Object.entries(cssMapOrCssProperty).forEach(([cssPropery, cssValue]) => {
        this.css(cssPropery, cssValue);
      });
      break;
    }
  }

  return this;
};

IDom.prototype._getCssValue = function (cssKey) {
  if (this.isEmpty()) {
    return null;
  }

  return this._el[0].style.getPropertyValue(cssKey) || null;
};

IDom.prototype._removeCssValue = function (cssKey) {
  this.each(element => element.style.removeProperty(cssKey));
};

IDom.prototype._setCssValue = function (cssKey, cssValue) {
  this.each(element => element.style.setProperty(cssKey, cssValue));
};
