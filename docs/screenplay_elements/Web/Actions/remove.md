[Back to overview](../../screenplay_elements.md)

# Remove

The `Remove` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to remove either Session Storage Items or Local Storage Items from the browser using the `BrowseTheWeb` ability provided by Playwright.

## Table of Contents

- [Remove](#remove)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [sessionStorageItem](#sessionstorageitem)
    - [localStorageItem](#localstorageitem)

## Class Overview

### Methods

### performAs

```typescript
public performAs(actor: Actor): Promise<any>;
```

- **Description:** Removes either Session Storage Items or Local Storage Items from the browser.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - Returns the value of the `pageFunction` invocation.

### sessionStorageItem

```typescript
public static sessionStorageItem(key: string): Remove;
```

- **Description:** Creates a new instance of the `Remove` class specifically for removing a session storage item with the given key.
- **Parameters:**
  - `key` - The key that specifies the item to be removed.
- **Returns:** `Remove` - Returns a new `Remove` instance for session storage.

### localStorageItem

```typescript
public static localStorageItem(key: string): Remove;
```

- **Description:** Creates a new instance of the `Remove` class specifically for removing a local storage item with the given key.
- **Parameters:**
  - `key` - The key that specifies the item to be removed.
- **Returns:** `Remove` - Returns a new `Remove` instance for local storage.

[Back to overview](../../screenplay_elements.md)