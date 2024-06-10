export class SliderBindRequiredError extends Error {
  constructor() {
    super('[@philip21/slider] element binding required!');
  }
}

export const sliderBindRequiredError = new SliderBindRequiredError();

export class SliderInvalidArgumentsError extends Error {
  constructor() {
    super('[@philip21/slider] invalid arguments!');
  }
}

export const sliderInvalidArgumentsError = new SliderInvalidArgumentsError();
