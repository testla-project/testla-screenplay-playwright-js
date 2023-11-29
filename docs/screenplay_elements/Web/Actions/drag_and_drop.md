[Back to overview](../../screenplay_elements.md)

# DragAndDrop

The `DragAndDrop` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to drag an element specified by a source selector and drop it on an element specified by a target selector using the `BrowseTheWeb` ability provided by Playwright.

## Table of Contents

- [DragAndDrop](#draganddrop)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [execute](#execute)

## Class Overview

### Methods

### performAs

```typescript
public performAs(actor: Actor): Promise<void>;
```

- **Description:** Drags the specified source element and drops it on the target element using the `BrowseTheWeb` ability.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Returns a promise that resolves after dragging the locator to another target locator or target position.

### execute

```typescript
public static execute(sourceSelector: Selector, targetSelector: Selector, options?: {
    source?: SelectorOptions;
    target?: SelectorOptions;
}): DragAndDrop;
```

- **Description:** Creates a new instance of the `DragAndDrop` class specifically for dragging the specified source element and dropping it on the specified target element.
- **Parameters:**
  - `sourceSelector` - The selector of the source element.
  - `targetSelector` - The selector of the target element.
  - `options` (optional) - Advanced selector lookup options.
- **Returns:** `DragAndDrop` - Returns a new `DragAndDrop` instance.

[Back to overview](../../screenplay_elements.md)