import { CanvasVideoPlayer } from './CanvasVideoPlayer';
import { CanvasVideoRenderer } from './models';
import { CanvasVideoViewport } from './models/CanvasVideoViewport';

export class CanvasVideoCanvas {
  private _element: HTMLCanvasElement;
  private _renderingContext: CanvasRenderingContext2D;

  constructor(
    private _player: CanvasVideoPlayer,
    private _viewport: CanvasVideoViewport,
    private _renderer: CanvasVideoRenderer
  ) {
    this._element = this._createElement();
    const renderingContext = this._element.getContext('2d');
    if (renderingContext) {
      this._renderingContext = renderingContext;
    } else {
      throw new Error('canvas context not usable');
    }

    this._player.on('tick', this._handleTick);
  }

  get element(): HTMLCanvasElement {
    return this._element;
  }

  destroy() {
    this._player.off('tick', this._handleTick);
  }

  private _createElement() {
    const element = document.createElement('canvas');

    element.width = this._viewport.width;
    element.height = this._viewport.height;
    element.style.setProperty('display', 'none');

    return element;
  }

  private readonly _handleTick = (player: CanvasVideoPlayer) => {
    this._renderer(this._renderingContext, player.state);
  };
}
