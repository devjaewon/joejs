import { SliderAfterMoveEnd } from './SliderAfterMoveEnd';
import { SliderAnimation, getSliderAnimation } from './SliderAnimation';

export interface SliderOption {
  animation?: SliderAnimation;
  afterMoveEnd?: SliderAfterMoveEnd;
  criticalPoint?: number;
}

export interface SliderContext {
  animation: SliderAnimation;
  afterMoveEnd: SliderAfterMoveEnd;
  criticalPoint: number;
  x: number;
  index: number;
}

export const getSliderContext = (option?: SliderOption): SliderContext => {
  return {
    animation: getSliderAnimation(option?.animation),
    afterMoveEnd: option?.afterMoveEnd ?? SliderAfterMoveEnd.CRITICAL_POINT,
    criticalPoint: option?.criticalPoint ?? 60,
    x: 0,
    index: 0,
  };
};
