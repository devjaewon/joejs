import { EventBus } from '@philip21/eventbus';
import idom, { type IDom } from '@philip21/idom';
import { HandsSourceOption } from './HandsSourceOption';

export abstract class HandsSource extends EventBus<{ input: HandsSource }> {
  private _dom: IDom;
  protected _isSubscribed = false;

  constructor(
    private _id: string,
    element: HTMLElement,
    protected opt?: HandsSourceOption
  ) {
    super();
    this._dom = idom(element);
  }

  get id(): string {
    return this._id;
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
