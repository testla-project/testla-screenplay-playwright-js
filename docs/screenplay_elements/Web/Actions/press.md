[Back to overview](../../screenplay_elements.md)

# Press

The `Press` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to simulate pressing specified keys on the keyboard using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Press](#press)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [key](#key)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<void>;
```

- **Description:** Simulates pressing the specified key(s) on the keyboard.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Returns when the key(s) are pressed.

### key

```typescript
public static key(keys: string): Press;
```

- **Description:** Creates a new instance of the `Press` class specifically for pressing the specified key(s) on the keyboard.
- **Parameters:**
  - `keys` - The key(s) to press. Multiple keys can be pressed by concatenating with "+" (e.g., Shift+A).
- **Returns:** `Press` - Returns a new `Press` instance.

[Back to overview](../../screenplay_elements.md)