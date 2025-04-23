[Back to overview](../../screenplay_elements.md)

# Page

*Introduced in: 1.8.0*

The `Page` class is a question class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class enables actors to inquire about the state of a browser page, such as url, using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Element](#element)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
      - [answeredBy](#answeredby)
      - [toHave](#tohave)
      - [notToHave](#nottohave)
      - [url](#url)
      - [withAbilityAlias](#withabilityalias)
      - [failAsFalse](#failasfalse)

## Class Overview

### Methods

#### answeredBy

```typescript
public async answeredBy(actor: Actor): Promise<boolean>;
```

- **Description:** Verifies if the page is in the specified state (i.e. url).
- **Parameters:**
  - `actor` - The actor answering this question.
- **Returns:** `Promise<boolean>` - Resolves to `true` for a positive check, `false` for a negative check.

#### toHave

```typescript
public static get toHave(): Page;
```

- **Description:** Creates a new instance of the `Page` class for a positive check.
- **Returns:** `Page` - Returns a new `Page` instance.

#### notToHave

```typescript
public static get notToHave(): Page;
```

- **Description:** Creates a new instance of the `Page` class for a negative check.
- **Returns:** `Page` - Returns a new `Page` instance.

#### url

*Introduced in: 1.8.0*

```typescript
public url(url: string | RegExp, options?: { timeout?: number }): Page;
```

- **Description:** Verifies if an element has the given text.
- **Parameters:**
  - `url` - The url.
  - `options` - (optional) Advanced page options.
- **Returns:** `Page` - Returns this `Page` instance.

#### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Page;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Page` - Returns the current question.

#### failAsFalse

*Introduced in: 1.6.0*

```typescript
public get failAsFalse(): Page;
```

- **Description:** Returns false instead of failing when exception occurrs.
- **Returns:** `Page` - Returns the current question.

[Back to overview](../../screenplay_elements.md)