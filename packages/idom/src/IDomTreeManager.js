import { IDom } from './IDom';

IDom.prototype.get = function (index) {
  return this._el[index] || null;
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
  const width = domRect.width;
  const height = domRect.height;
  const left = domRect.left ?? domRect.x;
  const top = domRect.top ?? domRect.y;
  const right = left + width;
  const bottom = top + height;

  return {
    top,
    right,
    bottom,
    left,
    width,
    height,
  };
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
