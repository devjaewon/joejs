import { SliderContext } from '~/models';
import { SliderPanel } from './SliderPanel';

export class SliderImmutablePanel extends SliderPanel {
  private _start: number;
  private _end: number;

  constructor(element: HTMLElement, context: SliderContext, index: number) {
    super(element, context, index);

    const { left, right } = this._dom.rect();

    this._start = left * -1;
    this._end = right * -1;
  }

  get index(): number {
    return this._index;
  }

  get start(): number {
    return this._start;
  }

  get end(): number {
    return this._end;
  }
}
