import { HandsDomHandler } from '~/utils/HandsDomHandler';
import { Hands } from '~/types/Hands';
import { PanHandsOption } from './PanHandsOption';
import { PanHandsContext } from './PanHandsContext';

export class PanHands implements Hands {
  private dom = new HandsDomHandler();
  private context = new PanHandsContext();

  constructor(private opt: PanHandsOption) {}

  enable(): void {
    this.context.disabled = false;
  }

  disable(): void {
    this.context.disabled = true;
  }

  bind(element: HTMLElement): void {
    this.context.el = element;
    this.dom.bind(element);
    this.dom.initStyles({
      'touch-action': 'pan-x pan-y',
      ...(this.opt.cssStyles || {}),
    });
  }
}
