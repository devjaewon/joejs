export class SliderBindRequiredError extends Error {
  constructor() {
    super('[@kjojs/slider] element binding required!');
  }
}

export const sliderBindRequiredError = new SliderBindRequiredError();

export class SliderInvalidArgumentsError extends Error {
  constructor() {
    super('[@kjojs/slider] invalid arguments!');
  }
}

export const sliderInvalidArgumentsError = new SliderInvalidArgumentsError();
