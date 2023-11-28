[Back to overview](../../screenplay_elements.md)

# Wait

The `Wait` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to wait for either a specified loading state or for a selector to become visible/active using the `BrowseTheWeb` ability provided by Playwright.

## Table of Contents

- [Wait](#wait)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Properties](#properties)
    - [Methods](#methods)
    - [performAs](#performas)
    - [forLoadState](#forloadstate)
    - [forSelector](#forselector)

## Class Overview

### Properties

- `action` - An object that determines what to wait for (loading state, selector, or selector == expected). Only one property is active at all times.

### Methods

### performAs

```typescript
public performAs(actor: Actor): Promise<any>;
```

- **Description:** Waits for either a specified loading state or for a selector to become visible/active.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - Resolves when the required load state or selector visibility is reached.

### forLoadState

```typescript
public static forLoadState(state: 'load' | 'domcontentloaded' | 'networkidle'): Wait;
```

- **Description:** Creates a new instance of the `Wait` class to wait for a specific status of the page.
- **Parameters:**
  - `state` - Either 'load', 'domcontentloaded', or 'networkidle'.
- **Returns:** `Wait` - Returns a new `Wait` instance.

### forSelector

```typescript
public static forSelector(selector: Selector, options?: SelectorOptions): Wait;
```

- **Description:** Creates a new instance of the `Wait` class to wait for a specific selector to exist.
- **Parameters:**
  - `selector` - The selector.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Wait` - Returns a new `Wait` instance.

[Back to overview](../../screenplay_elements.md)