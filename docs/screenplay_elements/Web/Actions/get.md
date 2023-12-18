[Back to overview](../../screenplay_elements.md)

# Get

The `Get` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to retrieve either cookies, session storage items, or local storage items from the browser using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Get](#get)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [cookies](#cookies)
    - [sessionStorageItem](#sessionstorageitem)
    - [localStorageItem](#localstorageitem)
    - [element](#element)
    - [elements](#elements)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Retrieves cookies, session storage items, or local storage items based on the specified mode.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - Returns cookies, session storage items, or local storage items.

### cookies

```typescript
public static cookies(urls?: string | string[] | undefined): Get;
```

- **Description:** Creates a new instance of the `Get` class specifically for retrieving cookies.
- **Parameters:**
  - `urls` (optional) - If URLs are specified, only cookies that affect those URLs are returned. If no URLs are specified, all cookies are returned.
- **Returns:** `Get` - Returns a new `Get` instance for cookies.

### sessionStorageItem

```typescript
public static sessionStorageItem(key: string): Get;
```

- **Description:** Creates a new instance of the `Get` class specifically for retrieving a session storage item.
- **Parameters:**
  - `key` - The key that specifies the session storage item.
- **Returns:** `Get` - Returns a new `Get` instance for session storage.

### localStorageItem

```typescript
public static localStorageItem(key: string): Get;
```

- **Description:** Creates a new instance of the `Get` class specifically for retrieving a local storage item.
- **Parameters:**
  - `key` - The key that specifies the local storage item.
- **Returns:** `Get` - Returns a new `Get` instance for local storage.

### element

```typescript
public static element(selector: Selector, options?: SelectorOptions): Get;
```

- **Description:** Creates a new instance of the `Get` class specifically for retrieving a single screen element.
- **Parameters:**
  - `selector` - The Selector.
  - `options` (optional) - Advanced selector lookup options.
- **Returns:** `Get` - Returns a new `Get` instance for single screen elements.

### elements

```typescript
public static elements(selector: Selector, options?: SelectorOptions): Get;
```

- **Description:** Creates a new instance of the `Get` class specifically for retrieving a list of screen elements.
- **Parameters:**
  - `selector` - The Selector.
  - `options` (optional) - Advanced selector lookup options.
- **Returns:** `Get` - Returns a new `Get` instance for a list of screen elements.

[Back to overview](../../screenplay_elements.md)