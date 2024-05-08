[Back to overview](../../screenplay_elements.md)

# Press

The `Press` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to simulate pressing specified keys on the keyboard using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Press](#press)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [key](#key)
    - [pressSequentially](#presssequentially)
    - [inFrame](#inframe)
    - [withAbilityAlias](#withabilityalias)
    - [orSkipOnFail](#orskiponfail)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<void>;
```

- **Description:** Simulates pressing the specified key(s) on the keyboard.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Returns when the key(s) are pressed.

### key

```typescript
public static key(keys: string): Press;
```

- **Description:** Creates a new instance of the `Press` class specifically for pressing the specified key(s) on the keyboard.
- **Parameters:**
  - `keys` - The key(s) to press. Multiple keys can be pressed by concatenating with "+" (e.g., Shift+A).
- **Returns:** `Press` - Returns a new `Press` instance.

### pressSequentially

```typescript
public static pressSequentially(selector: Selector, input: string, options?: SelectorOptions): Press;
```

- **Description:** Creates a new instance of the `Press` class types the given input into the element specified by the selector.
- **Parameters:**
  - `selector` - The selector of the source element.
  - `input` - The input to type into the element.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<void>` - Returns when the key(s) have been pressed.

### inFrame

```typescript
public inFrame(frameSelector: FrameSelector): Press;
```

- **Description:** Finds the specified frame selector using the `BrowseTheWeb` ability.
- **Parameters:**
  - `frameSelector` - The FrameSelector.
- **Returns:** `Press` - Returns the current action.

### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Press;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Press` - Returns the current action.

### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Press;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Press` - Returns the current action.

[Back to overview](../../screenplay_elements.md)
