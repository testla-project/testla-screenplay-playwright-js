[Back to overview]()

# Get

The `Get` class provides a convenient way to perform HTTP GET requests. It allows customization of headers and the format of the response body, offering flexibility in testing scenarios. This class extends the abstract [ARequest](a_request.md) class. 

## Table of Contents

- [Get](#get)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
  - [Properties](#properties)
    - [responseBodyFormat](#responsebodyformat)
  - [Methods](#methods)
    - [performAs](#performas)
    - [from](#from)
    - [withHeaders](#withheaders)
    - [withResponseBodyFormat](#withresponsebodyformat)

## Class Overview

### Extends

This class extends the [ARequest](a_request.md) abstract class, providing a specific implementation for sending HTTP GET requests.

## Properties

### responseBodyFormat

```typescript
private responseBodyFormat: ResponseBodyFormat = 'json';
```

- **Description:** The format in which the response body should be returned.
- **Type:** `ResponseBodyFormat` - A string representing the desired format.

## Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<Response>;
```

- **Description:** Send an HTTP GET request to the specified URL.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<Response>` - The response object.

### from

```typescript
public static from(url: string): Get;
```

- **Description:** Create a new instance of the `Get` class with the specified URL.
- **Parameters:**
  - `url` - The URL of the target.
- **Returns:** `Get` - A new instance of the `Get` class.

### withHeaders

```typescript
public withHeaders(headers: Headers): Get;
```

- **Description:** Add headers to the HTTP GET request.
- **Parameters:**
  - `headers` - The headers to be added.
- **Returns:** `Get` - The existing instance of the `Get` class.

### withResponseBodyFormat

```typescript
public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Get;
```

- **Description:** Set the format in which the response body should be returned.
- **Parameters:**
  - `responseBodyFormat` - The desired format of the response body.
- **Returns:** `Get` - The existing instance of the `Get` class.

[Back to overview]()