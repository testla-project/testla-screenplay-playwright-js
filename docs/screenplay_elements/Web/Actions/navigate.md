[Back to overview](../../screenplay_elements.md)

# Navigate

The `Navigate` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to navigate to a specified URL using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Navigate](#navigate)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [to](#to)
    - [withAbilityAlias](#withabilityalias)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Navigates to the specified URL.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - Returns the main resource response.

### to

```typescript
public static to(url: string): Navigate;
```

- **Description:** Creates a new instance of the `Navigate` class specifically for navigating to a certain URL.
- **Parameters:**
  - `url` - The URL which should be accessed.
- **Returns:** `Navigate` - Returns a new `Navigate` instance.

### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Navigate;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Navigate` - Returns the current action.

[Back to overview](../../screenplay_elements.md)