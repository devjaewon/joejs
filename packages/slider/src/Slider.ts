import idom from '@kjojs/idom';
import { SliderCamera, SliderPlainCamera } from '~/camera';
import { sliderBindRequiredError } from '~/error';
import { SliderPanel, SliderImmutablePanel } from '~/panel';
import { SliderAnimationOption, SliderContext, SliderOption, getSliderContext, mergeSliderAnimation } from '~/models';

export class Slider {
  private _camera: SliderCamera;
  private _panels: Array<SliderPanel>;
  private _context: SliderContext;

  constructor(element: HTMLElement, option?: SliderOption) {
    const cameraElement = element.firstElementChild as HTMLElement | null;
    if (!cameraElement) {
      throw sliderBindRequiredError;
    }
    const panelElements = Array.prototype.slice.call(cameraElement.children) as HTMLElement[];
    if (panelElements.length === 0) {
      throw sliderBindRequiredError;
    }

    idom(element).css({
      'touch-action': 'none',
      'user-drag': 'none',
      '-webkit-user-drag': 'none',
      '-moz-user-drag': 'none',
    });

    this._context = getSliderContext(option);
    this._panels = panelElements.map((panelElement, index) => this._createPanel(panelElement, index));
    this._camera = this._createCamera(cameraElement);
  }

  get camera(): SliderCamera {
    return this._camera;
  }

  get panels(): Array<SliderPanel> {
    return this._panels;
  }

  async moveTo(index: number, option?: SliderAnimationOption): Promise<boolean> {
    return this._camera.moveTo(index, mergeSliderAnimation(this._context.config.afterMoveEndAnimation, option));
  }

  private _createCamera(element: HTMLElement): SliderCamera {
    return new SliderPlainCamera(element, this._context, this._panels);
  }

  private _createPanel(element: HTMLElement, index: number): SliderPanel {
    return new SliderImmutablePanel(element, this._context, index);
  }
}
