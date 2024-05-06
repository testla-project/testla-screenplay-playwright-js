[Back to overview](../../screenplay_elements.md)

# Get

The `Get` class provides a convenient way to perform HTTP GET requests. It allows customization of headers and the format of the response body, offering flexibility in testing scenarios. This class extends the abstract `ARequest` class. 

## Table of Contents

- [Get](#get)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
  - [Methods](#methods)
    - [performAs](#performas)
    - [from](#from)
    - [withHeaders](#withheaders)
    - [withResponseBodyFormat](#withresponsebodyformat)
    - [withAbilityAlias](#withabilityalias)
    - [orSkipOnFail](#orskiponfail)

## Class Overview

### Extends

This class extends the `ARequest` abstract class, providing a specific implementation for sending HTTP GET requests.

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
- **Returns:** `Get` - The updated instance of the `Get` class.

### withResponseBodyFormat

```typescript
public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Get;
```

- **Description:** Set the format in which the response body should be returned.
- **Parameters:**
  - `responseBodyFormat` - The desired format of the response body which can be one out of `json`, `text`, `buffer` or `none`. The default is `json`.
- **Returns:** `Get` - The updated instance of the `Get` class.

### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Get;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Get` - Returns the current action.

### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Get;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Get` - Returns the current action.

[Back to overview](../../screenplay_elements.md)