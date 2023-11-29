export class HashRouterError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, HashRouterError.prototype);
  }

  toString() {
    return `[HASH_ROUTER_ERROR] ${this.message}`;
  }
}
