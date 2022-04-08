# @iter-tools/dollar-async

When building libraries that work with iterators, one of the principal challenges of writing code that uses `async` and `await` is that if you are in the position of trying to provide tools that can work both synchronously or asynchronously you often end up having to write significant amounts of code twice. For example:

```js
export function* map(source, fn) {
  for (const value of source) {
    yield fn(value);
  }
}

export async function* asyncMap(source, fn) {
  for await (const value of source) {
    yield await fn(value);
  }
}
```

This duplication is generally not bad practice, but it can lead to errors when the sync and async code gets out of sync. `dollar-async` helps you avoid these errors by creating templates which use `$` to denote that something has a sync and an async variant. A macrome plugin is used to transform the template into the real code.

Here is an example of the code above written using a template:

```js
import {
  $async,
  $await,
} from '@iter-tools/dollar-async/macro';

$async;
export function* $map(source, fn) {
  $await;
  for (const value of source) {
    yield $await(fn(value));
  }
}
```

This template will be exploded into two files, one with async and one without.

## Template sytnax

For more information about what syntaxes are supported and how they are transformed, look [here](https://github.com/iter-tools/dollar-async/blob/trunk/lib/macro.js)
