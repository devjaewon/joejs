import { EventBus } from '@kjojs/eventbus';
import { HandsDomHandler } from '~/utils/HandsDomHandler';
import { HandsSourceOption } from './HandsSourceOption';

export abstract class HandsSource<Input> extends EventBus<{ input: Input }> {
  private _dom: HandsDomHandler;
  protected _isSubscribed = false;

  constructor(
    element: HTMLElement,
    protected opt?: HandsSourceOption
  ) {
    super();
    this._dom = new HandsDomHandler(element);
  }

  get dom(): HandsDomHandler {
    return this._dom;
  }

  destroy() {
    this._dom.destroy();
    this.off();
  }

  abstract init(): void;
}
