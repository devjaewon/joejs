import EventBus from '@kjojs/eventbus';
import { TouchSource } from '~/sources/touch/TouchSource';
import { HandsProxy } from '~/proxies/common/HandsProxy';
import { HandsSourceToBind } from '~/proxies/common/HandsSourceToBind';
import { PanEventManagerByTouch } from './PanEventManagerByTouch';
import { PanEvent, PanEventType } from './PanEvent';
import { PanEventManager } from './PanEventManager';

export interface PanEventSpecification {
  input: PanEvent;
}

export class Pan extends EventBus<PanEventSpecification> implements HandsProxy {
  private _source: HandsSourceToBind | null = null;
  private _eventManager: PanEventManager<HandsSourceToBind> | null = null;
  private _disabled = false;

  destroy(): void {
    this._disabled = false;
    this._source?.destroy();
    this._source = null;
  }

  enable(): this {
    this._disabled = false;

    return this;
  }

  disable(): this {
    this._disabled = true;

    return this;
  }

  bind(source: HandsSourceToBind): this {
    this._source = source;
    this._source.init();
    this._source.on('input', this._handleInput);
    if (source instanceof TouchSource) {
      this._eventManager = new PanEventManagerByTouch();
    }

    return this;
  }

  private readonly _handleInput = (source: HandsSourceToBind) => {
    if (!this._eventManager) {
      return;
    }

    this._eventManager.process(source);

    const event = this._eventManager.current;
    if (event) {
      this.emit('input', event);
      if (event.type === PanEventType.end) {
        this._eventManager.clear();
      }
    }
  };
}
