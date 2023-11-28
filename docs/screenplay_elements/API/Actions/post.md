[Back to overview](../../screenplay_elements.md)

# Post

The `Post` class provides a convenient way to perform HTTP POST requests. It allows customization of data, headers, and the format of the response body, offering flexibility in testing scenarios. This class extends the abstract `ARequest` class.

## Table of Contents

- [Post](#post)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
  - [Methods](#methods)
    - [performAs](#performas)
    - [to](#to)
    - [withData](#withdata)
    - [withHeaders](#withheaders)
    - [withResponseBodyFormat](#withresponsebodyformat)

## Class Overview

### Extends

This class extends the `ARequest` abstract class, providing a specific implementation for sending HTTP POST requests.

## Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<Response>;
```

- **Description:** Send an HTTP POST request to the specified URL.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<Response>` - The response object.

### to

```typescript
public static to(url: string): Post;
```

- **Description:** Create a new instance of the `Post` class with the specified URL.
- **Parameters:**
  - `url` - The URL of the target.
- **Returns:** `Post` - A new instance of the `Post` class.

### withData

```typescript
public withData(data: any): Post;
```

- **Description:** Add data to the HTTP POST request.
- **Parameters:**
  - `data` - The data to be added.
- **Returns:** `Post` - The existing instance of the `Post` class.

### withHeaders

```typescript
public withHeaders(headers: Headers): Post;
```

- **Description:** Add headers to the HTTP POST request.
- **Parameters:**
  - `headers` - The headers to be added.
- **Returns:** `Post` - The existing instance of the `Post` class.

### withResponseBodyFormat

```typescript
public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Post;
```

- **Description:** Set the format in which the response body should be returned.
- **Parameters:**
  - `responseBodyFormat` - The desired format of the response body.
- **Returns:** `Post` - The existing instance of the `Post` class.

[Back to overview](../../screenplay_elements.md)