[Back to overview](../../screenplay_elements.md)

# Select

The `Select` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to set the value of a Selector of type select to the given option using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Select](#select)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [option](#option)
    - [inFrame](#inframe)
    - [withAbilityAlias](#withabilityalias)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Sets the value of a Selector of type select to the given option.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<any>` - This method checks, waits until all specified options are present in the `<select>` element and selects these options.

### option

```typescript
public static option(selector: Selector, option: string | { value?: string, label?: string, index?: number }, selectorOptions?: SelectorOptions): Select;
```

- **Description:** Creates a new instance of the `Select` class specifically for setting the value of a Selector of type select to the given option.
- **Parameters:**
  - `selector` - The string representing the (select) selector.
  - `option` - The label of the option to be selected. It can be either a string or an object with optional properties: `value`, `label`, or `index`.
  - `selectorOptions` - (optional): Advanced selector lookup options.
- **Returns:** `Select` - Returns a new `Select` instance.

### inFrame

```typescript
public inFrame(frameSelector: FrameSelector): Select;
```

- **Description:** Finds the specified frame selector using the `BrowseTheWeb` ability.
- **Parameters:**
  - `frameSelector` - The FrameSelector.
- **Returns:** `Select` - Returns the current action.

### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Select;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Select` - Returns the current action.

[Back to overview](../../screenplay_elements.md)