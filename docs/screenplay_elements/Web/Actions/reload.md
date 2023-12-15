[Back to overview](../../screenplay_elements.md)

# Reload

The `Reload` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to reload the currently browsed page using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Reload](#reload)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [page](#page)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Reloads the current page.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - Returns the main resource response.

### page

```typescript
public static page(): Reload;
```

- **Description:** Creates a new instance of the `Reload` class specifically for reloading the currently browsed page.
- **Returns:** `Reload` - Returns a new `Reload` instance.

[Back to overview](../../screenplay_elements.md)