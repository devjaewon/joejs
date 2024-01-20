# `@kjojs/eventbus`

universal event bus module

## Getting Started

- typescript type inference supports.
- simple and light implementation. [source](./src/EventBus.ts)

```ts
const eventBus = new EventBus().on({
  a: console.log,
  b: console.log,
});

eventBus.emit('a', 2);
eventBus.emit('b', 'p');
```

## Type Inference Support

```ts
interface EventDefinition {
  a: 1 | 2 | 3;
  b: 'p';
}

const eventBus = new EventBus<EventDefinition>().on({
  a: console.log,
  b: console.log,
});

/**
 * or
 *
 * new EventBus<{
 *   a: 1 | 2 | 3;
 *   b: 'p';
 * }>();
 */
```

<img src="./assets/readme_typeinference_1.png" width="600">

<img src="./assets/readme_typeinference_2.png" width="600">
