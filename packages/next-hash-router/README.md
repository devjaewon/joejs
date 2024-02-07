# `@kjojs/next-hash-router`

Although next/router reduces the need for a hash router by isomorphically handling and optimizing csr and ssr, there are still cases where full csr and hash routing are needed.

- Hash routing based on `next/router`
- Nested routes
- You can just use `useRouter()` of next.js
- The version matches next.js


## Installation

```sh
npm install @kjojs/next-hash-router --save

# or (current support 14 only)
# npm install @kjojs/next-hash-router@14 --save
```

## Getting Started

- `#a1`: A1Component rendered only
- `#a1__b1`: A1Component, B1Component rendered
- `#b1`: No Rendered

```jsx
// page.jsx
import HashRouter from '@kjojs/next-hash-router';
import { A1Component, A2Component } from '~/components';

export default function PageComponent() {
  return (
    <HashRouter>
      <Route path="a1" render={() => <A1Component />} />
      <Route path="a2" render={() => <A2Component />}>
    </HashRouter>
  );
}
```

```jsx
// ~/components
import { B1Component } from '~/components/a1';

export function A1Component() {
  return (
    <div className="tab">
      <h2>A1</h2>
      <Route path="b1" render={() => <B1Component />} />
    </div>
  )
}
```

```jsx
// ~/components/a1
import { useRouter } from 'next/router';

export function B1Component() {
  const router = useRouter();

  // new member variables (hashPaths: string[])
  return <div>{router.hashPaths}</div>
}
```
