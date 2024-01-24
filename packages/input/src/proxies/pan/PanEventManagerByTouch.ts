import { TouchSource, TouchSourceStatus } from '~/sources';
import { handsUnknownError } from '~/errors/errors';
import { PanEventManager } from './PanEventManager';
import { PanEvent, PanEventType } from './PanEvent';

export class PanEventManagerByTouch implements PanEventManager<TouchSource> {
  private _current: PanEvent | null = null;
  private _prev: PanEvent | null = null;
  private _start: PanEvent | null = null;

  get current(): PanEvent | null {
    return this._current;
  }

  process(touchSource: TouchSource): void {
    const touchEvent = touchSource.event;
    if (!touchEvent) {
      return;
    }

    const touch = _getFirstTouch(touchEvent);
    const panEvent: PanEvent = {
      type: this._getEventTypeByTouchSource(touchSource),
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      screenX: 0,
      screenY: 0,
      deltaX: 0,
      deltaY: 0,
      tdeltaX: 0,
      tdeltaY: 0,
      velocityX: 0,
      velocityY: 0,
      time: touchEvent.timeStamp,
    };

    if (touch) {
      panEvent.clientX = touch.clientX;
      panEvent.clientY = touch.clientY;
      panEvent.pageX = touch.pageX;
      panEvent.pageY = touch.pageY;
      panEvent.screenX = touch.screenX;
      panEvent.screenY = touch.screenY;
      if (this._prev) {
        panEvent.deltaX = touch.screenX - this._prev.screenX;
        panEvent.deltaY = touch.screenY - this._prev.screenY;

        const timeDiff = panEvent.time - this._prev.time;
        panEvent.velocityX = panEvent.deltaX / timeDiff;
        panEvent.velocityY = panEvent.deltaY / timeDiff;
      }
      if (this._start) {
        panEvent.tdeltaX = touch.screenX - this._start.screenX;
        panEvent.tdeltaY = touch.screenY - this._start.screenY;
      }
    }

    this._prev = this._current;
    this._current = panEvent;
    if (panEvent.type === PanEventType.start) {
      this._start = this._current;
    }
  }

  clear(): void {
    this._current = null;
    this._prev = null;
    this._start = null;
  }

  private _getEventTypeByTouchSource(source: TouchSource): PanEventType {
    let eventType: PanEventType;

    switch (source.status) {
      case TouchSourceStatus.ready:
        throw handsUnknownError;
      case TouchSourceStatus.start:
        eventType = PanEventType.start;
        break;
      case TouchSourceStatus.move:
        eventType = PanEventType.move;
        break;
      case TouchSourceStatus.end:
        eventType = PanEventType.end;
        break;
    }

    return eventType;
  }
}

function _getFirstTouch(e: TouchEvent | null): Touch | null {
  const isTouch = (e?.targetTouches.length ?? 0) > 0;
  if (isTouch) {
    return e!.targetTouches[0];
  }

  return null;
}
