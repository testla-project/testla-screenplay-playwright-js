[Back to overview]()

# Head

The `Head` class provides a convenient way to perform HTTP HEAD requests. It allows customization of headers, offering flexibility in testing scenarios where only the headers and not the response body are of interest. This class extends the abstract [ARequest](a_request.md) class.

## Table of Contents

- [Head](#head)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
  - [Methods](#methods)
    - [performAs](#performas)
    - [from](#from)
    - [withHeaders](#withheaders)

## Class Overview

### Extends

This class extends the [ARequest](a_request.md) abstract class, providing a specific implementation for sending HTTP HEAD requests.

## Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<Response>;
```

- **Description:** Send an HTTP HEAD request to the specified URL.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<Response>` - The response object.

### from

```typescript
public static from(url: string): Head;
```

- **Description:** Create a new instance of the `Head` class with the specified URL.
- **Parameters:**
  - `url` - The URL of the target.
- **Returns:** `Head` - A new instance of the `Head` class.

### withHeaders

```typescript
public withHeaders(headers: Headers): Head;
```

- **Description:** Add headers to the HTTP HEAD request.
- **Parameters:**
  - `headers` - The headers to be added.
- **Returns:** `Head` - The existing instance of the `Head` class.

[Back to overview]()