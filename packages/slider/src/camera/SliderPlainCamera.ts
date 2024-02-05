import { Pan, PanEvent, PanEventType, TouchSource } from '@kjojs/input';
import { SliderCamera } from '~/camera';
import { SliderInvalidArgumentsError } from '~/error';
import { SliderDirection, type SliderAnimation, type SliderContext } from '~/models';
import { SliderAfterMoveEnd } from '~/models/SliderAfterMoveEnd';
import type { SliderPanel } from '~/panel';

export class SliderPlainCamera extends SliderCamera {
  private _pan: Pan;

  constructor(element: HTMLElement, context: SliderContext, panels: Array<SliderPanel>) {
    super(element, context, panels);

    this._pan = new Pan().bind(new TouchSource(element)).on('input', this._handleInput);
  }

  async moveTo(index: number, animation?: SliderAnimation): Promise<void> {
    if (index < 0 || index >= this._panels.length) {
      throw SliderInvalidArgumentsError;
    }

    this._context.index = index;

    return this._syncWithIndex(animation);
  }

  private _getNextPanelByX(): SliderPanel | null {
    const prevIndex = this._context.index;
    const candidatePanels = this._panels.filter(panel =>
      this._direction === SliderDirection.LEFT ? panel.index > prevIndex : panel.index < prevIndex
    );

    if (candidatePanels.length === 0) {
      return this._panels[prevIndex] || null;
    }

    let targetI = -1;
    let distance = Infinity;
    for (let i = 0; i < candidatePanels.length; i++) {
      const candidateDistance = Math.abs(candidatePanels[i].start - this._context.x);
      if (candidateDistance < distance) {
        targetI = i;
        distance = candidateDistance;
      }
    }

    if (targetI < 0) {
      return this._panels[prevIndex] || null;
    }

    return candidatePanels[targetI] || null;
  }

  private async _syncWithIndex(animation?: SliderAnimation): Promise<void> {
    const x = this._panels[this._context.index].start;
    if (animation) {
      // TODO:
    } else {
      this._context.x = x;
      this._render();
    }
  }

  private _move(deltaX: number) {
    this._context.x += deltaX;
    this._render();
  }

  private async _afterMoveEnd(e: PanEvent): Promise<void> {
    switch (this._context.afterMoveEnd) {
      case SliderAfterMoveEnd.CRITICAL_POINT:
        if (Math.abs(e.tdeltaX) > this._context.criticalPoint) {
          const targetPanel = this._getNextPanelByX();

          if (targetPanel) {
            this._context.index = targetPanel.index;
            this._syncWithIndex();
          }
        }
        break;
      case SliderAfterMoveEnd.RESTORE:
        break;
    }
    this._direction = SliderDirection.STOP;
  }

  private _render() {
    this._dom.css('transform', `translate3d(${this._context.x}px, 0, 0)`);
  }

  private readonly _handleInput = (e: PanEvent) => {
    switch (e.type) {
      case PanEventType.start:
      case PanEventType.move:
        this._direction = e.tdeltaX > 0 ? SliderDirection.RIGHT : SliderDirection.LEFT;
        this._move(e.deltaX);
        break;
      case PanEventType.end:
        this._move(e.deltaX);
        this._afterMoveEnd(e);
        break;
    }
  };
}
