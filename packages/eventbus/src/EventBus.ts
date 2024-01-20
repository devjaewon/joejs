type EventHandler<P> = (p: P) => void;

type EventRegistry<D extends object> = { [k in keyof D]: Array<EventHandler<D[k]>> };

type EventSpecification<D extends object> = { [k in keyof D]: EventHandler<D[k]> };

export class EventBus<D extends object = object> {
  private _registry: EventRegistry<D> = {} as EventRegistry<D>;

  on<N extends keyof D>(eventName: N, eventHandler: EventHandler<D[N]>): this;
  on(eventSpecification: EventSpecification<D>): this;
  on(eventName: unknown, eventHandler?: unknown): this {
    switch (typeof eventName) {
      case 'string': {
        if (!eventHandler) {
          throw new Error('[@kjojs/hands] argument eventHandler required!');
        }

        const name = eventName as keyof D;

        this._registry[name] = this._registry[name] || [];
        this._registry[name].push(eventHandler as EventHandler<unknown>);
        break;
      }
      case 'object': {
        const spec = eventName as EventSpecification<D>;

        Object.entries(spec).forEach(entry => {
          const name = entry[0] as keyof D;
          const handler = entry[1] as EventHandler<unknown>;

          this.on(name, handler);
        });
        break;
      }
    }

    return this;
  }

  off<N extends keyof D>(eventName: N): this;
  off<N extends keyof D>(eventName: N, eventHandler: EventHandler<D[N]>): this;
  off(): this;
  off(eventName?: unknown, eventHandler?: unknown): this {
    if (!eventName) {
      this._registry = {} as EventRegistry<D>;
      return this;
    }

    switch (typeof eventName) {
      case 'string': {
        const name = eventName as keyof D;

        if (!eventHandler) {
          delete this._registry[name];
        } else if (this._registry[name]) {
          const i = (this._registry[name] || []).indexOf(eventHandler as EventHandler<unknown>);

          if (i >= 0) {
            if (this._registry[name].length === 1) {
              delete this._registry[name];
            } else {
              this._registry[name].splice(i, 1);
            }
          }
        }
        break;
      }
    }

    return this;
  }

  emit<N extends keyof D>(eventName: N, eventPayload?: D[N]): void {
    const handlers = this._registry[eventName] || [];

    handlers.forEach(handler => {
      handler(eventPayload!);
    });
  }
}
