# Isomorphic utilities

A lightweight zero-dependency library that provides utilities that work on both browser and Node contexts.

## Installation

The installation is pretty straightforward. Just run:

```shell
npm install isoutils --save
```

and you're ready to go!

## Examples

Delete undefined properties from an object:

```javascript
import isoutils from 'isoutils';

let objWithUndefineds = {
    optionalProp: undefined,
    requiredProp: "It works!"
};

isoutils.removeUndefined(objWithUndefineds);
```

Make a type `Partial` recursively

```typescript
import type { DeepPartial } from 'isoutils';

function defineConfig(config?: DeepPartial<MyConfig>): MyConfig {
}
```

Make a type `Required` recursively

```typescript
import type { DeepRequired } from 'isoutils';

function defineConfig(config?: DeepRequired<MyConfig>): MyConfig {
}
```
