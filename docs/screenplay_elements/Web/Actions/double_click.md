[Back to overview](../../screenplay_elements.md)

# DoubleClick

The `DoubleClick` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to double click on an element specified by a selector using the `BrowseTheWeb` ability provided by Playwright.

## Table of Contents

- [DoubleClick](#doubleclick)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [on](#on)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<void>;
```

- **Description:** Finds the specified selector and double clicks on it using the `BrowseTheWeb` ability.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Returns a promise that resolves after double clicking the element.

### on

```typescript
public static on(selector: Selector, options?: SelectorOptions): DoubleClick;
```

- **Description:** Creates a new instance of the `DoubleClick` class specifically for double clicking on an element specified by a selector.
- **Parameters:**
  - `selector` - The string representing the selector.
  - `options` (optional) - Advanced selector lookup options.
- **Returns:** `DoubleClick` - Returns a new `DoubleClick` instance.

[Back to overview](../../screenplay_elements.md)