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
      - [withAbilityAlias](#withabilityalias)
      - [orSkipOnFail](#orskiponfail)

## Class Overview

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Reloads the current page.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - Returns the main resource response.

#### page

```typescript
public static page(): Reload;
```

- **Description:** Creates a new instance of the `Reload` class specifically for reloading the currently browsed page.
- **Returns:** `Reload` - Returns a new `Reload` instance.

#### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Reload;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Reload` - Returns the current action.

#### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Reload;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Reload` - Returns the current action.

[Back to overview](../../screenplay_elements.md)