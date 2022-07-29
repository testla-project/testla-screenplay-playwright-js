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

#### addCookies(cookies: Cookie[])

Add cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via BrowseTheWeb.getCookies([urls]).

```js
BrowseTheWeb.as(actor).addCookies([{
    name: 'my cookie',
    value: 'my value',
    url: 'http://www.myapp.com',
}]);
```

#### checkBox(selector: string, options?: SelectorOptions)

Check the specified checkbox.

```js
// simple call with just selector
BrowseTheWeb.as(actor).checkBox('mySelector');
// or with options
BrowseTheWeb.as(actor).checkBox('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### clearCookies()

Clear the browser context cookies.

```js
BrowseTheWeb.as(actor).clearCookies();
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

#### getCookies(urls?: string | string[])

Get the cookies of the current browser context. If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.

```js
// get all cookies
BrowseTheWeb.as(actor).getCookies();
// get cookies for one single domain
BrowseTheWeb.as(actor).getCookies('https:www.myapp.com');
// get cookies for two domains
BrowseTheWeb.as(actor).getCookies(['https:www.myapp.com', 'https:www.another-app.com']);
```

#### getLocalStorageItem(key: string)

Get a local storage item specified by the given key.

```js
BrowseTheWeb.as(actor).getLocalStorageItem('some key');
```

#### getSessionStorageItem(key: string)

Get a session storage item specified by given key.

