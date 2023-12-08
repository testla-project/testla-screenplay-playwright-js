[Back to overview](../../screenplay_elements.md)

# Hover

The `Hover` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to simulate hovering over an element specified by a selector string using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Hover](#hover)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [over](#over)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<void>;
```

- **Description:** Finds the specified selector and simulates hovering over it.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Returns when hovered over the element.

### over

```typescript
public static over(selector: Selector, options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] }): Hover;
```

- **Description:** Creates a new instance of the `Hover` class specifically for hovering over an element.
- **Parameters:**
  - `selector` - The selector that should be hovered over.
  - `options` (optional) - Advanced selector lookup options + Modifier keys to press. Ensures that only these modifiers are pressed during the operation.
- **Returns:** `Hover` - Returns a new `Hover` instance.

[Back to overview](../../screenplay_elements.md)