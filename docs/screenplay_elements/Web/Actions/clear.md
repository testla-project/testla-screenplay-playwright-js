[Back to overview](../../screenplay_elements.md)

# Clear

The `Clear` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to remove cookies from the browser using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Clear](#clear)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [cookies](#cookies)
    - [withAbilityAlias](#withabilityalias)
    - [orSkipOnFail](#orskiponfail)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Clears all browser cookies using the `BrowseTheWeb` ability.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - Returns a promise that resolves after clearing cookies.

### cookies

```typescript
public static cookies(): Clear;
```

- **Description:** Creates a new instance of the `Clear` class specifically for clearing browser cookies.
- **Returns:** `Clear` - Returns a new `Clear` instance.

### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Clear;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Clear` - Returns the current action.

### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Clear;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Clear` - Returns the current action.

[Back to overview](../../screenplay_elements.md)