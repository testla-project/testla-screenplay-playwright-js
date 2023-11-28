[Back to overview](../../screenplay_elements.md)

# Check

The `Check` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to check a checkbox specified by a selector string using the `BrowseTheWeb` ability provided by Playwright.

## Table of Contents

- [Check](#check)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [element](#element)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<void>;
```

- **Description:** Finds the specified selector and clicks on the checkbox using the `BrowseTheWeb` ability.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Returns a promise that resolves after checking the element.

### element

```typescript
public static element(selector: Selector, options?: SelectorOptions): Check;
```

- **Description:** Creates a new instance of the `Check` class with the specified selector and options.
- **Parameters:**
  - `selector` - The string representing the selector of the checkbox.
  - `options` (optional) - Advanced selector lookup options.
- **Returns:** `Check` - Returns a new `Check` instance.

[Back to overview](../../screenplay_elements.md)