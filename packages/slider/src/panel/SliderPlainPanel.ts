import { SliderPanel } from './SliderPanel';

export class SliderPlainPanel extends SliderPanel {
  get x(): number {
    if (this._prev) {
      return this._prev.x + this._prev.width + this._gap[0];
    }

    return this._gap[0];
  }

  setWidth(width: number): this {
    this._width = width;

    return this;
  }
}
