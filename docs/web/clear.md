[Back to overview]()

# Clear

The `Clear` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to remove cookies from the browser using the `BrowseTheWeb` ability provided by Playwright.

## Table of Contents

- [Clear](#clear)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [cookies](#cookies)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Waits for either a specified loading state or for a selector to become visible/active and then clears all browser cookies using the `BrowseTheWeb` ability.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - Returns a promise that resolves after clearing context cookies.

### cookies

```typescript
public static cookies(): Clear;
```

- **Description:** Creates a new instance of the `Clear` class specifically for clearing browser cookies.
- **Returns:** `Clear` - Returns a new `Clear` instance.

[Back to overview]()