[Back to overview](../../screenplay_elements.md)

# Delete

The `Delete` class provides a convenient way to perform HTTP DELETE requests. It allows customization of headers and the format of the response body, offering flexibility in testing scenarios. This class extends the abstract `ARequest` class. 

## Table of Contents

- [Delete](#delete)
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

This class extends the `ARequest` abstract class, providing a specific implementation for sending HTTP DELETE requests.

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<Response>;
```

- **Description:** Send an HTTP DELETE request to the specified URL.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<Response>` - The response object.

#### from

```typescript
public static from(url: string): Delete;
```

- **Description:** Create a new instance of the `Delete` class with the specified URL.
- **Parameters:**
  - `url` - The URL of the target.
- **Returns:** `Delete` - A new instance of the `Delete` class.

#### withHeaders

```typescript
public withHeaders(headers: Headers): Delete;
```

- **Description:** Add headers to the HTTP DELETE request.
- **Parameters:**
  - `headers` - The headers to be added.
- **Returns:** `Delete` - The updated instance of the `Delete` class.

#### withResponseBodyFormat

```typescript
public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Delete;
```

- **Description:** Set the format in which the response body should be returned.
- **Parameters:**
  - `responseBodyFormat` - The desired format of the response body which can be one out of `json`, `text`, `buffer` or `none`. The default is `json`.
- **Returns:** `Delete` - The updated instance of the `Delete` class.

#### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Delete;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Delete` - Returns the current action.

#### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Delete;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Delete` - Returns the current action.

[Back to overview](../../screenplay_elements.md)