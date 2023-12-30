export class HandsBindRequiredError extends Error {
  constructor() {
    super('[Hands.js] element binding required');
  }
}

export const handsBindRequiredError = new HandsBindRequiredError();
