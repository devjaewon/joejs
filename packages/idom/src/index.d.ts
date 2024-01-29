export type IDomCssMap = Record<string, string | number | undefined | null>;

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
  css(cssProperty: string): string | null;
  css<T>(cssProperty: string, cssValue: T): void;
  css(cssMap: Record<string, string>): void;
}

export interface IDomAttributeManager {
  attr(attrName: string): string | null;
  attr(attrName: string, attrValue: string): void;
  attr(attrMap: Record<string, string>): void;
}

export class IDom implements IDomEventManager, IDomAttributeManager, IDomStyleManager {}

export default function (element: HTMLElement): IDom;
