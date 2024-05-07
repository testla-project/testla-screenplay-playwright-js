[Back to overview](../../screenplay_elements.md)

# BrowseTheWeb Ability

The `BrowseTheWeb` class represents an actor's ability to interact with a browser using Playwright. This class extends the `Ability` class from the '@testla/screenplay' package and provides methods for performing various browser actions.

## Table of Contents

- [BrowseTheWeb Ability](#browsetheweb-ability)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Class Methods](#class-methods)
      - [using](#using)
      - [as](#as)
      - [getPage](#getpage)
      - [resolveSelectorToLocator](#resolveselectortolocator)

## Class Overview

### Class Methods

#### using

```typescript
public static using(page: Page): BrowseTheWeb;
```

- **Description:** Initializes the `BrowseTheWeb` ability by passing an already existing Playwright `Page` object.
- **Parameters:**
  - `page` - The Playwright `Page` that will be used to browse.
- **Returns:** `BrowseTheWeb` - Returns the ability to use a browser.

#### as

```typescript
public static as(actor: Actor, alias?: string): BrowseTheWeb;
```

- **Description:** Uses this ability as an actor.
- **Parameters:**
  - `actor` - The actor using this ability.
  - `alias` - (Optional) The alias for the ability
- **Returns:** `UseAPI` - The ability to use the BrowseTheWeb as the actor, optionally with an alias name.

#### getPage

```typescript
public getPage(): Page;
```

- **Description:** Gets the page object.
- **Returns:** `Page` - The page object.

#### resolveSelectorToLocator
*Introduced in: 1.4.0*

```typescript
public resolveSelectorToLocator(): Page;
```

- **Description:** Resolves a given Selector to a Playwright Locator.
- **Parameters:**
  - `selector` - The selector of the element.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<Locator>` - Returns resolved Locator(s) as per Playwright definition.

[Back to overview](../../screenplay_elements.md)
