[Back to overview](../../screenplay_elements.md)

# Add

The `Add` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to add cookies to the browser using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Add](#add)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [cookies](#cookies)

## Class Overview

### Methods

### performAs

```typescript
public performAs(actor: Actor): Promise<any>;
```

- **Description:** Adds the cookies to the browser using the `BrowseTheWeb` ability.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - Returns a promise that resolves after adding the cookies into the browser context.

### cookies

```typescript
public static cookies(cookies: Cookie[]): Add;
```

- **Description:** Creates a new instance of the `Add` class with the specified cookies.
- **Parameters:**
  - `cookies` - The cookies to add.
- **Returns:** `Add` - Returns a new `Add` instance.

[Back to overview](../../screenplay_elements.md)