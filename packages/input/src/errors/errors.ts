export class HandsBindRequiredError extends Error {
  constructor() {
    super('[Hands.js] element binding required!');
  }
}

export const handsBindRequiredError = new HandsBindRequiredError();

export class HandsUnknownError extends Error {
  constructor() {
    super('[Hands.js] unknown error!');
  }
}

export const handsUnknownError = new HandsUnknownError();
