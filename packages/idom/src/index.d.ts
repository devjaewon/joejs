export type IDomCssValue = number | string | null;

export type IDomDataValue = number | string | boolean | null;

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
  css<V extends IDomCssValue>(cssProperty: string, cssValue: V): void;
  css(cssMap: Record<string, IDomCssValue>): void;
}

export interface IDomAttributeManager {
  attr(attrName: string): string | null;
  attr(attrName: string, attrValue: string | null): void;
  attr(attrMap: Record<string, string | null>): void;
  data<V extends IDomDataValue>(dataKey: string): V;
  data<V extends IDomDataValue>(dataKey: string, _: undefined, opt?: { noTypeConversion?: boolean }): V;
  data(dataKey: string, dataValue: IDomDataValue): void;
  data(dataMap: Record<string, IDomDataValue>): void;
}

export interface IDomUtilManager {
  isEmpty(): boolean;
  each(callback: (element: HTMLElement) => void);
}

export interface IDom extends IDomEventManager, IDomAttributeManager, IDomStyleManager, IDomUtilManager {}

type SelectorString = string;

export default function (elements: HTMLElement | Array<HTMLElement> | SelectorString): IDom;
