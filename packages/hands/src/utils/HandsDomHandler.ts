import { handsBindRequiredError } from '~/errors/errors';

export type HandsDomStyleMap = Record<string, string | number | undefined | null>;

export type HandsDomEventName = string;

export type HandsDomEventHandler<E extends Event> = (e: E) => void;

export class HandsDomHandler {
  private _initialStyles: HandsDomStyleMap | null = null;
  private _removedStyles: HandsDomStyleMap | null = null;
  private _eventsMap: Record<HandsDomEventName, Array<HandsDomEventHandler<Event>>> = {};

  constructor(private el: HTMLElement) {}

  on<E extends Event>(eventName: string, eventHandler: HandsDomEventHandler<E>) {
    this._eventsMap[eventName] = this._eventsMap[eventName] || [];
    this._eventsMap[eventName].push(eventHandler as HandsDomEventHandler<Event>);
    this.el.addEventListener(eventName, eventHandler as EventListenerOrEventListenerObject);
  }

  off<E extends Event>(eventName: string, eventHandler: HandsDomEventHandler<E>) {
    const i = (this._eventsMap[eventName] || []).indexOf(eventHandler as HandsDomEventHandler<Event>);
    if (i >= 0) {
      this._eventsMap[eventName].splice(i, 1);
      this.el.removeEventListener(eventName, eventHandler as EventListenerOrEventListenerObject);
    }
  }

  destroy() {
    Object.keys(this._eventsMap).forEach(eventName => {
      (this._eventsMap[eventName] || []).forEach(eventHandler => {
        this.el.removeEventListener(eventName, eventHandler as EventListenerOrEventListenerObject);
      });
    });
    this._restoreStyles();
  }

  initStyles(cssStyles: HandsDomStyleMap) {
    if (this._initialStyles) {
      this._restoreStyles();
    }
    this._initialStyles = cssStyles;
    this._removedStyles = {};
    this._setStylesByMap(cssStyles, true);
  }

  private _restoreStyles() {
    if (this._initialStyles) {
      const _initialStylesProperties = Object.keys(this._initialStyles);
      this._removeStyles(_initialStylesProperties);
      this._initialStyles = null;
    }
    if (this._removedStyles) {
      this._setStylesByMap(this._removedStyles);
      this._removedStyles = null;
    }
  }

  private _setStylesByMap(styleMap: HandsDomStyleMap, remember?: boolean) {
    const el = this.el;
    if (!el) {
      throw handsBindRequiredError;
    }

    Object.keys(styleMap).forEach(property => {
      const value = styleMap[property];
      if (value === null || value === undefined) {
        return;
      }

      if (remember) {
        const existedValue = el.style.getPropertyValue(property);
        if (existedValue && this._removedStyles) {
          this._removedStyles[property] = existedValue;
        }
      }

      el.style.setProperty(property, value.toString());
    });
  }

  private _removeStyles(styleProperties: string[]) {
    const el = this.el;
    if (!el) {
      throw handsBindRequiredError;
    }

    styleProperties.forEach(property => el.style.removeProperty(property));
  }
}
