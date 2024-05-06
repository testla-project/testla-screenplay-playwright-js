[Back to overview](../../screenplay_elements.md)

# Count

The `Count` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to count screen elements for a given selector using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Count](#count)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [page](#page)
    - [inFrame](#inframe)
    - [withAbilityAlias](#withabilityalias)
    - [orSkipOnFail](#orskiponfail)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Counts screen elements which can be found via a selector.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<number>` - Returns the count of found elements.

### page

```typescript
public static page(): Count;
```

- **Description:** Creates a new instance of the `Count` class specifically for counting elements which satisfy a selector lookup.
- **Parameters:**
  - `selector` - The Selector.
  - `options` (optional) - Advanced selector lookup options.
- **Returns:** `Count` - Returns a new `Count` instance.

### inFrame

```typescript
public inFrame(frameSelector: FrameSelector): Count;
```

- **Description:** Finds the specified frame selector using the `BrowseTheWeb` ability.
- **Parameters:**
  - `frameSelector` - The FrameSelector.
- **Returns:** `Count` - Returns the current action.

### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Count;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Count` - Returns the current action.

### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Count;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Count` - Returns the current action.

[Back to overview](../../screenplay_elements.md)