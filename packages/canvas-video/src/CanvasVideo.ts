import { CanvasVideoCanvas } from './CanvasVideoCanvas';
import { CanvasVideoVideo } from './CanvasVideoVideo';
import { CanvasVideoOption } from './models';
import { CanvasVideoViewport } from './models/CanvasVideoViewport';

export class CanvasVideo {
  private _video: CanvasVideoVideo;
  private _canvas: CanvasVideoCanvas;
  private _viewport: CanvasVideoViewport;
  private _fragment: DocumentFragment;

  constructor(opt: CanvasVideoOption) {
    this._viewport = this._createViewport();
    this._video = new CanvasVideoVideo(this._viewport, opt);
    this._canvas = new CanvasVideoCanvas(this._viewport, opt.render);
    this._fragment = this._createFragment();
  }

  insertUnder(element: HTMLElement): this {
    element.appendChild(this._fragment);

    return this;
  }

  private _createViewport(opt?: CanvasVideoOption): CanvasVideoViewport {
    const widthInfo = opt?.width;
    const heightInfo = opt?.height;
    const ratio = opt?.ratio ?? 1;

    if (widthInfo && heightInfo) {
      return {
        ratio,
        width: widthInfo,
        height: heightInfo,
      };
    } else if (widthInfo) {
      return {
        ratio,
        width: widthInfo,
        height: widthInfo / ratio,
      };
    } else if (heightInfo) {
      return {
        ratio,
        width: ratio * heightInfo,
        height: heightInfo,
      };
    }

    return {
      ratio,
      width: 200,
      height: 200 / ratio,
    };
  }

  private _createFragment(): DocumentFragment {
    const videoElement = this._video.element;
    const canvasElement = this._canvas.element;
    const fragment = document.createDocumentFragment();

    fragment.appendChild(videoElement);
    fragment.appendChild(canvasElement);

    return fragment;
  }
}
