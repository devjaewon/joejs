import { EventBus } from '@kjojs/eventbus';
import idom, { type IDom } from '@kjojs/idom';
import { HandsSourceOption } from './HandsSourceOption';

export abstract class HandsSource<Input> extends EventBus<{ input: Input }> {
  private _dom: IDom;
  protected _isSubscribed = false;

  constructor(
    element: HTMLElement,
    protected opt?: HandsSourceOption
  ) {
    super();
    this._dom = idom(element);
  }

  get dom(): IDom {
    return this._dom;
  }

  destroy() {
    this._dom.off();
    this.off();
  }

  abstract init(): void;
}
