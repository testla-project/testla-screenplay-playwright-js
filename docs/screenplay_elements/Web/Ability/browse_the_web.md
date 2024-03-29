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
      - [goto](#goto)
      - [reload](#reload)
      - [waitForLoadState](#waitforloadstate)
      - [hover](#hover)
      - [press](#press)
      - [checkBox](#checkbox)
      - [waitForSelector](#waitforselector)
      - [dragAndDrop](#draganddrop)
      - [fill](#fill)
      - [type](#type)
      - [click](#click)
      - [dblclick](#dblclick)
      - [checkVisibilityState](#checkvisibilitystate)
      - [checkEnabledState](#checkenabledstate)
      - [checkSelectorText](#checkselectortext)
      - [checkSelectorValue](#checkselectorvalue)
      - [getCookies](#getcookies)
      - [addCookies](#addcookies)
      - [clearCookies](#clearcookies)
      - [getLocalStorageItem](#getlocalstorageitem)
      - [setLocalStorageItem](#setlocalstorageitem)
      - [removeLocalStorageItem](#removelocalstorageitem)
      - [getSessionStorageItem](#getsessionstorageitem)
      - [setSessionStorageItem](#setsessionstorageitem)
      - [removeSessionStorageItem](#removesessionstorageitem)
      - [selectOption](#selectoption)
      - [getElement](#getelement)
      - [count](#count)
      - [checkCount](#checkcount)
      - [checkMinCount](#checkmincount)
      - [checkChecked](#checkchecked)

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

#### goto

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async goto(url: string): Promise<Response | null>;
```

- **Description:** Uses the page to navigate to the specified URL.
- **Parameters:**
  - `url` - The URL to access.
- **Returns:** `Promise<Response | null>` - Returns the main resource response.

#### reload

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async reload(): Promise<Response | null>;
```

- **Description:** Reload the current page.
- **Returns:** `Promise<Response | null>` - Returns the main resource response.

#### waitForLoadState

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async waitForLoadState(status: 'load' | 'domcontentloaded' | 'networkidle'): Promise<void>;
```

- **Description:** Waits for the specified loading state.
- **Parameters:**
  - `status` - The status to wait for. Allowed values: "load" | "domcontentloaded" | "networkidle".
- **Returns:** `Promise<void>` - Returns when the required load state has been reached.

#### hover

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async hover(selector: Selector, options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] }, frameTree?: FrameSelector[]): Promise<void>;
```

- **Description:** Uses the page mouse to hover over the specified element.
- **Parameters:**
  - `selector` - The selector of the element to hover over.
  - `options` - (optional) Advanced selector lookup options + Modifier keys to press. Ensures that only these modifiers are pressed during the operation.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<void>` - Returns when hovered over the element.

#### press

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async pressSequentially(selector: Selector, input: string, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void>;
```

- **Description:** Types the given input into the element specified by the selector.
- **Parameters:**
  - `selector` - The selector of the source element.
  - `input` - The input to type into the element.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<void>` - Returns when the key(s) have been pressed.

```typescript
public async press(input: string): Promise<void>;
```

- **Description:** Presses the specified key(s) on the keyboard.
- **Parameters:**
  - `input` - The key(s). Multiple keys can be pressed by concatenating with "+".
- **Returns:** `Promise<void>` - Returns when the key(s) have been pressed.

#### checkBox

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async checkBox(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void>;
```

- **Description:** Checks the specified checkbox.
- **Parameters:**
  - `selector` - The selector of the checkbox.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<void>` - Returns after checking the element.

#### waitForSelector

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async waitForSelector(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<Locator>;
```

- **Description:** Waits until the element of the specified selector exists.
- **Parameters:**
  - `selector` - The selector of the element.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<Locator>` - Returns a `Locator` promise.

#### dragAndDrop

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async dragAndDrop(sourceSelector: Selector, targetSelector: Selector, options?: { source?: SelectorOptions; target?: SelectorOptions; }, frameTree?: FrameSelector[]): Promise<void>;
```

- **Description:** Drags the specified source element to the specified target element and drops it.
- **Parameters:**
  - `sourceSelector` - The selector of the source element.
  - `targetSelector` - The selector of the target element.
  - `options` - (optional) Advanced selector lookup options for source and target.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<void>` - Returns after dragging the locator to another target locator or target position.

#### fill

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async fill(selector: Selector, input: string, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void>;
```

- **Description:** Fills the element specified by the selector with the given input.
- **Parameters:**
  - `selector` - The selector of the source element.
  - `input` - The input to fill the element with.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<void>` - Returns after checks, focuses the element, fills it, and triggers an `input` event after filling.

#### type

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async type(selector: Selector, input: string, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void>;
```

- **Description:** Types the given input into the element specified by the selector.
- **Parameters:**
  - `selector` - The selector of the source element.
  - `input` - The input to type into the element.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<void>` - Focuses the element and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

#### click

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async click(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void>;
```

- **Description:** Clicks the element specified by the selector.
- **Parameters:**
  - `selector` - The selector of the element to click.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<void>` - Returns after clicking the element.

#### dblclick

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async dblclick(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void>;
```

- **Description:** Double clicks the element specified by the selector.
- **Parameters:**
  - `selector` - The selector of the element to double click.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<void>` - Returns after double clicking the element.

#### checkVisibilityState

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async checkVisibilityState(selector: Selector, mode: 'visible' | 'hidden', options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<boolean>;
```

- **Description:** Validates if a locator on the page is visible or hidden.
- **Parameters:**
  - `selector` - The locator to search for.
  - `mode` - The expected property of the selector that needs to be checked, either visible (positive) or hidden (negative).
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<boolean>` - True if the element is visible/hidden as expected, false if the timeout was reached.

#### checkEnabledState

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async checkEnabledState(selector: Selector, mode: 'enabled' | 'disabled', options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<boolean>;
```

- **Description:** Validates if a locator on the page is enabled or disabled.
- **Parameters:**
  - `selector` - The locator to search for.
  - `mode` - The expected property of the selector that needs to be checked, either 'enabled' or 'disabled'.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<boolean>` - True if the element is enabled/disabled as expected, false if the timeout was reached.

#### checkSelectorText

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async checkSelectorText(selector: Selector, text: string | RegExp | (string | RegExp)[], mode: 'positive' | 'negative', options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<boolean>;
```

- **Description:** Validates if the given element has the given text or not.
- **Parameters:**
  - `selector` - The selector of the element to hover over.
  - `text` - The text to check.
  - `mode` - Whether to check if the element has (positive) or has not (negative) the specified text.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<boolean>` - True if the element has/doesn't have the specified text, false if the timeout was reached.

#### checkSelectorValue

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async checkSelectorValue(selector: Selector, value: string | RegExp, mode: 'positive' | 'negative', options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<boolean>;
```

- **Description:** Validates if the given element has the given input value or not.
- **Parameters:**
  - `selector` - The selector of the element to check.
  - `value` - The single value to check.
  - `mode` - Whether to check if the element has (positive) or has not (negative) the specified value.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<boolean>` - True if the element has/doesn't have the specified value, false if the timeout was reached.

#### getCookies

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async getCookies(urls?: string | string[] | undefined): Promise<Cookie[]>;
```

- **Description:** Get the cookies of the current browser context.
- **Parameters:**
  - `urls` - Affected URLs.
- **Returns:** `Promise<Cookie[]>` - Returns the cookies of the current browser context.

#### addCookies

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async addCookies(cookies: Cookie[]): Promise<void>;
```

- **Description:** Adds cookies into this browser context.
- **Parameters:**
  - `cookies` - Cookies to add at the browser context.
- **Returns:** `Promise<void>` - Returns after adding cookies into this browser context.

#### clearCookies

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async clearCookies(): Promise<void>;
```

- **Description:** Clears context cookies.
- **Returns:** `Promise<void>` - Clears context cookies.

#### getLocalStorageItem

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async getLocalStorageItem(key: string): Promise<any>;
```

- **Description:** Get a local storage item.
- **Parameters:**
  - `key` - The key that specifies the item.
- **Returns:** `Promise<any>` - Returns the local storage item.

#### setLocalStorageItem

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async setLocalStorageItem(key: string, value: any): Promise<void>;
```

- **Description:** Set a local storage item identified by the given key + value.
- **Parameters:**
  - `key` - The key that specifies the item.
  - `value` - The value to set.
- **Returns:** `Promise<void>` - Returns after adding the local storage item.

#### removeLocalStorageItem

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async removeLocalStorageItem(key: string): Promise<void>;
```

- **Description:** Delete a local storage item if a key/value pair with the given key exists.
- **Parameters:**
  - `key` - The key that specifies the item.
- **Returns:** `Promise<void>` - Returns after deleting a local storage item.

#### getSessionStorageItem

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async getSessionStorageItem(key: string): Promise<any>;
```

- **Description:** Get a session storage item.
- **Parameters:**
  - `key` - The key that specifies the item.
- **Returns:** `Promise<any>` - Retrieves a session storage item.

#### setSessionStorageItem

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async setSessionStorageItem(key: string, value: any): Promise<void>;
```

- **Description:** Set a session storage item identified by the given key + value.
- **Parameters:**
  - `key` - The key that specifies the item.
  - `value` - The value to set.
- **Returns:** `Promise<void>` - Set the session storage item.

#### removeSessionStorageItem

> DEPRECATED - Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.

```typescript
public async removeSessionStorageItem(key: string): Promise<void>;
```

- **Description:** Delete a session storage item if a key/value pair with the given key exists.
- **Parameters:**
  - `key` - The key that specifies the item.
- **Returns:** `Promise<void>` - Returns after removing a session storage item.

#### selectOption

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async selectOption(selector: Selector, option: string | { value?: string, label?: string, index?: number }, selectorOptions?: SelectorOptions, frameTree?: FrameSelector[]): Promise<any>;
```

- **Description:** Set the value of a Selector of type select to the given option.
- **Parameters:**
  - `selector` - The string representing the (select) selector.
  - `option` - The label of the option or an object with properties `value`, `label`, or `index`.
  - `selectorOptions` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<any>` - Returns the array of option values that have been successfully selected.

#### getElement

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async getElement(selector: Selector, singular?: boolean, selectorOptions?: SelectorOptions): Promise<any>;
```

- **Description:** Get a single screen element or list of screen elements.
- **Parameters:**
  - `selector` - The selector.
  - `singular` - optional `true` or `false`. Defaults to `true`.
  - `selectorOptions` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<Locator | Locator[]>` - Returns a single screen element or a list of screen elements depending on the singular input parameter.

#### count

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async count(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<number>;
```

- **Description:** Counts screen elements which can be found via a selector.
- **Parameters:**
  - `selector` - The selector.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<number>` - Promise of number of counted elements

#### checkCount

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async checkCount(selector: Selector, count: number, mode: 'positive' | 'negative',  options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<number>;
```

- **Description:** Validate if the given element has the given count.
- **Parameters:**
  - `selector` - The selector.
  - `count` - The desired count.
  - `mode` - Whether to check if the element has (positive) or has not (negative) the specified count.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<true>` - Promise of true if evaluation met, else exception.

#### checkMinCount

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async checkMinCount(selector: Selector, count: number, mode: 'positive' | 'negative',  options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<number>;
```

- **Description:** Validate if the given element has the given minimum count.
- **Parameters:**
  - `selector` - The selector.
  - `count` - The desired minimum count.
  - `mode` - Whether to check if the element has (positive) or has not (negative) the specified minimum count.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<true>` - Promise of true if evaluation met, else exception.

#### checkChecked

> DEPRECATED - Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.

```typescript
public async checkChecked(selector: Selector, mode: 'positive' | 'negative',  options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<number>;
```

- **Description:** Validate if the given element is checked.
- **Parameters:**
  - `selector` - The selector.
  - `mode` - Whether to check if the element is (positive) or is not (negative) checked.
  - `options` - (optional) Advanced selector lookup options.
  - `frameTree` - An array of frame selector(s).
- **Returns:** `Promise<true>` - Promise of true if evaluation met, else exception.

[Back to overview](../../screenplay_elements.md)
