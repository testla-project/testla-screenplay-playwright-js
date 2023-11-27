# Questions and expectations
Testla helps you model your test scenarios from the perspective of actors performing tasks to accomplish their goals. Assertions follow this same consistent approach, with any assertions expressed using the interaction to **ask**.

The interaction to **ask** has four flavours:
- 

## Available Web Questions

#### Element.toBe

Checks if a condition is true.

#### Element.notToBe

Checks if a condition is false.

#### Element.*.visible(selector: Selector, options?: SelectorOptions)

Validates wether an element is visible. A mode operator must be prepended.

```js
// simple call with just selector
Element.toBe.visible('mySelector');
// or with options
Element.notToBe.visible('mySelector', {
    hasText: 'myText',
    subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
});
```

#### Element.*.enabled(selector: Selector, options?: SelectorOptions)

Validates wether an element is enabled. A mode operator must be prepended.

```js
// simple call with just selector
Element.toBe.enabled('mySelector');
// or with options
Element.notToBe.enabled('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

### Available Api Questions

#### Response.has

Checks if a condition is true.

#### Response.hasNot

Checks if a condition is false.

#### Response.*.statusCode(response: Response, code: number)

Checks if the response has a given status code. A mode operator must be prepended.

```js
Response.has.statusCode(response, 200);
Response.hasNot.statusCode(response, 200);
```

#### Response.*.body(response: Response, body: ResponseBodyType)

Checks if the response body equals a given body. A mode operator must be prepended.

```js
// json format
Response.has.body(response, { key: value });
// text format
Response.hasNot.body(response, 'text' );
// buffer format
Response.has.body(response, Buffer.from('abc') );
```

#### Response.*.headers(response: Response, headers: Headers)

Checks if the response has the given headers either by key (value to be set to undefined) or key/value lookup. A mode operator must be prepended.

```js
// only check for header presence by passing undefined as the value
Response.has.headers(response, { 'content-type': undefined });
// lookup for key/value combination to be present
Response.hasNot.headers(response, { 'content-type': 'application/json' });
```

#### Response.*.beenReceivedWithin(response: Response, duration: number)

Checks if the reponse (including receiving body) was received within a given duration. A mode operator must be prepended.

```js
// check if response was received within 2s
Response.has.beenReceivedWithin(response, 2000);
// check if response was not received within 2s
Response.hasNot.beenReceivedWithin(response, 2000);
```