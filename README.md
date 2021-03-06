[//]: # ( )
[//]: # (This file is automatically generated by a `metapak`)
[//]: # (module. Do not change it  except between the)
[//]: # (`content:start/end` flags, your changes would)
[//]: # (be overridden.)
[//]: # ( )
# openapi-ts-sdk-builder
> Create a TypeScript SDK from an OpenAPI 3 definition

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nfroidure/openapi-ts-sdk-builder/blob/master/LICENSE)
[![Build status](https://travis-ci.com/nfroidure/openapi-ts-sdk-builder.svg?branch=master)](https://travis-ci.com/github/nfroidure/openapi-ts-sdk-builder)
[![Coverage Status](https://coveralls.io/repos/github/nfroidure/openapi-ts-sdk-builder/badge.svg?branch=master)](https://coveralls.io/github/nfroidure/openapi-ts-sdk-builder?branch=master)
[![NPM version](https://badge.fury.io/js/openapi-ts-sdk-builder.svg)](https://npmjs.org/package/openapi-ts-sdk-builder)
[![Dependency Status](https://david-dm.org/nfroidure/openapi-ts-sdk-builder.svg)](https://david-dm.org/nfroidure/openapi-ts-sdk-builder)
[![devDependency Status](https://david-dm.org/nfroidure/openapi-ts-sdk-builder/dev-status.svg)](https://david-dm.org/nfroidure/openapi-ts-sdk-builder#info=devDependencies)
[![Package Quality](https://npm.packagequality.com/shield/openapi-ts-sdk-builder.svg)](https://packagequality.com/#?package=openapi-ts-sdk-builder)


[//]: # (::contents:start)

A TypeScript rewrite of
[openapi-js-sdk-builder](https://github.com/sencrop/openapi-js-sdk-builder).

It basically brings a minimal TypeScript SDK from an OpenAPI3 file with no OOP
inside. It is based on the `axios` module.

# Usage

With a raw Node script:

```js
import { generateSDKFromOpenAPI } from 'openapi-ts-sdk-builder';
import { readFileSync, writeFileSync } from 'fs';

const openAPIContents = readFileSync('openapi.json', 'utf-8');
const sdkContents = generateSDKFromOpenAPI(openAPIContents);

writeFileSync('sdk.ts', sdkContents, 'utf-8');
```

You can also use the built-in
[webpack loader](https://webpack.js.org/contribute/writing-a-loader/) in your
frontends builds:

In `webpack.config.js`:

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /(\.|^)openapi.json$/,
        loader: require.resolve('openapi-js-sdk-builder'),
        type: 'javascript/auto',
      },
    ],
  },
};
```

In your code:

```js
import API from './myapi.openapi.json';

// Just use the API then
await API.getPing();
```

You can also safely operate on the API by doing so:

```ts
import BaseAPI from './sdk';
import config from './config';
import type { AxiosRequestConfig } from 'axios';

type AuthTokenInput = { token?: string };

export default Object.keys(BaseAPI).reduce((FinalAPI, operationId) => {
  FinalAPI[operationId] = async (
    { token, ...input }: unknown & AuthTokenInput,
    options: AxiosRequestConfig = {},
  ) => {
    return BaseAPI[operationId](
      {
        ...input,
        xApplicationVersion: process.env.VERSION,
      },
      {
        ...options,
        baseURL: config.apiURL,
        headers: {
          ...options.headers,
          ...(token
            ? {
                authorization: `Bearer ${token}`,
              }
            : {}),
        },
        validateStatus: () => true,
      },
    );
  };
  return FinalAPI;
}, {}) as {
  [P in keyof typeof BaseAPI]: (
    input: Parameters<typeof BaseAPI[P]>[0] & AuthTokenInput,
    config?: AxiosRequestConfig,
  ) => Promise<ReturnType<typeof BaseAPI[P]>>;
};
```

Finally, you may appreciate using it with the
[`useSSR` React hook](https://github.com/vercel/swr) to benefit from your SDK
types:

```ts
import useSWR from 'swr';
import type { PromiseValue } from 'type-fest';
import API from './api';

type Handler<I, O> = (input: I) => Promise<O>;
type HandlerInput<T> = T extends Handler<infer I, unknown> ? I : never;
type HandlerOutput<T> = T extends Handler<unknown, infer I> ? I : never;

const API_KEYS: Record<any, string> = Object.keys(API).reduce((hash, key) => {
  hash[API[key]] = key;
  return hash;
}, {});

export default function useAPISWR<T extends Handler<any, any>>(
  swrCouple: [T, HandlerInput<T>],
  options?: Parameters<typeof useSWR>[2],
) {
  const uniqueKey = swrCouple
    ? Object.keys(swrCouple[1]).reduce(
        (finalKey, key) => finalKey + key + JSON.stringify(swrCouple[1][key]),
        // Sadly, here, we cannot rely on `swrCouple[0].name` to
        // build the unicity key since the build destroys it
        API_KEYS[swrCouple[0]] + '-',
      )
    : null;

  return useSWR<
    PromiseValue<HandlerOutput<T>> extends { body: infer D } ? D : never
  >(
    uniqueKey,
    async () => (await swrCouple[0](swrCouple[1])).body,
    options as any,
  );
}
```

[//]: # (::contents:end)

# API
<a name="module_openapi-ts-sdk-builder"></a>

## openapi-ts-sdk-builder
<a name="module_openapi-ts-sdk-builder..generateSDKFromOpenAPI"></a>

### openapi-ts-sdk-builder~generateSDKFromOpenAPI(openAPIContent, options) ⇒ <code>Promise.&lt;string&gt;</code>
Build a JS SDK from an OpenAPI file

**Kind**: inner method of [<code>openapi-ts-sdk-builder</code>](#module_openapi-ts-sdk-builder)  
**Returns**: <code>Promise.&lt;string&gt;</code> - The SDK JS code  

| Param | Type |
| --- | --- |
| openAPIContent | <code>string</code> | 
| options | <code>Object</code> | 
| options.sdkVersion | <code>string</code> | 
| [options.sdkName] | <code>string</code> | 
| [options.ignoredParametersNames] | <code>string</code> | 
| [options.undocumentedParametersNames] | <code>string</code> | 


# Authors
- [Nicolas Froidure](https://insertafter.com/en/index.html)

# License
[MIT](https://github.com/nfroidure/openapi-ts-sdk-builder/blob/master/LICENSE)
