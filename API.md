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

