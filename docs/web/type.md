[Back to overview]()

# Type

The `Type` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to type specified input into an element specified by a selector string using the `BrowseTheWeb` ability provided by Playwright.

## Table of Contents

- [Type](#type)
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

- **Description:** Finds the specified selector and fills it with the specified input string.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Resolves when the action is complete.

### in

```typescript
public static in(selector: Selector, input: string, options?: SelectorOptions): Type;
```

- **Description:** Creates a new instance of the `Type` class for typing specified input into an element specified by a selector string.
- **Parameters:**
  - `selector` - The selector.
  - `input` - The input string to type into the element.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Type` - Returns a new `Type` instance.

[Back to overview]()