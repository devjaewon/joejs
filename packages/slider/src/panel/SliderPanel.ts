import idom, { type IDom } from '@kjojs/idom';
import { SliderContext } from '~/models';

export abstract class SliderPanel {
  protected _dom: IDom;

  constructor(
    element: HTMLElement,
    protected _context: SliderContext,
    protected _index: number
  ) {
    this._dom = idom(element);
  }

  abstract get index(): number;
  abstract get start(): number;
  abstract get end(): number;
}
