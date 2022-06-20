# Testla Screenplay-Playwright

## Introduction

The testla project is a collection of tools of different tools to help in the QA automation process.
This package uses the [Testla screenplay core package](https://www.npmjs.com/package/@testla/screenplay) to implement the screenplay pattern for Playwright.

## How to use this package?

Testla Screenplay-Playwright comes with abilities, question and actions to browse user interfaces and querying APIs.

### BrowseTheWeb Ability

This ability enables the actor to interact with the browser and browse web user interfaces.

#### using(page: Page)

Initializes the Ability by passing a Playwright Page object.

#### as(actor: Actor)

Use the Ability as an Actor. Required by Actions to get access to the ability functions. Examples can be found below.

#### checkBox(selector: string, options?: SelectorOptions)

Check the specified checkbox.

```js
// simple call with just selector
BrowseTheWeb.as(actor).checkBox('mySelector');
// or with options
BrowseTheWeb.as(actor).checkBox('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### click(selector: string, options?: SelectorOptions)

Click the element specified by the selector.

```js
// simple call with just selector
BrowseTheWeb.as(actor).click('mySelector');
// or with options
BrowseTheWeb.as(actor).click('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### dblclick(selector: string, options?: SelectorOptions)

Double Click the element specified by the selector.

```js
// simple call with just selector
BrowseTheWeb.as(actor).dblclick('mySelector');
// or with options
BrowseTheWeb.as(actor).dblclick('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### dragAndDrop(sourceSelector: string, targetSelector: string, options?: { source?: SelectorOptions, target?: SelectorOptions })

Drag the specified source element to the specified target element and drop it.

```js
// simple call with just source and target selector
BrowseTheWeb.as(actor).dragAndDrop('sourceSelector', 'targetSelector');
// or with options
BrowseTheWeb.as(actor).dragAndDrop('sourceSelector', 'targetSelector', {
    source: { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]},
    target: { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]}
});
```

#### fill(selector: string, input: string, options?: SelectorOptions)

Fill the element specified by the selector with the given input.

```js
// simple call with just selector and input value
BrowseTheWeb.as(actor).fill('mySelector', 'myInput');
// or with options
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
// simple call with just selector
BrowseTheWeb.as(actor).hover('mySelector');
// or with options
BrowseTheWeb.as(actor).hover('mySelector', {
    hasText: 'myText',
    subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
    modifiers: ['Alt', 'Shift']
});
```

#### isEnabled(selector: string, options?: SelectorOptions)

Verify if a locator on the page is enabled.

```js
// simple call with just selector
BrowseTheWeb.as(actor).isEnabled('mySelector');
// or with options
BrowseTheWeb.as(actor).isEnabled('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### isVisible(selector: string, options?: SelectorOptions)

Verify if a locator on the page is visible.

```js
// simple call with just selector
BrowseTheWeb.as(actor).isVisible('mySelector');
// or with options
BrowseTheWeb.as(actor).isVisible('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### press(keys: string)

Press the specified key(s) on the keyboard.

```js
// Press a single button
BrowseTheWeb.as(actor).press('A');
// or multiple buttons
BrowseTheWeb.as(actor).press('Control+A');
```

#### type(selector: string, input: string, options?: SelectorOptions)

Type the given input into the element specified by the selector.

```js
// simple call with just selector and input value
BrowseTheWeb.as(actor).type('mySelector', 'myInput');
// or with options
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
// simple call with just selector
BrowseTheWeb.as(actor).waitForSelector('mySelector');
// or with options
BrowseTheWeb.as(actor).waitForSelector('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```
 
### Web Actions

#### Check.element(selector: string, options?: SelectorOptions)

Checks a checkbox

```js
// simple call with just selector
Check.element('mySelector');
// or with options
Check.element('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```
#### Click.on(selector: string, options?: SelectorOptions)

Click an element

```js
// simple call with just selector
Click.on('mySelector');
// or with options
Click.on('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### DoubleClick.on(selector: string, options?: SelectorOptions)

Doubleclick an element

```js
// simple call with just selector
DoubleClick.on('mySelector');
// or with options
DoubleClick.on('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### DragAndDrop.execute(sourceSelector: string, targetSelector: string, options?: { source?: SelectorOptions, target?: SelectorOptions })

Drag an element specified by the source selector and drop it at the target selector

```js
// simple call with just selector
DragAndDrop.execute('sourceSelector', 'targetSelector');
// or with options
DragAndDrop.execute('sourceSelector', 'targetSelector', {
    source: { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]},
    target: { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]}
});
```

#### Fill.in(selector: string, value: string, options?: SelectorOptions)

Fill a given string into an input element

```js
// simple call with just selector
Fill.in('mySelector', 'myInput');
// or with options
Fill.in('mySelector', 'myInput', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### Hover.over(selector: string, options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] })

Hover an element

```js
// simple call with just selector
Hover.over('mySelector');
// or with options
Hover.over('mySelector', {
    hasText: 'myText',
    subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
    modifiers: ['Alt', 'Shift']
}); 
```

#### Press.key(keys: string)

Press key(s) on the keyboard

```js
// single key
Press.key('A');
// multiple keys
Press.key('Control+A')
```

#### Navigate.to(url: string)

Use the browser page to navigate to a specified url

```js
Navigate.to('myUrl');
```

#### Type.in(selector: string, value: string, options?: SelectorOptions)

Type a given string into an input element

```js
// simple call with just selector
Type.in('mySelector', 'myInput');
// or with options
Type.in('mySelector', 'myInput', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### Wait.forLoadState(state: 'load' | 'domcontentloaded' | 'networkidle')

Wait for a load state to be present

```js
Wait.forLoadState(state: 'load' | 'domcontentloaded' | 'networkidle');
```

#### Wait.forSelector(selector: string, value: string, options?: SelectorOptions)

Wait for an element to be present

```js
// simple call with just selector
Wait.forSelector('mySelector');
// or with options
Wait.forSelector('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

### UseAPI Ability

This ability enables the actor to interact with APIs by sending http requests.

#### as(actor: Actor)

Use the Ability as an Actor. Used by Actions to get access to the ability functions. Examples can be found below.

#### using(requestContext: APIRequestContext)

Initialize this Ability by passing an already existing Playwright APIRequestContext object.

#### sendRequest(method: RequestMethod, url: string, headers?: any, responseFormat?: ResponseBodyFormat, data?: any)

Send a request (GET, POST, PATCH, PUT, HEAD or DELETE) to the specified url. Headers, a desired format for the response's body and data can also be sent.

```js
UseApi.as(actor).sendRequest(REQUEST_METHOD.POST, '/items', { authorization: 'Bearer dfh.dasgeq65qg.eyjkhf' }, 'json', { title: 'new item' });
```

#### checkStatus(response: Response, status: number)

Verify if the given response's status is equal to the expected status.

```js
UseApi.as(actor).checkStatus(response, 200);
```

#### checkBody(response: Response, body: ResponseBodyFormat)

Verify if the given response's body is equal to the expected body. The check includes type safety.

```js
// json response
UseApi.as(actor).checkBody(response, { text: 'test' });
// text response
UseApi.as(actor).checkBody(response, 'test');
// buffer response
UseApi.as(actor).checkBody(response, Buffer.from('abc'));
```

#### checkHeaders(response: Response, headers: {[key: string]: string | undefined })

Verify if the given headers are included in the given response's headers. 
If the header has a value !== undefined, both key and value will be checked. If a header has a value === undefined, only the key will be checked.

```js
// check only keys
UseApi.as(actor).checkHeaders(response, { contentType: undefined });
// check key and value
UseApi.as(actor).checkHeaders(response, { contentType: 'application/json' });
```

#### checkDuration(response: Response, duration: number)

Verify if the reponse (including receiving body) was received within a given duration.

```js
// check if response was received within 2s
UseApi.as(actor).checkDuration(response, 2000);
```

### API Actions

#### Delete.from(url: string)

Sends a DELETE request to the api. Optionally it is possible to chain definitions for headers and data as well as the expected response type.

```js
// simple request
Delete.from('https://my-fancy-url.com');
// with chained definitions
Delete.from('https://my-fancy-url.com')
    // add headers
    .withHeaders({
        key: value,
    })
    // add data
    .withData({
        key: value,
    })
    // define expected response format
    .withResponseFormat('text');
```

#### Get.from(url: string)

Sends a GET request to the api. Optionally it is possible to chain definitions for headers as well as the expected response type.

```js
// simple request
Get.from('https://my-fancy-url.com');
// with chained definitions
Get.from('https://my-fancy-url.com')
    // add headers
    .withHeaders({
        key: value,
    })
    // define expected response format
    .withResponseFormat('text');
```

#### Head.from(url: string)

Sends a HEAD request to the api. Optionally it is possible to chain definitions for headers as well as the expected response type.

```js
// simple request
Head.from('https://my-fancy-url.com');
// with chained definitions
Head.from('https://my-fancy-url.com')
    // add headers
    .withHeaders({
        key: value,
    })
    // define expected response format
    .withResponseFormat('text');
```

#### Patch.to(url: string)

Sends a PATCH request to the api. Optionally it is possible to chain definitions for header sand data as well as the expected response type.

```js
// simple request
Patch.to('https://my-fancy-url.com');
// with chained definitions
Patch.to('https://my-fancy-url.com')
    // add headers
    .withHeaders({
        key: value,
    })
    // add data
    .withData({
        key: value,
    })
    // define expected response format
    .withResponseFormat('text');
```

#### Post.to(url: string)

Sends a POST request to the api. Optionally it is possible to chain definitions for header sand data as well as the expected response type.

```js
// simple request
Post.to('https://my-fancy-url.com');
// with chained definitions
Post.to('https://my-fancy-url.com')
    // add headers
    .withHeaders({
        key: value,
    })
    // add data
    .withData({
        key: value,
    })
    // define expected response format
    .withResponseFormat('text');
```

#### Put.to(url: string)

Sends a Put request to the api. Optionally it is possible to chain definitions for header sand data as well as the expected response type.

```js
// simple request
Put.to('https://my-fancy-url.com');
// with chained definitions
Put.to('https://my-fancy-url.com')
    // add headers
    .withHeaders({
        key: value,
    })
    // add data
    .withData({
        key: value,
    })
    // define expected response format
    .withResponseFormat('text');
```

### Available Web Questions

#### Element.isVisible(selector: string, options?: SelectorOptions & { wait?: boolean })

Validates weather an element is visible or not. By default it is waited for this event to happen btu limited by the global playwright timeout settings.
By settings wait to false in the options section this can be overridden.

```js
// simple call with just selector
Element.isVisible('mySelector');
// or with options
Element.isVisible('mySelector', {
    hasText: 'myText',
    subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
    wait: false // false means that the selector has to be available without any wait time.
});
```

#### Element.isEnabled(selector: string, options?: SelectorOptions)

Validates weather an element is enabled or not.

```js
// simple call with just selector
Element.isEnabled('mySelector');
// or with options
Element.isEnabled('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

### Available Api Questions

#### Response.hasStatusCode(response: Response, code: number)

Checks if the response has a given status code.

```js
Response.hasStatusCode(response, 200);
```

#### Response.bodyEquals(response: Response, body: ResponseBodyType)

Checks if the response equals a given body.

```js
// json format
Response.bodyEquals(response, { key: value });
// text format
Response.bodyEquals(response, 'text' );
// buffer format
Response.bodyEquals(response, Buffer.from('abc') );
```

#### Response.hasHeaders(response: Response, headers: Headers)

Checks if the response holds the given headers either by key (value to be set to undefined) or key/value lookup.

```js
// only check for header presence by passing undefined as the value
Response.hasHeaders(response, { 'content-type': undefined });
// lookup for key/value combination to be present
Response.hasHeaders(response, { 'content-type': 'application/json' });
```

#### Response.wasReceivedWithin(response: Response, duration: number)

Checks if the reponse (including receiving body) was received within a given duration.

```js
// check if response was received within 2s
Response.wasReceivedWithin(response, 2000);
```

### Group Actions into a Task

Tasks group actions into logical entities. Here is a task that uses the actions Navigate, Fill and Click from the web capabilities and Get from api capabilities.

```js
// file: ./task/Login.ts

import {
    Actor, Task, Click, Fill, Navigate, Wait,
} from '@testla/screenplay-playwright';

export class Login extends Task {
    public async performAs(actor: Actor): Promise<void> {
        return actor.attemptsTo(
            Navigate.to('https://www.my-fancy-url.com'),
            Fill.with('#username', actor.states('username') || ''),
            Fill.with('#password', actor.states('password') || ''),
            Click.on('#login-button'),
            Get.from('https://www.my-fancy-url.com')
        );
    }

    public static toApp(): Login {
        return new Login();
    }
}
```

### Initialize Actor with Abilities

Initialize an actor with abilities for later use in a test case.

```js
const actor = Actor.named('James')
            .with('username', 'John Doe')
            .with('password', 'MySecretPassword');
            .can(BrowseTheWeb.using(page))
            .can(UseAPI.using(request));
``` 

### Test case example

The final step is to define a test case using the Task defined above.

```js
import { Actor, BrowseTheWeb, Element } from '@testla/screenplay-playwright';
import { Login } from './task/Login';

// Example test case with Playwright
test.describe('My Test', () => {
    test('My first test', async ({ page, request }) => {
        const actor = Actor.named('James')
            .with('username', 'John Doe')
            .with('password', 'MySecretPassword');
            .can(BrowseTheWeb.using(page))
            .can(UseAPI.using(request));

        // Execute the task Login - as defined further above
        await actor.attemptsTo(Login.toApp());

        // Check if the login was successful - use the status question from the web package
        expect(await actor.asks(Element.isVisible('#logged-in-indicator'))).toBe(true);
    });
});
```

Besides the existing actions, abilities and questions it is of course possible to define your own ones. How this is done, please refer to our [core package](https://www.npmjs.com/package/@testla/screenplay).

Since tasks, actions and questions return promises, we advise to make use of the [require-await](https://eslint.org/docs/rules/require-await) rule in case of using eslint. This will help to prevent unexpected behavior when forgetting to await tasks/actions or questions.
