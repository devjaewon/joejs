import { HashRouterError } from "./HashRouterError";

export class InvalidArgumentError extends HashRouterError {
  constructor() {
    super('invalid arguments');
  }
}
