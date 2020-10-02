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

