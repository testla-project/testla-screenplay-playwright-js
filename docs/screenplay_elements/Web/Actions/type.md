[Back to overview](../../screenplay_elements.md)

# Type

The `Type` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to type specified input into an element specified by a selector string using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Type](#type)
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

#### performAs

```typescript
public async performAs(actor: Actor): Promise<void>;
```

- **Description:** Finds the specified selector and fills it with the specified input string.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Resolves when the action is complete.

#### in

```typescript
public static in(selector: Selector, input: string, options?: SelectorOptions & Maskable): Type;
```

- **Description:** Creates a new instance of the `Type` class for typing specified input into an element specified by a selector string.
- **Parameters:**
  - `selector` - The selector.
  - `input` - The input string to type into the element.
  - `options` - (optional) Advanced selector lookup ans masking options.
- **Returns:** `Type` - Returns a new `Type` instance.

*As of 1.7.0 input values can be masked in the logs via the option `{ maskInLogs: true }` which is suggested for handling passwords or other clasified information in tests.*

#### inFrame

```typescript
public inFrame(frameSelector: FrameSelector): Type;
```

- **Description:** Finds the specified frame selector using the `BrowseTheWeb` ability.
- **Parameters:**
  - `frameSelector` - The FrameSelector.
- **Returns:** `Type` - Returns the current action.

#### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Type;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Type` - Returns the current action.

#### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Type;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Type` - Returns the current action.

[Back to overview](../../screenplay_elements.md)