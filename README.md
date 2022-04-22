# Testla Screenplay-Playwright

## Introduction

The testla project is a collection of tools of different tools to help in the QA automation process.
This package uses the [Testla screenplay core package](https://www.npmjs.com/package/@testla/screenplay) to implement the screenplay pattern for Playwright.

## How to use this package?

This package comes with 1 ability, 1 question and 10 actions already implemented:

### Ability - BrowseTheWeb

#### as(actor: Actor)
Use the Ability as an Actor. Used by Actions to get access to the ability functions. For examples see below.

#### using(page: Page)
Initialize this Ability by passing an already existing Playwright Page object.

#### checkBox(selector: string, options?: SelectorOptions)
Check the specified checkbox.
```js
BrowseTheWeb.as(actor).checkBox('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### click(selector: string, options?: SelectorOptions)
Click the element specified by the selector.
```js
BrowseTheWeb.as(actor).click('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### dbclick(selector: string, options?: SelectorOptions)
Double Click the element specified by the selector.
```js
BrowseTheWeb.as(actor).dbclick('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### dragAndDrop(sourceSelector: string, targetSelector: string, options? options?: { source?: SelectorOptions, target?: SelectorOptions })
Drag the specified source element to the specified target element and drop it.
```js
BrowseTheWeb.as(actor).dragAndDrop('sourceSelector', 'targetSelector', {
    source: { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]},
    target: { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]}
});
```

#### fill(selector: string, input: string, options?: SelectorOptions)
Fill the element specified by the selector with the given input.
```js
BrowseTheWeb.as(actor).fill('mySelector', 'myInput', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### goto(url: string)
Use the page to navigate to the specified url.
```js
BrowseTheWeb.as(actor).goto('myURL');
```

#### hover(selector: string, options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] })
Use the page mouse to hover over the specified element.
```js
BrowseTheWeb.as(actor).hover('mySelector', {
    hasText: 'myText',
    subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
    modifiers: ['Alt', 'Shift']
}); 
```

#### isEnabled(selector: string, options?: SelectorOptions)
Verify if a locator on the page is enabled.
```js
BrowseTheWeb.as(actor).isEnabled('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### isVisible(selector: string, options?: SelectorOptions)
Verify if a locator on the page is visible.
```js
BrowseTheWeb.as(actor).isVisible('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### press(input: string)
Press the specified key(s) on the keyboard.
```js
BrowseTheWeb.as(actor).press('myKeys');
```

#### type(selector: string, input: string, options?: SelectorOptions)
Type the given input into the element specified by the selector.
```js
BrowseTheWeb.as(actor).type('mySelector', 'myInput', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### waitForLoadState(status: 'load' | 'domcontentloaded' | 'networkidle')
Wait for the specified loading state.
```js
BrowseTheWeb.as(actor).waitForLoadState('networkidle');
```

#### waitForSelector(selector: string, options?: SelectorOptions)
Wait until the element of the specified selector exists.
```js
BrowseTheWeb.as(actor).waitForSelector('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

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
Check.element('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});

// Click on an element specified by a selector string 
Click.on('mySelector');
Click.on('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});

// Double click on an element specified by a selector string
DoubleClick.on('mySelector'); 
DoubleClick.on('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});

// DragAndDrop an element specified by a selector string and drop it on an element specified by another selector string
DragAndDrop.execute('sourceSelector', 'targetSelector');
DragAndDrop.execute('sourceSelector', 'targetSelector', {
    source: { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]},
    target: { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]}
});

// Fill an element specified by a selector string with the specified input
Fill.in('mySelector', 'myInput');
Fill.in('mySelector', 'myInput', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});

// Hover over an element specified by a selector string
Hover.over('mySelector');
Hover.over('mySelector', {
    hasText: 'myText',
    subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
    modifiers: ['Alt', 'Shift']
}); 

// Press the specified key on the keyboard
Press.key('myKeys');

// Navigate to a URL using the specified url string
Navigate.to('myUrl');

// Type specified input into an element specified by a selector string
Type.in('mySelector', 'myInput');
Type.in('mySelector', 'myInput', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});

// Wait for either a specified loading state or for a selector to become visible/active
Wait.forLoadState(state: 'load' | 'domcontentloaded' | 'networkidle');
Wait.forSelector('mySelector');
Wait.forSelector('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
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

### Available Question - Element

```js
// Get a specified state for a selector like visible or enabled
Element.isVisible('mySelector');
Element.isVisible('mySelector', {
    hasText: 'myText',
    subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
    wait: false // false means that the selector has to be available without any wait time.
});

Element.isEnabled('mySelector');
Element.isEnabled('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

### Define a test case

The final step is to define a test case using the Task defined above.

```js
import { Actor, BrowseTheWeb, Element, Login } from '@testla/screenplay-playwright';

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
        expect(await actor.asks(Element.isEnabled('#logged-in-indicator'))).toBe(true);
    });
});
```

[However, you can of course define your own actions, abilities and questions. See our core package:](https://www.npmjs.com/package/@testla/screenplay) 
