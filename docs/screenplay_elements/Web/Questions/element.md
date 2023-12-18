[Back to overview](../../screenplay_elements.md)

# Element

The `Element` class is a question class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to inquire about the state of a web element, such as visibility, enabled state, text, or value, using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Element](#element)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [answeredBy](#answeredby)
    - [toBe](#tobe)
    - [notToBe](#nottobe)
    - [toHave](#tohave)
    - [notToHave](#nottohave)
    - [visible](#visible)
    - [enabled](#enabled)
    - [checked](#checked)
    - [text](#text)
    - [value](#value)
    - [count](#count)
    - [minCount](#mincount)

## Class Overview

### Methods

### answeredBy

```typescript
public async answeredBy(actor: Actor): Promise<boolean>;
```

- **Description:** Verifies if an element is in the specified state (visible, enabled, has text, or has value).
- **Parameters:**
  - `actor` - The actor answering this question.
- **Returns:** `Promise<boolean>` - Resolves to `true` for a positive check, `false` for a negative check.

### toBe

```typescript
public static get toBe(): Element;
```

- **Description:** Creates a new instance of the `Element` class for a positive check.
- **Returns:** `Element` - Returns a new `Element` instance.

### notToBe

```typescript
public static get notToBe(): Element;
```

- **Description:** Creates a new instance of the `Element` class for a negative check.
- **Returns:** `Element` - Returns a new `Element` instance.

### toHave

```typescript
public static get toHave(): Element;
```

- **Description:** Alias for `toBe`. Creates a new instance of the `Element` class for a positive check.
- **Returns:** `Element` - Returns a new `Element` instance.

### notToHave

```typescript
public static get notToHave(): Element;
```

- **Description:** Alias for `notToBe`. Creates a new instance of the `Element` class for a negative check.
- **Returns:** `Element` - Returns a new `Element` instance.

### visible

```typescript
public visible(selector: Selector, options?: SelectorOptions): Element;
```

- **Description:** Verifies if an element is visible.
- **Parameters:**
  - `selector` - The selector.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Element` - Returns this `Element` instance.

### enabled

```typescript
public enabled(selector: Selector, options?: SelectorOptions): Element;
```

- **Description:** Verifies if an element is enabled.
- **Parameters:**
  - `selector` - The selector.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Element` - Returns this `Element` instance.

### checked

```typescript
public enabled(selector: Selector, options?: SelectorOptions): Element;
```

- **Description:** Verifies if an element is checked.
- **Parameters:**
  - `selector` - The selector.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Element` - Returns this `Element` instance.

### text

```typescript
public text(selector: Selector, text: string | RegExp | (string | RegExp)[], options?: SelectorOptions): Element;
```

- **Description:** Verifies if an element has the given text.
- **Parameters:**
  - `selector` - The selector.
  - `text` - The text to check.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Element` - Returns this `Element` instance.

### value

```typescript
public value(selector: Selector, value: string | RegExp, options?: SelectorOptions): Element;
```

- **Description:** Verifies if an element has the given value.
- **Parameters:**
  - `selector` - The selector.
  - `value` - The value to check.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Element` - Returns this `Element` instance.

### count

```typescript
public count(selector: Selector, desiredCount: number, options?: SelectorOptions): Element;
```

- **Description:** Verifies if an element has a desired count.
- **Parameters:**
  - `selector` - The selector.
  - `desiredCount` - The desired count.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Element` - Returns this `Element` instance.

### minCount

```typescript
public minCount(selector: Selector, minimumCount: number, options?: SelectorOptions): Element;
```

- **Description:** Verifies if an element has a minimum count.
- **Parameters:**
  - `selector` - The selector.
  - `minimumCount` - The minimum count.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Element` - Returns this `Element` instance.

[Back to overview](../../screenplay_elements.md)