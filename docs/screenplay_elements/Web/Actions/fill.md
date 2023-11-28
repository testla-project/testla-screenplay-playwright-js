[Back to overview](../../screenplay_elements.md)

# Fill

The `Fill` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to find an element specified by a selector and fill it with a specified input using the `BrowseTheWeb` ability provided by Playwright.

## Table of Contents

- [Fill](#fill)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [in](#in)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<void>;
```

- **Description:** Finds the specified selector and fills it with the specified input using the `BrowseTheWeb` ability. This action checks, focuses the element, fills it, and triggers an `input` event after filling.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Returns a promise that resolves after filling the specified element.

### in

```typescript
public static in(selector: Selector, input: string, options?: SelectorOptions): Fill;
```

- **Description:** Creates a new instance of the `Fill` class specifically for filling the specified element with the specified input.
- **Parameters:**
  - `selector` - The selector of the element to be filled.
  - `input` - The input string to fill the element with.
  - `options` (optional) - Advanced selector lookup options.
- **Returns:** `Fill` - Returns a new `Fill` instance.

[Back to overview](../../screenplay_elements.md)