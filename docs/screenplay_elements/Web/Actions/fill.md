[Back to overview](../../screenplay_elements.md)

# Fill

The `Fill` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to find an element specified by a selector and fill it with a specified input using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Fill](#fill)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [in](#in)
    - [inFrame](#inframe)
    - [withAbilityAlias](#withabilityalias)
    - [orSkipOnFail](#orskiponfail)

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

### inFrame

```typescript
public inFrame(frameSelector: FrameSelector): Fill;
```

- **Description:** Finds the specified frame selector using the `BrowseTheWeb` ability.
- **Parameters:**
  - `frameSelector` - The FrameSelector.
- **Returns:** `Fill` - Returns the current action.

### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Fill;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Fill` - Returns the current action.

### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Fill;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Fill` - Returns the current action.

[Back to overview](../../screenplay_elements.md)