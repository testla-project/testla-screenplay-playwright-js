[Back to overview](../../screenplay_elements.md)

# Hover

The `Hover` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to simulate hovering over an element specified by a selector string using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Hover](#hover)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
      - [performAs](#performas)
      - [over](#over)
      - [inFrame](#inframe)
      - [withAbilityAlias](#withabilityalias)
      - [orSkipOnFail](#orskiponfail)

## Class Overview

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<void>;
```

- **Description:** Finds the specified selector and simulates hovering over it.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Returns when hovered over the element.

#### over

```typescript
public static over(selector: Selector, options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] }): Hover;
```

- **Description:** Creates a new instance of the `Hover` class specifically for hovering over an element.
- **Parameters:**
  - `selector` - The selector that should be hovered over.
  - `options` (optional) - Advanced selector lookup options + Modifier keys to press. Ensures that only these modifiers are pressed during the operation.
- **Returns:** `Hover` - Returns a new `Hover` instance.

#### inFrame

```typescript
public inFrame(frameSelector: FrameSelector): Hover;
```

- **Description:** Finds the specified frame selector using the `BrowseTheWeb` ability.
- **Parameters:**
  - `frameSelector` - The FrameSelector.
- **Returns:** `Hover` - Returns the current action.

#### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Hover;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Hover` - Returns the current action.

#### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Hover;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Hover` - Returns the current action.

[Back to overview](../../screenplay_elements.md)