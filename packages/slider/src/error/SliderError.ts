export class SliderBindRequiredError extends Error {
  constructor() {
    super('[@kjojs/slider] element binding required!');
  }
}

export class SliderInvalidArgumentsError extends Error {
  constructor() {
    super('[@kjojs/slider] invalid arguments!');
  }
}

export const sliderBindRequiredError = new SliderBindRequiredError();
