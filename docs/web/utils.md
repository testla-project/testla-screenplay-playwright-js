[Back to overview]()

# Locator Utility Functions

This module provides utility functions for working with Playwright locators and performing advanced selector lookups. The module includes functions for dealing with sub-selectors, waiting for selectors to become visible, and recursively resolving locators.

## Table of Contents

- [Locator Utility Functions](#locator-utility-functions)
  - [Table of Contents](#table-of-contents)
  - [Module Overview](#module-overview)
    - [Functions](#functions)
    - [getSubLocator](#getsublocator)
    - [subLocatorLookup](#sublocatorlookup)
    - [recursiveLocatorLookup](#recursivelocatorlookup)

## Module Overview

### Functions

### getSubLocator

```typescript
const getSubLocator = async (locator: Locator, subLocator?: Locator, text?: string | RegExp): Promise<Locator>;
```

- **Description:** Deals with selector == Playwright Locator and options.hasText.
- **Parameters:**
  - `locator` - Playwright locator.
  - `subLocator` - (optional) Sub-locator.
  - `text` - (optional) Text to check.
- **Returns:** `Promise<Locator>` - Resolves to the Playwright locator with sub-locator and text filtering.

### subLocatorLookup

```typescript
const subLocatorLookup = async ({
    page, locator, timeout, subSelector, state = 'visible',
}: { page: Page; locator: Locator; timeout?: number; subSelector?: SubSelector, state?: SelectorOptionsState }): Promise<Locator>;
```

- **Description:** Performs sub-locator lookup, waiting for selectors to become visible based on timeout options.
- **Parameters:**
  - `page` - Playwright page.
  - `locator` - Playwright locator.
  - `timeout` - (optional) Timeout for waiting.
  - `subSelector` - (optional) Sub-selector information.
  - `state` - (optional) Selector state to wait for.
- **Returns:** `Promise<Locator>` - Resolves to the resolved Playwright locator.

### recursiveLocatorLookup

```typescript
export const recursiveLocatorLookup = async ({ page, selector, options }: { page: Page; selector: Selector; options?: SelectorOptions }): Promise<Locator>;
```

- **Description:** Recursively resolves locators, handling sub-selectors and waiting for selectors to become visible.
- **Parameters:**
  - `page` - Playwright page.
  - `selector` - Selector information.
  - `options` - (optional) Selector options.
- **Returns:** `Promise<Locator>` - Resolves to the final Playwright locator after recursive lookup.

[Back to overview]()