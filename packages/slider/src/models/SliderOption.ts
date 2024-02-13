import { SliderAfterMoveEnd } from './SliderAfterMoveEnd';
import { SliderAnimation, getSliderAnimation } from './SliderAnimation';

export interface SliderOption {
  afterMoveEndAnimation?: SliderAnimation;
  afterMoveEndStrategy?: SliderAfterMoveEnd;
  slideNextCriticalPoint?: number;
  lastTreshold?: [number, number] | number;
  notResize?: boolean;
}

export interface SliderContext {
  config: {
    afterMoveEndAnimation: SliderAnimation;
    afterMoveEndStrategy: SliderAfterMoveEnd;
    slideNextCriticalPoint: number;
    lastTreshold: [number, number] | number;
    notResize: boolean;
  };
  x: number;
  index: number;
}

export const getSliderContext = (option?: SliderOption): SliderContext => {
  return {
    config: {
      afterMoveEndAnimation: getSliderAnimation(option?.afterMoveEndAnimation),
      afterMoveEndStrategy: option?.afterMoveEndStrategy ?? SliderAfterMoveEnd.CRITICAL_POINT,
      slideNextCriticalPoint: option?.slideNextCriticalPoint ?? 80,
      lastTreshold: option?.lastTreshold ?? 999999,
      notResize: option?.notResize ?? false,
    },
    x: 0,
    index: 0,
  };
};
