import EventBus from '@kjojs/eventbus';

/**
 * @typedef {import('./index').IDom}
 * @param {HTMLElement | Array<HTMLElement> | string} element
 */
export function IDom(elements) {
  this._el = this._initElements(elements);
  this._evbus = new EventBus();
  this._evmap = {};
}

IDom.prototype._initElements = function (elements) {
  switch (typeof elements) {
    case 'string': {
      return Array.prototype.slice.call(document.querySelectorAll(elements));
    }
    case 'object': {
      if (Array.isArray(elements) && elements.every(element => element instanceof Element)) {
        return elements;
      }
      console.log(elements);
      if (elements instanceof Element) {
        return [elements];
      }
      break;
    }
  }

  throw new Error('[@kjojs/idom] invalid elements');
};
