[Back to overview]()

# Put

The `Put` class provides a convenient way to perform HTTP PUT requests. It allows customization of data, headers, and the format of the response body, offering flexibility in testing scenarios. This class extends the abstract [ARequest](a_request.md) class.

## Table of Contents

- [Put](#put)
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

This class extends the [ARequest](a_request.md) abstract class, providing a specific implementation for sending HTTP PUT requests.

## Properties

### data

```typescript
private data?: any;
```

- **Description:** The data to be sent with the HTTP PUT request.
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

- **Description:** Send an HTTP PUT request to the specified URL.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<Response>` - The response object.

### to

```typescript
public static to(url: string): Put;
```

- **Description:** Create a new instance of the `Put` class with the specified URL.
- **Parameters:**
  - `url` - The URL of the target.
- **Returns:** `Put` - A new instance of the `Put` class.

### withData

```typescript
public withData(data: any): Put;
```

- **Description:** Add data to the HTTP PUT request.
- **Parameters:**
  - `data` - The data to be added.
- **Returns:** `Put` - The existing instance of the `Put` class.

### withHeaders

```typescript
public withHeaders(headers: Headers): Put;
```

- **Description:** Add headers to the HTTP PUT request.
- **Parameters:**
  - `headers` - The headers to be added.
- **Returns:** `Put` - The existing instance of the `Put` class.

### withResponseBodyFormat

```typescript
public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Put;
```

- **Description:** Set the format in which the response body should be returned.
- **Parameters:**
  - `responseBodyFormat` - The desired format of the response body.
- **Returns:** `Put` - The existing instance of the `Put` class.

[Back to overview]()