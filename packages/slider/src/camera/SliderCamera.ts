import idom, { type IDom } from '@kjojs/idom';
import { SliderAnimation, SliderContext, SliderDirection } from '~/models';
import type { SliderPanel } from '~/panel/SliderPanel';

export abstract class SliderCamera {
  protected _dom: IDom;
  protected _direction: SliderDirection = SliderDirection.STOP;

  constructor(
    element: HTMLElement,
    protected _context: SliderContext,
    protected _panels: Array<SliderPanel>
  ) {
    this._dom = idom(element);
  }

  abstract moveTo(index: number, animation?: SliderAnimation): Promise<void>;
}
