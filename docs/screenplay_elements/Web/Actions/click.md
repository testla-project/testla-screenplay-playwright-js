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
    - [Options](#options)
      - [ClickOptions](#clickoptions)

## Class Overview

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<void>;
```

- **Description:** Finds the specified selector and clicks on it using the `BrowseTheWeb` ability.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<void>` - Returns a promise that resolves after clicking the element.

#### on

```typescript
public static on(selector: Selector, options?: SelectorOptions & ClickOptions): Click;
```

- **Description:** Creates a new instance of the `Click` class specifically for clicking on an element specified by a selector.
- **Parameters:**
  - `selector` - The Selector.
  - `options` (optional) - An object that can include both advanced selector lookup options (e.g., Playwright locator options) and click options.
- **Returns:** `Click` - Returns a new `Click` instance.

#### inFrame

```typescript
public inFrame(frameSelector: FrameSelector): Click;
```

- **Description:** Finds the specified frame selector using the `BrowseTheWeb` ability.
- **Parameters:**
  - `frameSelector` - The FrameSelector.
- **Returns:** `Click` - Returns the current action.

#### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Click;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Click` - Returns the current action.

#### orSkipOnFail

*Introduced in: 1.6.0*

```typescript
public get orSkipOnFail(): Click;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Click` - Returns the current action.

### Options

#### ClickOptions

*Introduced in 1.8.0*

|Option|Mandatory|Type|Default Value|
|--|--|--|--|
|force|-|boolean|-|
|button|-|'left' \| 'right' \| 'middle'|-|
|clickCount|-|number|-|
|delay|-|number|-|
|modifiers|-|Array<'Alt' \| 'Control' \| 'Meta' \| 'Shift'>|-|
|noWaitAfter|-|boolean|-|
|position|-|{ x: number; y: number }|-|
|trial|-|boolean-|

For detailed explainations per option please refer to the Playwright documentation.

[Back to overview](../../screenplay_elements.md)
