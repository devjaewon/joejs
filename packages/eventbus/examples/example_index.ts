import { EventBus } from '../src';

interface EventDefinition {
  a: 1 | 2 | 3;
  b: 'p';
}

/**
 * or
 *
 * type EventDefinition = {
 *   a: 1 | 2 | 3;
 *   b: 'p';
 * };
 */

async function main() {
  const eventBus = new EventBus<EventDefinition>().on({
    a: console.log,
    b: console.log,
  });

  eventBus.emit('a', 2);
  eventBus.emit('b', 'p');
}

main();
