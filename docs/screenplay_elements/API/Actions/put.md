[Back to overview](../../screenplay_elements.md)

# Put

The `Put` class provides a convenient way to perform HTTP PUT requests. It allows customization of data, headers, and the format of the response body, offering flexibility in testing scenarios. This class extends the abstract `ARequest` class.

## Table of Contents

- [Put](#put)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
  - [Methods](#methods)
    - [performAs](#performas)
    - [to](#to)
    - [withData](#withdata)
    - [withHeaders](#withheaders)
    - [withResponseBodyFormat](#withresponsebodyformat)
    - [withAbilityAlias](#withabilityalias)
    - [orSkipOnFail](#orskiponfail)

## Class Overview

### Extends

This class extends the `ARequest` abstract class, providing a specific implementation for sending HTTP PUT requests.

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
- **Returns:** `Put` - The updated instance of the `Put` class.

### withHeaders

```typescript
public withHeaders(headers: Headers): Put;
```

- **Description:** Add headers to the HTTP PUT request.
- **Parameters:**
  - `headers` - The headers to be added.
- **Returns:** `Put` - The updated instance of the `Put` class.

### withResponseBodyFormat

```typescript
public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Put;
```

- **Description:** Set the format in which the response body should be returned.
- **Parameters:**
  - `responseBodyFormat` - The desired format of the response body which can be one out of `json`, `text`, `buffer` or `none`. The default is `json`.
- **Returns:** `Put` - The updated instance of the `Put` class.

### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Put;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Put` - Returns the current action.

### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Put;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Put` - Returns the current action.

[Back to overview](../../screenplay_elements.md)