import { HandsSource } from '../common/HandsSource';
import { HandsSourceOption } from '../common/HandsSourceOption';

export enum MouseSourceStatus {
  ready,
  start,
  move,
  end,
}

export const MOUSE_SOURCE_ID = 'MOUSE_SOURCE';

export class MouseSource extends HandsSource {
  private _status = MouseSourceStatus.ready;
  private _event: MouseEvent | null = null;

  constructor(element: HTMLElement, opt?: HandsSourceOption) {
    super(MOUSE_SOURCE_ID, element, opt);
  }

  init(): void {
    this.dom.css({
      'user-drag': 'none',
      '-webkit-user-drag': 'none',
      '-moz-user-drag': 'none',
    });
    this._subscribeNativeEvents();
  }

  get status(): MouseSourceStatus {
    return this._status;
  }

  get event(): MouseEvent | null {
    return this._event;
  }

  private _clear() {
    this._status = MouseSourceStatus.ready;
    this._event = null;
  }

  private _subscribeNativeEvents() {
    if (this._isSubscribed) {
      return;
    }

    this.dom.on('mousedown', this._handleMouseStart);
    this.dom.on('mousemove', this._handleMouseMove);
    this.dom.on('mouseleave', this._handleMouseEnd);
    this.dom.on('mouseup', this._handleMouseEnd);
    this._isSubscribed = true;
  }

  private readonly _handleMouseStart = (e: MouseEvent) => {
    this._status = MouseSourceStatus.start;
    this._event = e;
    this.emit('input', this);
  };

  private readonly _handleMouseMove = (e: MouseEvent) => {
    this._status = MouseSourceStatus.move;
    this._event = e;
    this.emit('input', this);
  };

  private readonly _handleMouseEnd = (e: MouseEvent) => {
    this._status = MouseSourceStatus.end;
    this._event = e;
    this.emit('input', this);
    this._clear();
  };
}
