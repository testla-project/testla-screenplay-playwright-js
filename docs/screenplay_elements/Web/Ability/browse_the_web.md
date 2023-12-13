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
      - [goto](#goto)
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
public static as(actor: Actor): BrowseTheWeb;
```

- **Description:** Uses this ability as an actor.
- **Parameters:**
  - `actor` - The actor using this ability.
- **Returns:** `BrowseTheWeb` - The ability to use BrowseTheWeb as the actor.

#### getPage

```typescript
public getPage(): Page;
```

- **Description:** Gets the page object.
- **Returns:** `Page` - The page object.

#### goto

```typescript
public async goto(url: string): Promise<Response | null>;
```

- **Description:** Uses the page to navigate to the specified URL.
- **Parameters:**
  - `url` - The URL to access.
- **Returns:** `Promise<Response | null>` - Returns the main resource response.

#### waitForLoadState

```typescript
public async waitForLoadState(status: 'load' | 'domcontentloaded' | 'networkidle'): Promise<void>;
```

- **Description:** Waits for the specified loading state.
- **Parameters:**
  - `status` - The status to wait for. Allowed values: "load" | "domcontentloaded" | "networkidle".
- **Returns:** `Promise<void>` - Returns when the required load state has been reached.

#### hover

```typescript
public async hover(selector: Selector, options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] }): Promise<void>;
```

- **Description:** Uses the page mouse to hover over the specified element.
- **Parameters:**
  - `selector` - The selector of the element to hover over.
  - `options` - (optional) Advanced selector lookup options + Modifier keys to press. Ensures that only these modifiers are pressed during the operation.
- **Returns:** `Promise<void>` - Returns when hovered over the element.

#### press

```typescript
public async pressSequentially(selector: Selector, input: string, options?: SelectorOptions): Promise<void>;
```

- **Description:** Presses the specified key(s) sequentially on the keyboard.
- **Parameters:**
  - `selector` - The selector of the source element.
  - `input` - The key(s). Multiple keys can be pressed by concatenating with "+".
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<void>` - Returns when the key(s) have been pressed.


```typescript
public async press(input: string): Promise<void>;
```

- **Description:** Presses the specified key(s) on the keyboard.
- **Parameters:**
  - `input` - The key(s). Multiple keys can be pressed by concatenating with "+".
- **Returns:** `Promise<void>` - Returns when the key(s) have been pressed.

#### checkBox

```typescript
public async checkBox(selector: Selector, options?: SelectorOptions): Promise<void>;
```

- **Description:** Checks the specified checkbox.
- **Parameters:**
  - `selector` - The selector of the checkbox.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<void>` - Returns after checking the element.

#### waitForSelector

```typescript
public async waitForSelector(selector: Selector, options?: SelectorOptions): Promise<Locator>;
```

- **Description:** Waits until the element of the specified selector exists.
- **Parameters:**
  - `selector` - The selector of the element.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<Locator>` - Returns a `Locator` promise.

#### dragAndDrop

```typescript
public async dragAndDrop(sourceSelector: Selector, targetSelector: Selector, options?: { source?: SelectorOptions; target?: SelectorOptions; }): Promise<void>;
```

- **Description:** Drags the specified source element to the specified target element and drops it.
- **Parameters:**
  - `sourceSelector` - The selector of the source element.
  - `targetSelector` - The selector of the target element.
  - `options` - (optional) Advanced selector lookup options for source and target.
- **Returns:** `Promise<void>` - Returns after dragging the locator to another target locator or target position.

#### fill

```typescript
public async fill(selector: Selector, input: string, options?: SelectorOptions): Promise<void>;
```

- **Description:** Fills the element specified by the selector with the given input.
- **Parameters:**
  - `selector` - The selector of the source element.
  - `input` - The input to fill the element with.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<void>` - Returns after checks, focuses the element, fills it, and triggers an `input` event after filling.

#### type

```typescript
public async type(selector: Selector, input: string, options?: SelectorOptions): Promise<void>;
```

- **Description:** Types the given input into the element specified by the selector.
- **Parameters:**
  - `selector` - The selector of the source element.
  - `input` - The input to type into the element.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<void>` - Focuses the element and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

#### click

```typescript
public async click(selector: Selector, options?: SelectorOptions): Promise<void>;
```

- **Description:** Clicks the element specified by the selector.
- **Parameters:**
  - `selector` - The selector of the element to click.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<void>` - Returns after clicking the element.

#### dblclick

```typescript
public async dblclick(selector: Selector, options?: SelectorOptions): Promise<void>;
```

- **Description:** Double clicks the element specified by the selector.
- **Parameters:**
  - `selector` - The selector of the element to double click.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<void>` - Returns after double clicking the element.

#### checkVisibilityState

```typescript
public async checkVisibilityState(selector: Selector, mode: 'visible' | 'hidden', options?: SelectorOptions): Promise<boolean>;
```

