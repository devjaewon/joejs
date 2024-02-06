export interface SliderAnimationOption {
  duration?: number;
  timingFunction?: string;
}

export interface SliderAnimation {
  duration: number;
  timingFunction: string;
}

export const getSliderAnimation = (option?: SliderAnimationOption): SliderAnimation => {
  return {
    duration: option?.duration ?? 300,
    timingFunction: option?.timingFunction ?? 'ease',
  };
};

export const mergeSliderAnimation = (animation: SliderAnimation, option?: SliderAnimationOption): SliderAnimation => {
  return {
    duration: option?.duration ?? animation.duration,
    timingFunction: option?.timingFunction ?? animation.timingFunction,
  };
};
