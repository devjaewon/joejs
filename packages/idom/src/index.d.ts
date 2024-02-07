export type IDomCssValue = number | string | null;

export type IDomDataValue = number | string | boolean | null;

export interface IDomRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

export interface IDomTransitionOption {
  duration?: number;
  timingFunction?: string;
}

export interface IDomEventManager {
  on<E extends Event>(eventName: string, eventHandler: (e: E) => void, life?: number | undefined): this;
  on<E extends Event>(eventSpecification: { [x: string]: (e: E) => void }): this;

  once<E extends Event>(eventName: string, eventHandler: (e: E) => void): this;
  once<E extends Event>(eventSpecification: { [x: string]: (e: E) => void }): this;

  off(eventName: string): this;
  off<E extends Event>(eventName: string, eventHandler: (e: E) => void): this;
  off(): this;
}

export interface IDomStyleManager {
  css<V extends IDomCssValue>(cssProperty: string): V;
  css<V extends IDomCssValue>(cssProperty: string, cssValue: V): this;
  css(cssMap: Record<string, IDomCssValue>): this;
}

export interface IDomAnimationManager {
  transition<V extends IDomCssValue>(cssProperty: string, cssValue: V, option?: IDomTransitionOption): Promise<void>;
}

export interface IDomAttributeManager {
  attr(attrName: string): string | null;
  attr(attrName: string, attrValue: string | null): this;
  attr(attrMap: Record<string, string | null>): this;
  data<V extends IDomDataValue>(dataKey: string): V;
  data<V extends IDomDataValue>(dataKey: string, _: undefined, opt?: { noTypeConversion?: boolean }): V;
  data(dataKey: string, dataValue: IDomDataValue): this;
  data(dataMap: Record<string, IDomDataValue>): this;
  addClass(className: string): this;
  removeClass(className: string): this;
  toggleClass(className: string): this;
  hasClass(className: string): boolean;
}

export interface IDomTreeManager {
  get(index: number): HTMLElement | null;
  find(selector: string): IDom;
  closest(selector: string): IDom;
  first(): IDom;
  last(): IDom;
  rect(): IDomRect;
  text(): string;
  text(innerText: string): this;
  html(): string;
  html(innerHTML: string): this;
}

export interface IDomUtilManager {
  isEmpty(): boolean;
  each(callback: (element: HTMLElement) => void);
}

export interface IDom
  extends IDomEventManager,
    IDomAttributeManager,
    IDomStyleManager,
    IDomAnimationManager,
    IDomTreeManager,
    IDomUtilManager {}

type SelectorString = string;

export default function (elements: HTMLElement | Array<HTMLElement> | SelectorString): IDom;
