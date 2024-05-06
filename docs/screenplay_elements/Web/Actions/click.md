[Back to overview](../../screenplay_elements.md)

# Click

The `Click` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to click on an element specified by a selector using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Click](#click)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [on](#on)
    - [inFrame](#inframe)
    - [withAbilityAlias](#withabilityalias)
    - [orSkipOnFail](#orskiponfail)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<void>;
```

- **Description:** Finds the specified selector and clicks on it using the `BrowseTheWeb` ability.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Returns a promise that resolves after clicking the element.

### on

```typescript
public static on(selector: Selector, options?: SelectorOptions): Click;
```

- **Description:** Creates a new instance of the `Click` class specifically for clicking on an element specified by a selector.
- **Parameters:**
  - `selector` - The Selector.
  - `options` (optional) - Advanced selector lookup options.
- **Returns:** `Click` - Returns a new `Click` instance.

### inFrame

```typescript
public inFrame(frameSelector: FrameSelector): Click;
```

- **Description:** Finds the specified frame selector using the `BrowseTheWeb` ability.
- **Parameters:**
  - `frameSelector` - The FrameSelector.
- **Returns:** `Click` - Returns the current action.

### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Click;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Click` - Returns the current action.

### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Click;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Click` - Returns the current action.

[Back to overview](../../screenplay_elements.md)
