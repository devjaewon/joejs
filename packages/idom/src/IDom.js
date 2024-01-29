import EventBus from '@kjojs/eventbus';

/**
 * @typedef {import('./index').IDom}
 * @param {HTMLElement} element
 */
export function IDom(element) {
  this._element = element;
  this._eventBus = new EventBus();
  this._eventMap = {};
}
