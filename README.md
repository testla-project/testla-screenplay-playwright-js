# Testla Screenplay-Playwright

## Introduction

The testla project is a collection of tools of different tools to help in the QA automation process.
This package uses the [Testla screenplay core package](https://www.npmjs.com/package/@testla/screenplay) to implement the screenplay pattern for Playwright.

## How to use this package?

This package comes with 1 ability, 1 question and 10 actions already implemented:

### Ability - BrowseTheWeb

| Methods | Parameter | Type | Description |
| ------- | --------- | ---- | ----------- |
| as | actor | Actor | Use the Ability as an Actor |
| using | page | Page | Initialize this Ability by passing an already existing Playwright Page object |
| checkBox | selector | string | Check the specified checkbox | 
| click | selector, hasText (optional) | string, string | Click the element specified by the selector |
| dbclick | selector, hasText (optional) | string, string | Double click the element specified by the selector |
| dragAndDrop | sourceSelector, targetSelector | string, string | Drag the specified source element to the specified target element and drop it |
| fill | selector, input | string, string | Fill the element specified by the selector with the given input | 
| findLocator | selector | string | Find a locator on the page by its selector |
| goto | url | string | Use the page to navigate to the specific url |
| hover | selector, modifiers (optional) | string, ('Alt' \| 'Control' \| 'Meta' \| 'Shift')[] | Use the page mouse to hover over the specified element |
| isEnabled | selector | string | Validate a locator on the page is enabled |
| isVisible | selector | string | Validate a locator on the page is visible |
| press | input | string | Press the specified key(s) on the keyboard |
| type | selector, input | string, string | Type the given input into the element specified by the selector |
| waitForLoadState | status | 'load' \| 'domcontentloaded' \| 'networkidle' | Wait for the specified loading state |
| waitForSelector | selector | string | Wait until the element of the specified selector exists |

### Initialize the Actor and the Ability
```js
const actor = Actor.named('James')
            .with('username', 'John Doe')
            .with('password', 'MySecretPassword');
            .can(BrowseTheWeb.using(page));
``` 
 
### Available Actions

```js
// Check a checkbox specified by a selector string
Check.element('mySelector');
Check.element('mySelector', 'myText');

// Click on an element specified by a selector string 
Click.on('mySelector');
Click.on('mySelector', 'withText');

// Double click on an element specified by a selector string
DoubleClick.on('mySelector'); 
DoubleClick.on('mySelector', 'withText');

// DragAndDrop an element specified by a selector string and drop it on an element specified by another selector string
DragAndDrop.execute('sourceSelector', 'targetSelector');

// Fill an element specified by a selector string with the specified input
Fill.in('mySelector', 'myInput');

// Hover over an element specified by a selector string
Hover.over('mySelector', ('Alt' | 'Control' | 'Meta' | 'Shift')[]);

// Press the specified key on the keyboard
Keyboard.press('myKeys');

// Navigate to a URL using the specified url string
Navigate.to('myUrl');

// Type specified input into an element specified by a selector string
Type.in('mySelector', 'myInput');

// Wait for either a specified loading state or for a selector to become visible/active
Wait.forLoadState(state: 'load' | 'domcontentloaded' | 'networkidle');
Wait.forSelector('mySelector');
```

### Use Actions in a task

Tasks group actions into logical entities. Here is a task that uses the actions Navigate, Fill and Click.

```js
import {
    Actor, Task, Click, Fill, Navigate, Wait,
} from '@testla/screenplay-playwright';

class Login extends Task {
    public async performAs(actor: Actor): Promise<void> {
        return actor.attemptsTo(
            Navigate.to('https://www.my-fancy-url.com'),
            Fill.with('#username', actor.states('username') || ''),
            Fill.with('#password', actor.states('password') || ''),
            Click.on('#login-button'),
        );
    }

    public static toApp(): Login {
        return new Login();
    }
}
```

### Available Question - Status

```js
// Get a specified state for a selector like visible or enabled
Status.isVisible('mySelector');
Status.isEnabled('mySelector');
```

### Define a test case

The final step is to define a test case using the Task defined above.

```js
import { Actor, BrowseTheWeb } from '@testla/screenplay-playwright';

// Example test case with Playwright
test.describe('My Test', () => {
    test('My first test', async ({ page }) => {
        const actor = Actor.named('James')
            .with('username', 'John Doe')
            .with('password', 'MySecretPassword');
            .can(BrowseTheWeb.using(page));

        // Execute the task Login - with defined Actions
        await actor.attemptsTo(Login.toApp());

        // Check if the login was successful - use the Status question
        expect(await actor.asks(Status.isEnabled('#logged-in-indicator'))).toBe(true);
    });
});
```

[However, you can of course define your own actions, abilities and questions.](https://www.npmjs.com/package/@testla/screenplay#define-an-ability) 
