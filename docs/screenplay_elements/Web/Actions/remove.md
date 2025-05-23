[Back to overview](../../screenplay_elements.md)

# Remove

The `Remove` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to remove either Session Storage Items or Local Storage Items from the browser using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Remove](#remove)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
      - [performAs](#performas)
      - [sessionStorageItem](#sessionstorageitem)
      - [localStorageItem](#localstorageitem)
      - [withAbilityAlias](#withabilityalias)
      - [orSkipOnFail](#orskiponfail)

## Class Overview

### Methods

#### performAs

```typescript
public performAs(actor: Actor): Promise<any>;
```

- **Description:** Removes either Session Storage Items or Local Storage Items from the browser.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - Returns the value of the `pageFunction` invocation.

#### sessionStorageItem

```typescript
public static sessionStorageItem(key: string): Remove;
```

- **Description:** Creates a new instance of the `Remove` class specifically for removing a session storage item with the given key.
- **Parameters:**
  - `key` - The key that specifies the item to be removed.
- **Returns:** `Remove` - Returns a new `Remove` instance for session storage.

#### localStorageItem

```typescript
public static localStorageItem(key: string): Remove;
```

- **Description:** Creates a new instance of the `Remove` class specifically for removing a local storage item with the given key.
- **Parameters:**
  - `key` - The key that specifies the item to be removed.
- **Returns:** `Remove` - Returns a new `Remove` instance for local storage.

#### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Remove;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Remove` - Returns the current action.

#### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Remove;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Remove` - Returns the current action.

[Back to overview](../../screenplay_elements.md)