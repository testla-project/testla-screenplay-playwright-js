[Back to overview](../../screenplay_elements.md)

# DoubleClick

The `DoubleClick` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to double click on an element specified by a selector using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [DoubleClick](#doubleclick)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
      - [performAs](#performas)
      - [on](#on)
        - [Double Click Options](#double-click-options)
      - [inFrame](#inframe)
      - [withAbilityAlias](#withabilityalias)
      - [orSkipOnFail](#orskiponfail)

## Class Overview

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<void>;
```

- **Description:** Finds the specified selector and double clicks on it using the `BrowseTheWeb` ability.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Returns a promise that resolves after double clicking the element.

#### on

```typescript
public static on(selector: Selector, options?: SelectorOptions): DoubleClick;
```

- **Description:** Creates a new instance of the `DoubleClick` class specifically for double clicking on an element specified by a selector.
- **Parameters:**
  - `selector` - The Selector.
  - `options` (optional) - An object that can include both advanced selector lookup options (e.g., Playwright locator options) and double click options (see below).
- **Returns:** `DoubleClick` - Returns a new `DoubleClick` instance.

##### Double Click Options

The `options` parameter is a combination of:
- **SelectorOptions**: Options for locating the element (e.g., Playwright locator options like `hasText`, `has`, etc.).
- **DoubleClickOptions**: Options for the click action itself (e.g., `force`, `button`, etc.).

You can combine these options in a single object:

**Example: Combining Locator and Double Click Options**

```typescript
await actor.attemptsTo(
    DoubleClick.on(page.locator('button'), { hasText: 'Add Element', force: true })
);
```

In this example, `hasText: 'Add Element'` is a locator option, and `force: true` is a double click option.

#### inFrame

```typescript
public inFrame(frameSelector: FrameSelector): DoubleClick;
```

- **Description:** Finds the specified frame selector using the `BrowseTheWeb` ability.
- **Parameters:**
  - `frameSelector` - The FrameSelector.
- **Returns:** `DoubleClick` - Returns the current action.

#### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): DoubleClick;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `DoubleClick` - Returns the current action.

#### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): DoubleClick;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `DoubleClick` - Returns the current action.

[Back to overview](../../screenplay_elements.md)