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


[//]: # (::contents:start)

A TypeScript rewrite of
[openapi-js-sdk-builder](https://github.com/sencrop/openapi-js-sdk-builder).

It basically brings a minimal TypeScript SDK from an OpenAPI3 file with no OOP
inside. It works with any HTTP client.

# Usage

With a raw Node script:

```js
import { generateSDKFromOpenAPI } from 'openapi-ts-sdk-builder';
import { readFileSync, writeFileSync } from 'fs';

const openAPIContents = readFileSync('openapi.json', 'utf-8');
const sdkContents = generateSDKFromOpenAPI(
  openAPIContents,
  {
    sdkVersion: 'v1.1.1',
    ignoredParametersNames: ['cookie', 'X-API-Version', 'X-SDK-Version'],
    undocumentedParametersNames: ['X-Application-Version'],
  },
  {
    generateUnusedSchemas: true,
    brandedTypes: [
      'SensorUUID',
      'UUID',
      'Locale',
      'TimeZone',
      'ValueName',
      'SensorVariable',
    ],
    generateRealEnums: true,
    exportNamespaces: true,
  },
);

writeFileSync('src/sdk.ts', sdkContents, 'utf-8');
```

Sample usage with `axios`:

```ts
import BaseAPI, { APIStatuses } from './sdk.ts';
import axios from 'axios';
import querystring from 'querystring';
import type { RequestExecutor } from './sdk.ts';
import type { AxiosRequestConfig } from 'axios';

const executeRequest: RequestExecutor<AxiosRequestConfig> = async (
  httpRequest,
  operationId,
  options,
) => {
  const callOptions = {
    ...options,
    baseURL: 'http://localhost:3000',
    url: httpRequest.path,
    method: httpRequest.method,
    headers: {
      ...(options.headers || {}),
      ...(httpRequest.headers || {}),
    },
    params: httpRequest.params,
    data: httpRequest.body,
    paramsSerializer: querystring.stringify.bind(querystring),
    validateStatus: (status: number) =>
      APIStatuses[operationId].includes(status),
  };
  const response = await axios(callOptions);

  return {
    status: response.status,
    headers: response.headers,
    body: response.data,
  };
};

// Use the API
await BaseAPI.getPing(executeRequest);
await BaseAPI.getUser(executeRequest, { userId: '123' });

// Generate URIs only use the API then
await APIURIBuilders.buildGetPingURI({
  /*...*/
});

// To know which method is used by an endpoint
await APIMethods.getPing; // => get

// To know which status codes can be returned by an endpoint
await APIStatuses.getPing; // => ["default", 200]

// Generate a complete endpoint input
await APIInputBuilders.buildGetPingInput({
  /*...*/
});
```

You can also safely operate on the API by doing so:

```ts
import BaseAPI, { APIStatuses } from './sdk.ts';
import config from './config';
import YError from 'yerror';
import type { RequestExecutor, Components } from './sdk.ts';
import type { AxiosRequestConfig } from 'axios';

export { Enums };
export type { Components };

type AuthTokenInput = { token?: string };

const API = Object.keys(BaseAPI).reduce((FinalAPI, operationId) => {
  FinalAPI[operationId] = async (
    { token, ...input }: unknown & AuthTokenInput,
    options: AxiosRequestConfig = {},
  ) => {
    try {
      const response =  await BaseAPI[operationId](
        executeRequest,
        {
          ...input,
          xApplicationVersion: config.applicationVersion,
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
        },
      );
      return response;
    } catch (err) {
      console.error('Got an API error:', err.stack);
      throw new YError(
        err.response?.data?.error ? 'E_API_ERROR' : 'E_UNEXPECTED_ERROR',
        err.response?.data,
      );
    }
  };
  return FinalAPI;
}, {}) as {
  [P in keyof typeof BaseAPI]: (
    input: Parameters<typeof BaseAPI[P]>[1] & AuthTokenInput,
    config?: AxiosRequestConfig,
  ) => Promise<ReturnType<typeof BaseAPI[P]>>;
};

export default API;
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
<a name="generateSDKFromOpenAPI"></a>

## generateSDKFromOpenAPI(openAPIContent, options, [typeOptions]) ⇒ <code>Promise.&lt;string&gt;</code>
Build a JS SDK from an OpenAPI file

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - The SDK JS code  

| Param | Type | Description |
| --- | --- | --- |
| openAPIContent | <code>string</code> |  |
| options | <code>Object</code> |  |
| options.sdkVersion | <code>string</code> | The SDK version |
| [options.sdkName] | <code>string</code> | The SDK name (default to API) |
| [options.ignoredParametersNames] | <code>Array.&lt;string&gt;</code> | Provide a list of parameters to ignore |
| [options.undocumentedParametersNames] | <code>Array.&lt;string&gt;</code> | Provide a list of parameters to keep undocumented |
| [typeOptions] | <code>Object</code> | Options to be passed to the type generator |


# Authors
- [Nicolas Froidure](https://insertafter.com/en/index.html)

# License
[MIT](https://github.com/nfroidure/openapi-ts-sdk-builder/blob/master/LICENSE)
