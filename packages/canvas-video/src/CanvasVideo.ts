import { CanvasVideoCanvas } from './CanvasVideoCanvas';
import { CanvasVideoPlayer } from './CanvasVideoPlayer';
import { CanvasVideoVideo } from './CanvasVideoVideo';
import { CanvasVideoOption } from './models';
import { CanvasVideoViewport } from './models/CanvasVideoViewport';

export class CanvasVideo {
  private _player: CanvasVideoPlayer;
  private _video: CanvasVideoVideo;
  private _canvas: CanvasVideoCanvas;
  private _fragment: DocumentFragment;

  constructor(opt: CanvasVideoOption) {
    const viewport = this._createViewport(opt);

    this._player = new CanvasVideoPlayer(opt);
    this._video = new CanvasVideoVideo(this._player, viewport, opt);
    this._canvas = new CanvasVideoCanvas(this._player, viewport, opt.render);
    this._fragment = this._connectAndCreateFragment();
  }

  insertUnder(element: HTMLElement): this {
    element.appendChild(this._fragment);

    return this;
  }

  play(): this {
    this._player.play();

    return this;
  }

  private _createViewport(opt: CanvasVideoOption): CanvasVideoViewport {
    const widthInfo = opt.width;
    const heightInfo = opt.height;
    const ratio = opt.ratio ?? 1;

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

  private _connectAndCreateFragment(): DocumentFragment {
    const videoElement = this._video.element;
    const canvasElement = this._canvas.element;
    const fragment = document.createDocumentFragment();

    videoElement.srcObject = canvasElement.captureStream(this._player.frameRate);
    fragment.appendChild(videoElement);
    fragment.appendChild(canvasElement);

    return fragment;
  }
}
