import { IDom } from './IDom';
import { convertRectToIDomRect } from './IDomUtils';

IDom.prototype.get = function (index) {
  return this._el[index] || null;
};

IDom.prototype.closest = function (selector) {
  const newElements = [];

  this.each(element => {
    const closestElement = this._closest(element, selector);

    if (closestElement) {
      newElements.push(closestElement);
    }
  });

  return new IDom(newElements);
};

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

IDom.prototype.rect = function () {
  if (this.isEmpty()) {
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
    };
  }

  const domRect = this._el[0].getBoundingClientRect();

  return convertRectToIDomRect(domRect);
};

IDom.prototype.html = function (html) {
  switch (typeof html) {
    case 'undefined': {
      let result = '';
      this.each(element => {
        result += element.innerHTML;
      });

      return result;
    }
    case 'string': {
      this.each(element => {
        element.innerHTML = html;
      });
      break;
    }
  }

  return this;
};

IDom.prototype.text = function (text) {
  switch (typeof text) {
    case 'undefined': {
      let result = '';
      this.each(element => {
        result += element.innerText;
      });

      return result;
    }
    case 'string': {
      this.each(element => {
        element.innerText = text;
      });
      break;
    }
  }

  return this;
};

IDom.prototype._closest = function (element, selector) {
  let cursor = element;
  let closestElement = null;

  while (cursor) {
    if (cursor.matches(selector)) {
      return cursor;
    }

    cursor = cursor.parentElement;
  }

  return closestElement;
};
