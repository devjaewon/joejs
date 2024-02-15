import { CanvasVideoVideoOption } from './models';
import { CanvasVideoViewport } from './models/CanvasVideoViewport';

export class CanvasVideoVideo {
  private _element: HTMLVideoElement;
  private _totalTime: number;
  private _frameRate: number;

  constructor(
    private _viewport: CanvasVideoViewport,
    opt?: CanvasVideoVideoOption
  ) {
    this._element = this._createElement(opt);
    this._totalTime = opt?.totalTime ?? -1;
    this._frameRate = opt?.frameRate ?? 60;
  }

  get element() {
    return this._element;
  }

  private _createElement(opt?: CanvasVideoVideoOption) {
    const element = document.createElement('video');

    element.width = this._viewport.width;
    element.height = this._viewport.height;

    if (opt?.className) {
      element.classList.add(opt.className);
    }
    if (opt?.inlineStyles) {
      Object.entries(opt.inlineStyles).forEach(([property, value]) => {
        element.style.setProperty(property, value.toString());
      });
    }

    return element;
  }
}