```js
BrowseTheWeb.as(actor).getSessionStorageItem('some key');
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

#### checkEnabledState(selector: string, mode: 'enabled' | 'disabled', options?: SelectorOptions, timeout?: number)

Verify if a locator on the page is enabled or disabled.

```js
// simple call with just selector
BrowseTheWeb.as(actor).checkEnabledState('mySelector', 'enabled');
// or with options
BrowseTheWeb.as(actor).checkEnabledState('mySelector', 'disabled', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### checkVisibilityState(selector: string, mode: 'visible' | 'hidden', options?: SelectorOptions, timeout?: number)

Verify if a locator on the page is visible.

```js
// simple call with just selector
BrowseTheWeb.as(actor).checkVisibilityState('mySelector', 'visible');
// or with options
BrowseTheWeb.as(actor).checkVisibilityState('mySelector', 'hidden', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

#### press(keys: string)

Press the specified key(s) on the keyboard.

```js
// Press a single button
BrowseTheWeb.as(actor).press('A');
// or multiple buttons
BrowseTheWeb.as(actor).press('Control+A');
```

#### removeLocalStorageItem(key: string)

Delete a local storage item, if a key/value pair with the given key exists.

```js
BrowseTheWeb.as(actor).removeLocalStorageItem('some key');
```

#### removeSessionStorageItem(key: string)

Delete a session storage item, if a key/value pair with the given key exists.

```js
BrowseTheWeb.as(actor).removeSessionStorageItem('some key');
```

#### setLocalStorageItem(key: string, value: any)

Set a local storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.

```js
BrowseTheWeb.as(actor).setLocalStorageItem('some key', 'some value');
```

#### setSessionStorageItem(key: string, value: any)

Set a session storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.

```js
BrowseTheWeb.as(actor).setSessionStorageItem('some key', 'some value');
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

#### Add.cookies(cookies: Cookie[])

Add the specified cookies.

```js
Add.cookies([{
    name: 'my cookie',
    value: 'my value',
    url: 'http://www.myapp.com',
}]);
```

#### Check.element(selector: string, options?: SelectorOptions)

Checks a checkbox

```js
// simple call with just selector
Check.element('mySelector');
// or with options
Check.element('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```
#### Clear.cookies()

Clear all browser cookies.

```js
Clear.cookies();
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

#### Get.cookies(urls?: string | string[])

Get the specified cookies. If no urls are speciefied, get all cookies.

```js
// get all cookies
Get.cookies();
// get cookies for a single domain
Get.cookies('https://www.myapp.com');
// get cookies for two domains
Get.cookies(['https://www.myapp.com', 'https://www.another-app.com']);
```

#### Get.localStorageItem(key: string)

Get a local storage item.

```js
Get.localStorageItem('some key');
```

#### Get.sessionStorageItem(key: string)

Get a session storage item.

```js
Get.sessionStorageItem('some key');
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

#### Remove.localStorageItem(key: string)

Remove a local storage item, if a key/value pair with the given key exists.

```js
Remove.localStorageItem('some key');
```

#### Remove.sessionStorageItem(key: string)

Remove a session storage item, if a key/value pair with the given key exists.

```js
Remove.sessionStorageItem('some key');
```

#### Set.localStorageItem(key: string, value: any)

Set a local storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.

```js
Set.localStorageItem('some key', 'some value');
```

#### Set.sessionStorageItem(key: string, value: any)

Set a session storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.

```js
Set.sessionStorageItem('some key', 'some value');
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

#### checkStatus(response: Response, status: number, mode: 'equal' | 'unequal')

Verify if the given response's status is equal to the expected status.

```js
UseApi.as(actor).checkStatus(response, 200, 'equal');
```

#### checkBody(response: Response, body: ResponseBodyType, mode: 'equal' | 'unequal')

Verify if the given response's body is equal to the expected body. The check includes type safety.

```js
// json response
UseApi.as(actor).checkBody(response, { text: 'test' }, 'equal');
// text response
UseApi.as(actor).checkBody(response, 'test', 'unequal');
// buffer response
UseApi.as(actor).checkBody(response, Buffer.from('abc'), 'equal');
```

#### checkHeaders(response: Response, headers: {[key: string]: string | undefined }, mode: 'included' | 'excluded')

Verify if the given headers are included in the given response's headers. 
If the header has a value !== undefined, both key and value will be checked. If a header has a value === undefined, only the key will be checked.

```js
// check only keys
UseApi.as(actor).checkHeaders(response, { contentType: undefined }, 'included');
// check key and value
UseApi.as(actor).checkHeaders(response, { contentType: 'application/json' }, 'excluded');
```

#### checkDuration(response: Response, duration: number, mode: 'lessOrEqual' | 'greater')

Verify if the reponse (including receiving body) was received within a given duration.

```js
// check if response was received within 2s
UseApi.as(actor).checkDuration(response, 2000, 'lessOrEqual');
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

### Generic Actions which do not require any particular Ability

#### Sleep.for(ms: number)

Pause the execution of further test steps for a given interval in milliseconds

```js
Sleep.for(5000);
```

### Available Web Questions

#### Element.toBe

Checks if a condition is true.

#### Element.notToBe

Checks if a condition is false.

#### Element.*.visible(selector: string, options?: SelectorOptions)

Validates wether an element is visible. A mode operator must be prepended.

```js
// simple call with just selector
Element.toBe.visible('mySelector');
// or with options
Element.notToBe.visible('mySelector', {
    hasText: 'myText',
    subSelector: ['mySubSelector', { hasText: 'anotherText' } ]
});
```

#### Element.*.enabled(selector: string, options?: SelectorOptions)

Validates wether an element is enabled. A mode operator must be prepended.

```js
// simple call with just selector
Element.toBe.enabled('mySelector');
// or with options
Element.notToBe.enabled('mySelector', { hasText: 'myText', subSelector: ['mySubSelector', { hasText: 'anotherText' } ]});
```

### Available Api Questions

#### Response.has

Checks if a condition is true.

#### Response.hasNot

Checks if a condition is false.

#### Response.*.statusCode(response: Response, code: number)

Checks if the response has a given status code. A mode operator must be prepended.

```js
Response.has.statusCode(response, 200);
Response.hasNot.statusCode(response, 200);
```

#### Response.*.body(response: Response, body: ResponseBodyType)

Checks if the response body equals a given body. A mode operator must be prepended.

```js
// json format
Response.has.body(response, { key: value });
// text format
Response.hasNot.body(response, 'text' );
// buffer format
Response.has.body(response, Buffer.from('abc') );
```

#### Response.*.headers(response: Response, headers: Headers)

Checks if the response has the given headers either by key (value to be set to undefined) or key/value lookup. A mode operator must be prepended.

```js
// only check for header presence by passing undefined as the value
Response.has.headers(response, { 'content-type': undefined });
// lookup for key/value combination to be present
Response.hasNot.headers(response, { 'content-type': 'application/json' });
```

#### Response.*.beenReceivedWithin(response: Response, duration: number)

Checks if the reponse (including receiving body) was received within a given duration. A mode operator must be prepended.

```js
// check if response was received within 2s
Response.has.beenReceivedWithin(response, 2000);
// check if response was not received within 2s
Response.hasNot.beenReceivedWithin(response, 2000);
```

### Group Actions into a Task

Tasks group actions into logical entities. Here is a task that uses the actions Navigate, Fill and Click from the web capabilities and Get from api capabilities.

```js
// file: ./task/Login.ts

import { Actor, Task } from '@testla/screenplay-playwright';
import { Click, Fill, Navigate } from '@testla/screenplay-playwright/web';
import { Get} from '@testla/screenplay-playwright/api';

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
import { Actor } from '@testla/screenplay-playwright';
import { BrowseTheWeb, Element } from '@testla/screenplay-playwright/web';
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
        await actor.asks(Element.toBe.visible('#logged-in-indicator'));
    });
});
```

Besides the existing actions, abilities and questions it is of course possible to define your own ones. How this is done, please refer to our [core package](https://www.npmjs.com/package/@testla/screenplay).

Since tasks, actions and questions return promises, we advise to make use of the [require-await](https://eslint.org/docs/rules/require-await) rule in case of using eslint. This will help to prevent unexpected behavior when forgetting to await tasks/actions or questions.
