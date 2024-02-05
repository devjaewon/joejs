export interface SliderAnimationOption {
  duration?: number;
  timingFunction?: string;
}

export interface SliderAnimation {
  duration: number;
  timingFunction: string;
}

export const getSliderAnimation = (animation?: SliderAnimationOption): SliderAnimation => {
  return {
    duration: animation?.duration ?? 300,
    timingFunction: animation?.timingFunction ?? 'ease',
  };
};
