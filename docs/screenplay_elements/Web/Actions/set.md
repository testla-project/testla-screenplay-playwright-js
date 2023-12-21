[Back to overview](../../screenplay_elements.md)

# Set

The `Set` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to set either Session Storage Items or Local Storage Items on the browser using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Set](#set)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [sessionStorageItem](#sessionstorageitem)
    - [localStorageItem](#localstorageitem)
    - [withAbilityAlias](#withabilityalias)

## Class Overview

### Methods

### performAs

```typescript
public performAs(actor: Actor): Promise<any>;
```

- **Description:** Sets the specified storage item in either Session Storage or Local Storage.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - Returns the value of the `pageFunction` invocation.

### sessionStorageItem

```typescript
public static sessionStorageItem(key: string, value: any): Set;
```

- **Description:** Creates a new instance of the `Set` class specifically for setting a session storage item identified by the given key and value.
- **Parameters:**
  - `key` - The key that specifies the item.
  - `value` - The value of the item.
- **Returns:** `Set` - Returns a new `Set` instance for session storage.

### localStorageItem

```typescript
public static localStorageItem(key: string, value: any): Set;
```

- **Description:** Creates a new instance of the `Set` class specifically for setting a local storage item identified by the given key and value.
- **Parameters:**
  - `key` - The key that specifies the item.
  - `value` - The value of the item.
- **Returns:** `Set` - Returns a new `Set` instance for local storage.

### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Set;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Set` - Returns the current action.

[Back to overview](../../screenplay_elements.md)