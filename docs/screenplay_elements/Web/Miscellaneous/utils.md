[Back to overview](../../screenplay_elements.md)

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
    - [recursiveFrameLookup](#recursiveframelookup)

## Module Overview

### Functions

### getSubLocator

```typescript
const getSubLocator = async (locator: Locator, subLocator?: Locator, text?: string | RegExp): Promise<Locator>;
```

- **Description:** The function filters for a locator based on the provided subLocator and text or regular expression.
- **Parameters:**
  - `locator` - Playwright locator.
  - `subLocator` - (optional) Sub-locator.
  - `text` - (optional) Text to check.
- **Returns:** `Promise<Locator>` - Resolves to the Playwright locator with sub-locator and text filtering.

### subLocatorLookup

```typescript
const subLocatorLookup = async ({
    base, locator, timeout, subSelector, state = 'visible',
}: { base: Page; locator: Locator; timeout?: number; subSelector?: SubSelector, state?: SelectorOptionsState }): Promise<Locator>;
```

- **Description:** Performs sub-locator lookup, waiting for selectors to get into the desired state.
- **Parameters:**
  - `base` - Playwright page.
  - `locator` - Playwright locator.
  - `timeout` - (optional) Timeout for waiting.
  - `subSelector` - (optional) Sub-selector information.
  - `state` - (optional) Selector state to wait for.
- **Returns:** `Promise<Locator>` - Resolves to the resolved Playwright locator.

### recursiveLocatorLookup

```typescript
export const recursiveLocatorLookup = async ({ page, selector, options }: { page: Page; selector: Selector; options?: SelectorOptions & { evaluateVisible?: boolean }, frameTree?: FrameSelector[] }): Promise<Locator>;
```

- **Description:** Recursively resolves locators, handling sub-selectors and waiting for selectors to become visible.
- **Parameters:**
  - `page` - Playwright page.
  - `selector` - Selector information.
  - `options` - (optional) Selector options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<Locator>` - Resolves to the final Playwright locator after recursive lookup.


### recursiveFrameLookup

```typescript
export const recursiveFrameLookup = (page: Page, frameTree: FrameSelector[]): FrameLocator;
```

- **Description:** Resolves frame locators, handling sub-frame locators.
- **Parameters:**
  - `page` - Playwright page.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `FrameLocator` - Resolves to the final FrameLocator after lookup.

[Back to overview](../../screenplay_elements.md)