- **Description:** Validates if a locator on the page is visible or hidden.
- **Parameters:**
  - `selector` - The locator to search for.
  - `mode` - The expected property of the selector that needs to be checked, either 'visible' or 'hidden'.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<boolean>` - True if the element is visible/hidden as expected, false if the timeout was reached.

#### checkEnabledState

```typescript
public async checkEnabledState(selector: Selector, mode: 'enabled' | 'disabled', options?: SelectorOptions): Promise<boolean>;
```

- **Description:** Validates if a locator on the page is enabled or disabled.
- **Parameters:**
  - `selector` - The locator to search for.
  - `mode` - The expected property of the selector that needs to be checked, either 'enabled' or 'disabled'.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<boolean>` - True if the element is enabled/disabled as expected, false if the timeout was reached.

#### checkSelectorText

```typescript
public async checkSelectorText(selector: Selector, text: string | RegExp | (string | RegExp)[], mode: 'has' | 'hasNot', options?: SelectorOptions): Promise<boolean>;
```

- **Description:** Validates if the given element has the given text or not.
- **Parameters:**
  - `selector` - The selector of the element to hover over.
  - `text` - The text to check.
  - `mode` - Whether to check if the element 'has' or 'hasNot' the specified text.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<boolean>` - True if the element has/doesn't have the specified text, false if the timeout was reached.

#### checkSelectorValue

```typescript
public async checkSelectorValue(selector: Selector, value: string | RegExp, mode: 'has' | 'hasNot', options?: SelectorOptions): Promise<boolean>;
```

- **Description:** Validates if the given element has the given input value or not.
- **Parameters:**
  - `selector` - The selector of the element to hover over.
  - `value` - The single value to check.
  - `mode` - Whether to check if the element 'has' or 'hasNot' the specified value.
  - `options` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<boolean>` - True if the element has/doesn't have the specified value, false if the timeout was reached.

#### getCookies

```typescript
public async getCookies(urls?: string | string[] | undefined): Promise<Cookie[]>;
```

- **Description:** Get the cookies of the current browser context.
- **Parameters:**
  - `urls` - Affected URLs.
- **Returns:** `Promise<Cookie[]>` - Returns the cookies of the current browser context.

#### addCookies

```typescript
public async addCookies(cookies: Cookie[]): Promise<void>;
```

- **Description:** Adds cookies into this browser context.
- **Parameters:**
  - `cookies` - Cookies to add at the browser context.
- **Returns:** `Promise<void>` - Returns after adding cookies into this browser context.

#### clearCookies

```typescript
public async clearCookies(): Promise<void>;
```

- **Description:** Clears context cookies.
- **Returns:** `Promise<void>` - Clears context cookies.

#### getLocalStorageItem

```typescript
public async getLocalStorageItem(key: string): Promise<any>;
```

- **Description:** Get a local storage item.
- **Parameters:**
  - `key` - The key that specifies the item.
- **Returns:** `Promise<any>` - Returns the local storage item.

#### setLocalStorageItem

```typescript
public async setLocalStorageItem(key: string, value: any): Promise<void>;
```

- **Description:** Set a local storage item identified by the given key + value.
- **Parameters:**
  - `key` - The key that specifies the item.
  - `value` - The value to set.
- **Returns:** `Promise<void>` - Returns after adding the local storage item.

#### removeLocalStorageItem

```typescript
public async removeLocalStorageItem(key: string): Promise<void>;
```

- **Description:** Delete a local storage item if a key/value pair with the given key exists.
- **Parameters:**
  - `key` - The key that specifies the item.
- **Returns:** `Promise<void>` - Returns after deleting a local storage item.

#### getSessionStorageItem

```typescript
public async getSessionStorageItem(key: string): Promise<any>;
```

- **Description:** Get a session storage item.
- **Parameters:**
  - `key` - The key that specifies the item.
- **Returns:** `Promise<any>` - Retrieves a session storage item.

#### setSessionStorageItem

```typescript
public async setSessionStorageItem(key: string, value: any): Promise<void>;
```

- **Description:** Set a session storage item identified by the given key + value.
- **Parameters:**
  - `key` - The key that specifies the item.
  - `value` - The value to set.
- **Returns:** `Promise<void>` - Set the session storage item.

#### removeSessionStorageItem

```typescript
public async removeSessionStorageItem(key: string): Promise<void>;
```

- **Description:** Delete a session storage item if a key/value pair with the given key exists.
- **Parameters:**
  - `key` - The key that specifies the item.
- **Returns:** `Promise<void>` - Returns after removing a session storage item.

#### selectOption

```typescript
public async selectOption(selector: Selector, option: string | { value?: string, label?: string, index?: number }, selectorOptions?: SelectorOptions): Promise<any>;
```

- **Description:** Set the value of a Selector of type select to the given option.
- **Parameters:**
  - `selector` - The string representing the (select) selector.
  - `option` - The label of the option or an object with properties `value`, `label`, or `index`.
  - `selectorOptions` - (optional) Advanced selector lookup options.
- **Returns:** `Promise<any>` - Returns the array of option values that have been successfully selected.

[Back to overview](../../screenplay_elements.md)