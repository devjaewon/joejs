import { Pan, PanEvent, PanEventType, MouseSource, TouchSource } from '@kjojs/input';
import { SliderCamera } from '~/camera';
import { SliderInvalidArgumentsError } from '~/error';
import { SliderDirection, type SliderAnimation, type SliderContext } from '~/models';
import { SliderAfterMoveEnd } from '~/models/SliderAfterMoveEnd';
import type { SliderPanel } from '~/panel';
import { checkTouchSupport } from '~/utils';

export class SliderPlainCamera extends SliderCamera {
  private _pan: Pan;
  private _isAnimated = false;
  private _width = 0;
  private _start = 0;

  constructor(element: HTMLElement, context: SliderContext, panels: Array<SliderPanel>) {
    super(element, context, panels);

    const cameraRect = this._dom.rect();
    const source = checkTouchSupport() ? new TouchSource(element) : new MouseSource(element);

    this._start = cameraRect.left;
    this._width = cameraRect.width;
    this._pan = new Pan().bind(source).on('input', this._handleInput);
  }

  async moveTo(index: number, animation?: SliderAnimation): Promise<boolean> {
    if (this._isBlocked) {
      return true;
    }
    if (index < 0 || index >= this._panels.length) {
      throw SliderInvalidArgumentsError;
    }

    this._context.index = index;

    await this._syncWithIndex(animation);

    return false;
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

  private _getLastTreshold(): [number, number] {
    const treshold: [number, number] = [0, 0];

    if (this._panels.length === 0) {
      return treshold;
    }

    const startTreshold =
      typeof this._context.config.lastTreshold === 'number'
        ? this._context.config.lastTreshold
        : this._context.config.lastTreshold[0];
    treshold[0] = this._panels[0].start + startTreshold;

    const endTreshold =
      typeof this._context.config.lastTreshold === 'number'
        ? this._context.config.lastTreshold
        : this._context.config.lastTreshold[1];
    treshold[1] = this._panels[this._panels.length - 1].start - endTreshold;

    return treshold;
  }

  private _calculateStartX(panel: SliderPanel): number {
    const cameraWidth = this._width;
    const panelWidth = panel.width;

    const alignCorrection = (cameraWidth - panelWidth) / 2;

    return panel.start + this._start + alignCorrection;
  }

  private async _syncWithIndex(animation?: SliderAnimation): Promise<void> {
    const x = this._calculateStartX(this._panels[this._context.index]);

    if (animation) {
      this._renderWithAnimation(x, animation);
    } else {
      this._render(x);
    }
  }

  private _move(deltaX: number) {
    this._render(this._context.x + deltaX);
  }

  private async _afterMoveEnd(e: PanEvent): Promise<void> {
    switch (this._context.config.afterMoveEndStrategy) {
      case SliderAfterMoveEnd.CRITICAL_POINT:
        if (Math.abs(e.tdeltaX) > this._context.config.slideNextCriticalPoint) {
          const targetPanel = this._getNextPanelByX();

          if (targetPanel) {
            this._context.index = targetPanel.index;
          }
        }
        this._syncWithIndex(this._context.config.afterMoveEndAnimation);
        break;
      case SliderAfterMoveEnd.RESTORE:
        break;
    }
    this._direction = SliderDirection.STOP;
  }

  private _render(x: number) {
    const [startTreshold, endTreshold] = this._getLastTreshold();

    if (x <= startTreshold && x >= endTreshold) {
      this._context.x = x;
      this._dom.css('transform', `translate3d(${this._context.x}px, 0, 0)`);
    }
  }

  private async _renderWithAnimation(x: number, animation: SliderAnimation): Promise<void> {
    if (this._context.x === x) {
      return;
    }

    this._isAnimated = true;
    this._isBlocked = true;
    this._context.x = x;

    return this._dom
      .transition('transform', `translate3d(${x}px, 0, 0)`, {
        duration: animation.duration,
        timingFunction: animation.timingFunction,
      })
      .then(() => {
        this._isAnimated = false;
        this._isBlocked = false;
      });
  }

  private readonly _handleInput = (e: PanEvent) => {
    switch (e.type) {
      case PanEventType.start:
      case PanEventType.move:
        if (!this._isBlocked) {
          this._direction = e.tdeltaX > 0 ? SliderDirection.RIGHT : SliderDirection.LEFT;
          this._move(e.deltaX);
        }
        break;
      case PanEventType.end:
        if (!this._isBlocked) {
          this._move(e.deltaX);
          this._afterMoveEnd(e);
        } else if (!this._isAnimated) {
          this._isBlocked = false;
        }
        break;
    }
  };
}
