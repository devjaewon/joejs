import { MouseSource, MouseSourceStatus } from '~/sources/mouse/MouseSource';
import { PanEventManager } from './PanEventManager';
import { PanEvent, PanEventType } from './PanEvent';
import { handsUnknownError } from '~/errors';

export class PanEventManagerByMouse implements PanEventManager {
  private _current: PanEvent | null = null;
  private _prev: PanEvent | null = null;
  private _start: PanEvent | null = null;

  get current(): PanEvent | null {
    return this._current;
  }

  process(mouseSource: MouseSource): void {
    const mouseEvent = mouseSource.event;
    if (!mouseEvent) {
      return;
    }

    const start = this._start;
    const prev = this._current;
    const panEvent: PanEvent = {
      type: this._getEventTypeByMouseSource(mouseSource),
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
      time: mouseSource.event.timeStamp,
    };

    if (!start && panEvent.type !== PanEventType.start) {
      this.clear();
      return;
    }

    // target touch no exist on end event
    if (panEvent.type === PanEventType.end && prev) {
      panEvent.clientX = prev.clientX;
      panEvent.clientY = prev.clientY;
      panEvent.pageX = prev.pageX;
      panEvent.pageY = prev.pageY;
      panEvent.screenX = prev.screenX;
      panEvent.screenY = prev.screenY;
      panEvent.deltaX = 0;
      panEvent.deltaY = 0;
      panEvent.tdeltaX = prev.tdeltaX;
      panEvent.tdeltaY = prev.tdeltaY;
      panEvent.velocityX = 0;
      panEvent.velocityY = 0;
    } else {
      panEvent.clientX = mouseEvent.clientX;
      panEvent.clientY = mouseEvent.clientY;
      panEvent.pageX = mouseEvent.pageX;
      panEvent.pageY = mouseEvent.pageY;
      panEvent.screenX = mouseEvent.screenX;
      panEvent.screenY = mouseEvent.screenY;
      if (prev) {
        panEvent.deltaX = panEvent.clientX - prev.clientX;
        panEvent.deltaY = panEvent.clientY - prev.clientY;

        const timeDiff = panEvent.time - prev.time;
        panEvent.velocityX = panEvent.deltaX / timeDiff;
        panEvent.velocityY = panEvent.deltaY / timeDiff;
      }
      if (start) {
        panEvent.tdeltaX = panEvent.clientX - start.clientX;
        panEvent.tdeltaY = panEvent.clientY - start.clientY;
      }
    }

    this._current = panEvent;
    this._prev = prev;
    if (panEvent.type === PanEventType.start) {
      this._start = this._current;
    }
  }

  clear(): void {
    this._current = null;
    this._prev = null;
    this._start = null;
  }

  private _getEventTypeByMouseSource(source: MouseSource): PanEventType {
    let eventType: PanEventType;

    switch (source.status) {
      case MouseSourceStatus.ready:
        throw handsUnknownError;
      case MouseSourceStatus.start:
        eventType = PanEventType.start;
        break;
      case MouseSourceStatus.move:
        eventType = PanEventType.move;
        break;
      case MouseSourceStatus.end:
        eventType = PanEventType.end;
        break;
    }

    return eventType;
  }
}
