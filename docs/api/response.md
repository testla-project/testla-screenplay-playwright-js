[Back to overview]()

# Response

The `Response` class provides a flexible way to verify various aspects of an API response. It allows for positive and negative checks on status, body, headers, and duration, providing a comprehensive set of tools for API testing. This class extends the `Question<boolean>` class, providing functionality for checking the status, body, headers, and duration of an API response.

## Table of Contents

- [Response](#response)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
  - [Properties](#properties)
    - [response](#response-1)
    - [action](#action)
    - [checkMode](#checkmode)
  - [Methods](#methods)
    - [answeredBy](#answeredby)
    - [has](#has)
    - [hasNot](#hasnot)
    - [statusCode](#statuscode)
    - [body](#body)
    - [headers](#headers)
    - [beenReceivedWithin](#beenreceivedwithin)

## Class Overview

### Extends

This class extends the `Question<boolean>` class, providing specific functionality for verifying API response aspects.

## Properties

### response

```typescript
private response: ResponseType = {
    body: null,
    status: 0,
    headers: {},
    duration: 0,
};
```

- **Description:** The API response to be checked.
- **Type:** `ResponseType` - An object containing information about the response.

### action

```typescript
private action!: {
    mode: 'status' | 'body' | 'header' | 'duration';
    payload?: any;
};
```

- **Description:** The action to perform on the response (e.g., check status, body, headers, or duration).
- **Type:** `{ mode: 'status' | 'body' | 'header' | 'duration'; payload?: any }` - An object containing the action mode and payload.

### checkMode

```typescript
private checkMode: 'has' | 'hasNot';
```

- **Description:** The check mode, indicating whether to check for a positive (`has`) or negative (`hasNot`) result.
- **Type:** `'has' | 'hasNot'` - A string representing the check mode.

## Methods

### answeredBy

```typescript
public async answeredBy(actor: Actor): Promise<boolean>;
```

- **Description:** Perform the verification based on the specified action.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<boolean>` - The verification result (true or false).

### has

```typescript
static get has(): Response;
```

- **Description:** Create a new instance of the `Response` class for positive verification.
- **Returns:** `Response` - A new instance of the `Response` class.

### hasNot

```typescript
static get hasNot(): Response;
```

- **Description:** Create a new instance of the `Response` class for negative verification.
- **Returns:** `Response` - A new instance of the `Response` class.

### statusCode

```typescript
public statusCode(response: ResponseType, statusCode: number): Response;
```

- **Description:** Set up the verification for the response status code.
- **Parameters:**
  - `response` - The response to check.
  - `statusCode` - The expected status code.
- **Returns:** `Response` - The updated instance of the `Response` class.

### body

```typescript
public body(response: ResponseType, body: ResponseBodyType): Response;
```

- **Description:** Set up the verification for the response body.
- **Parameters:**
  - `response` - The response to check.
  - `body` - The expected body.
- **Returns:** `Response` - The updated instance of the `Response` class.

### headers

```typescript
public headers(response: ResponseType, headers: Headers): Response;
```

- **Description:** Set up the verification for the response headers.
- **Parameters:**
  - `response` - The response to check.
  - `headers` - The expected headers.
- **Returns:** `Response` - The updated instance of the `Response` class.

### beenReceivedWithin

```typescript
public beenReceivedWithin(response: ResponseType, duration: number): Response;
```

- **Description:** Set up the verification for the response duration.
- **Parameters:**
  - `response` - The response to check.
  - `duration` - The expected duration (in milliseconds).
- **Returns:** `Response` - The updated instance of the `Response` class.

[Back to overview]()