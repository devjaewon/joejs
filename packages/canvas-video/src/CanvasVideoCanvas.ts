import { CanvasVideoRenderer } from './models';
import { CanvasVideoViewport } from './models/CanvasVideoViewport';

export class CanvasVideoCanvas {
  private _element: HTMLCanvasElement;

  constructor(
    private _viewport: CanvasVideoViewport,
    private _renderer: CanvasVideoRenderer
  ) {
    this._element = this._createElement();
  }

  get element(): HTMLCanvasElement {
    return this._element;
  }

  private _createElement() {
    const element = document.createElement('canvas');

    element.width = this._viewport.width;
    element.height = this._viewport.height;
    element.style.setProperty('display', 'none');

    return element;
  }
}
