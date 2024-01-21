import { EventBus } from './EventBus';

type EventName = 'n' | 'greet';
type EventPayload = number | string;

let eventBus: EventBus<{ n: number; greet: string }>;

beforeEach(() => {
  eventBus = new EventBus();
});

describe('EventBus @UnitTest', () => {
  it('[ .on() ] .on() listener is called every time it is emitted.', () => {
    const willEmit = [1, 3, 5, 7, 9];
    const expected = 25;

    let sum = 0;
    eventBus.on('n', n => {
      sum += n;
    });
    willEmit.forEach(n => eventBus.emit('n', n));

    expect(sum).toBe(expected);
  });

  it('[ .on() ] .on() can register multiple events at once as an object.', () => {
    const willEmitNames: Array<EventName> = ['n', 'greet', 'n', 'greet'];
    const willEmitPayloads: Array<EventPayload> = [10, 'daddy', 5, 'mom'];
    const expected = [10, 'daddy', 5, 'mom'];
    const emitted: Array<EventPayload> = [];

    eventBus.on({
      n: p => emitted.push(p),
      greet: p => emitted.push(p),
    });
    willEmitNames.forEach((eventName, i) => eventBus.emit(eventName, willEmitPayloads[i]));

    expect(emitted).toEqual(expected);
  });

  it('[ .once() ] .once() listener is called only once when it is emitted.', () => {
    const willEmit = [1, 3, 5, 7, 9];
    const expected = 1;

    let sum = 0;
    eventBus.once('n', n => {
      sum += n;
    });
    willEmit.forEach(n => eventBus.emit('n', n));

    expect(sum).toBe(expected);
  });

  it('[ .off() ] .off() can release one registered listener.', () => {
    const willEmit = [1, 3, 5, 7];
    const expected = [1, 1, 3, 3, 5, 7];
    const emiited: Array<number> = [];

    const nListenerA = (n: number) => emiited.push(n);
    const nListenerB = (n: number) => emiited.push(n);

    eventBus.on('n', nListenerA);
    eventBus.on('n', nListenerB);
    willEmit.forEach((n, i) => {
      eventBus.emit('n', n);
      if (i === 1) {
        eventBus.off('n', nListenerB);
      }
    });

    expect(emiited).toEqual(expected);
  });

  it('[ .off() ] .off() can release all registered listeners of one event.', () => {
    const willEmitNames: Array<EventName> = ['n', 'greet', 'n', 'greet'];
    const willEmitPayloads: Array<EventPayload> = [10, 'daddy', 5, 'mom'];
    const expected = [10, 10, 'daddy', 'mom'];
    const emiited: Array<EventPayload> = [];

    const greetListener = (p: string) => emiited.push(p);
    const nListenerA = (n: number) => emiited.push(n);
    const nListenerB = (n: number) => emiited.push(n);

    eventBus.on('greet', greetListener);
    eventBus.on('n', nListenerA);
    eventBus.on('n', nListenerB);

    willEmitNames.forEach((eventName, i) => {
      eventBus.emit(eventName, willEmitPayloads[i]);
      if (i === 1) {
        eventBus.off('n');
      }
    });

    expect(emiited).toEqual(expected);
  });

  it('[ .off() ] .off() can release all registered listeners.', () => {
    const willEmitNames: Array<EventName> = ['n', 'greet', 'n', 'greet'];
    const willEmitPayloads: Array<EventPayload> = [10, 'daddy', 5, 'mom'];
    const expected = [10, 10, 'daddy'];
    const emiited: Array<EventPayload> = [];

    const greetListener = (p: string) => emiited.push(p);
    const nListenerA = (n: number) => emiited.push(n);
    const nListenerB = (n: number) => emiited.push(n);

    eventBus.on('greet', greetListener);
    eventBus.on('n', nListenerA);
    eventBus.on('n', nListenerB);

    willEmitNames.forEach((eventName, i) => {
      eventBus.emit(eventName, willEmitPayloads[i]);
      if (i === 1) {
        eventBus.off();
      }
    });

    expect(emiited).toEqual(expected);
  });
});
