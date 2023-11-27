[Back to overview]()

# Patch

The `Patch` class provides a convenient way to perform HTTP PATCH requests. It allows customization of data, headers, and the format of the response body, offering flexibility in testing scenarios. This class extends the abstract [ARequest](a_request.md) class.

## Table of Contents

- [Patch](#patch)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
  - [Properties](#properties)
    - [data](#data)
    - [responseBodyFormat](#responsebodyformat)
  - [Methods](#methods)
    - [performAs](#performas)
    - [to](#to)
    - [withData](#withdata)
    - [withHeaders](#withheaders)
    - [withResponseBodyFormat](#withresponsebodyformat)

## Class Overview

### Extends

This class extends the [ARequest](a_request.md) abstract class, providing a specific implementation for sending HTTP PATCH requests.

## Properties

### data

```typescript
private data?: any;
```

- **Description:** The data to be sent with the HTTP PATCH request.
- **Type:** `any` - The data.

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

- **Description:** Send an HTTP PATCH request to the specified URL.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<Response>` - The response object.

### to

```typescript
public static to(url: string): Patch;
```

- **Description:** Create a new instance of the `Patch` class with the specified URL.
- **Parameters:**
  - `url` - The URL of the target.
- **Returns:** `Patch` - A new instance of the `Patch` class.

### withData

```typescript
public withData(data: any): Patch;
```

- **Description:** Add data to the HTTP PATCH request.
- **Parameters:**
  - `data` - The data to be added.
- **Returns:** `Patch` - The existing instance of the `Patch` class.

### withHeaders

```typescript
public withHeaders(headers: Headers): Patch;
```

- **Description:** Add headers to the HTTP PATCH request.
- **Parameters:**
  - `headers` - The headers to be added.
- **Returns:** `Patch` - The existing instance of the `Patch` class.

### withResponseBodyFormat

```typescript
public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Patch;
```

- **Description:** Set the format in which the response body should be returned.
- **Parameters:**
  - `responseBodyFormat` - The desired format of the response body.
- **Returns:** `Patch` - The existing instance of the `Patch` class.

[Back to overview]()