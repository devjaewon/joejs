import { HandsSource } from '../common/HandsSource';

export enum TouchSourceStatus {
  ready,
  start,
  move,
  end,
}

export class TouchSource extends HandsSource<TouchSource> {
  private _status = TouchSourceStatus.ready;
  private _event: TouchEvent | null = null;

  init(): void {
    this.dom.initStyles({
      'touch-action': 'pan-x pan-y',
      'user-drag': 'none',
      '-webkit-user-drag': 'none',
      '-moz-user-drag': 'none',
      ...(this.opt?.cssStyles || {}),
    });
    this._subscribeNativeEvents();
  }

  get status(): TouchSourceStatus {
    return this._status;
  }

  get event(): TouchEvent | null {
    return this._event;
  }

  private _subscribeNativeEvents() {
    if (this._isSubscribed) {
      return;
    }

    this.dom.on('touchstart', this._handleTouchStart);
    this.dom.on('touchmove', this._handleTouchMove);
    this.dom.on('touchend', this._handleTouchEnd);
    this.dom.on('touchcancel', this._handleTouchCancel);
    this._isSubscribed = true;
  }

  private _clear() {
    this._status = TouchSourceStatus.ready;
    this._event = null;
  }

  private readonly _handleTouchStart = (e: TouchEvent) => {
    this._status = TouchSourceStatus.start;
    this._event = e;
    this.emit('input', this);
  };

  private readonly _handleTouchMove = (e: TouchEvent) => {
    this._status = TouchSourceStatus.move;
    this._event = e;
    this.emit('input', this);
  };

  private readonly _handleTouchEnd = (e: TouchEvent) => {
    this._status = TouchSourceStatus.end;
    this._event = e;
    this.emit('input', this);
    this._clear();
  };

  private readonly _handleTouchCancel = (e: TouchEvent) => {
    this._status = TouchSourceStatus.end;
    this._event = e;
    this.emit('input', this);
    this._clear();
  };
}
