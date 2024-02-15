import { CanvasVideoPlayer } from './CanvasVideoPlayer';
import { CanvasVideoVideoOption } from './models';
import { CanvasVideoViewport } from './models/CanvasVideoViewport';

export class CanvasVideoVideo {
  private _element: HTMLVideoElement;

  constructor(
    private _player: CanvasVideoPlayer,
    private _viewport: CanvasVideoViewport,
    opt?: CanvasVideoVideoOption
  ) {
    this._element = this._createElement(opt);
    this._player.on('play', this._handlePlay);
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

  private readonly _handlePlay = () => {
    this._element.play();
  };
}
