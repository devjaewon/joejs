import { IDom } from './IDom';

IDom.prototype.css = function (cssMapOrCssProperty, cssValue) {
  switch (typeof cssMapOrCssProperty) {
    case 'string': {
      if (cssValue === undefined) {
        return this._element.style.getPropertyValue(cssMapOrCssProperty) || '';
      } else {
        this._element.style.setProperty(cssMapOrCssProperty, cssValue);
      }
      break;
    }
    case 'object': {
      Object.entries(cssMapOrCssProperty).forEach(([cssPropery, cssValue]) => {
        this.css(cssPropery, cssValue);
      });
      break;
    }
  }
};
