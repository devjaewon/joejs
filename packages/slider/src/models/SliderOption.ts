import { SliderAfterMoveEnd } from './SliderAfterMoveEnd';
import { SliderAnimation, getSliderAnimation } from './SliderAnimation';

export interface SliderOption {
  afterMoveEndAnimation?: SliderAnimation;
  afterMoveEndStrategy?: SliderAfterMoveEnd;
  slideNextCriticalPoint?: number;
}

export interface SliderContext {
  config: {
    afterMoveEndAnimation: SliderAnimation;
    afterMoveEndStrategy: SliderAfterMoveEnd;
    slideNextCriticalPoint: number;
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
    },
    x: 0,
    index: 0,
  };
};
