[Back to overview](../../screenplay_elements.md)

# UseAPI

The `UseAPI` class is part of a testing library built on top of Playwright, implementing the Screenplay pattern. This class extends the `Ability` class from the '@testla/screenplay' library and provides methods to interact with an API for testing purposes.

## Table of Contents

- [UseAPI](#useapi)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
      - [getRequestContext](#getrequestcontext)
      - [using](#using)
      - [as](#as)
      - [sendRequest](#sendrequest)
      - [checkStatus](#checkstatus)
      - [checkBody](#checkbody)
      - [checkHeaders](#checkheaders)
      - [checkDuration](#checkduration)

## Class Overview

### Methods

#### getRequestContext

```typescript
public getRequestContext(): APIRequestContext
```

- **Description:** Get the API request context associated with this instance.
- **Returns:** `APIRequestContext` - The Playwright API request context.

#### using

```typescript
public static using(requestContext: APIRequestContext): UseAPI
```

- **Description:** Initialize the `UseAPI` ability by passing an already existing Playwright `APIRequestContext` object.
- **Parameters:**
  - `requestContext` - The Playwright API request context.
- **Returns:** `UseAPI` - The initialized `UseAPI` object.

#### as

```typescript
public static as(actor: Actor): UseAPI
```

- **Description:** Use this ability as an actor.
- **Parameters:**
  - `actor` - The actor object.
- **Returns:** `UseAPI` - The ability to use the API as the actor.

#### sendRequest

```typescript
public async sendRequest(
  method: RequestMethodType,
  url: string,
  headers?: any,
  responseFormat?: ResponseBodyFormat,
  data?: any
): Promise<Response>
```

- **Description:** Send an HTTP request (GET, POST, PATCH, PUT, HEAD, or DELETE) to the specified URL.
- **Parameters:**
  - `method` - The HTTP method (GET, POST, PATCH, PUT, HEAD, or DELETE).
  - `url` - The full URL to the target.
  - `headers` (optional) - The headers object.
  - `responseFormat` (optional) - Specify the desired format for the response body.
  - `data` (optional) - The data to be sent.
- **Returns:** `Promise<Response>` - A response object consisting of status, body, headers, and duration.

#### checkStatus

```typescript
public async checkStatus(response: Response, status: number, mode: 'equal' | 'unequal'): Promise<boolean>
```

- **Description:** Verify if the given status is equal or unequal to the given response's status.
- **Parameters:**
  - `response` - The response to check.
  - `status` - The status to check.
  - `mode` - The result to check for ('equal' or 'unequal').
- **Returns:** `Promise<boolean>` - True if the status is equal/unequal as expected.

#### checkBody

```typescript
public async checkBody(response: Response, body: ResponseBodyType, mode: 'equal' | 'unequal'): Promise<boolean>
```

- **Description:** Verify if the given body is equal or unequal to the given response's body.
- **Parameters:**
  - `response` - The response to check.
  - `body` - The body to check.
  - `mode` - The result to check for ('equal' or 'unequal').
- **Returns:** `Promise<boolean>` - True if the body is equal/unequal as expected.

#### checkHeaders

```typescript
public async checkHeaders(response: Response, headers: {[key: string]: string | undefined }, mode: 'included' | 'excluded'): Promise<boolean>
```

- **Description:** Verify if the given headers are included/excluded in the given response.
- **Parameters:**
  - `response` - The response to check.
  - `headers` - The headers to check.
  - `mode` - The result to check for ('included' or 'excluded').
- **Returns:** `Promise<boolean>` - True if the headers are included/excluded as expected.

#### checkDuration

```typescript
public checkDuration(response: Response, duration: number, mode: 'lessOrEqual' | 'greater'): Promise<boolean>
```

- **Description:** Verify if the response (including receiving body) was received within a given duration.
- **Parameters:**
  - `response` - The response to check.
  - `duration` - Expected duration (in milliseconds) not to be exceeded.
  - `mode` - The result to check for ('lessOrEqual' or 'greater').
- **Returns:** `Promise<boolean>` - True if the response was received within the given duration, false otherwise.

[Back to overview](../../screenplay_elements.md)