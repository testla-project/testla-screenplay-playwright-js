[Back to overview](../guides.md)

# Actor as a Fixture

## Introduction

Playwright Test is based on the concept of test fixtures. Test fixtures are used to establish environment for each test, giving the test everything it needs and nothing else. Test fixtures are isolated between tests. With fixtures, you can create actors based on their abilities. 

## Creating an actor with abilities

To create your actors with abilities in an own fixture, use `test.extend()` to create a new test object that will include it. 
Below we create a file called `actors.ts` and add the following snippet. 

This code sets up a Playwright test suite using the Screenplay pattern. It defines a function to create `actors`, specifies their details using environment variables, and then extends the test suite with these actors for use in tests.
It creates a new page in the provided browser context (`context.newPage()`), and then it returns an Actor with specified properties (`name`, `username`, `password`) and capabilities to `browse the web` and `use an API`.

```typescript
import { APIRequestContext, Browser, test as base } from '@playwright/test';
import { Actor } from '@testla/screenplay-playwright';
import { BrowseTheWeb } from '@testla/screenplay-playwright/web';
import { UseAPI } from '@testla/screenplay-playwright/api';

const createUser = async (browser: Browser, request: APIRequestContext, actorName: string, username: string, password: string): Promise<Actor> => {
    const page = await context.newPage();

    return Actor.named(actorName)
        .with('username', username)
        .with('password', password)
        .can(BrowseTheWeb.using(page))
        .can(UseAPI.using(request));
};

type Actors = {
    Andy: Actor;
    Ute: Actor;
    Armin: Actor;
};

export const test = base.extend<Actors>({
    Andy: async ({ browser, request }, use) => {
        const Andy = await createUser(browser, request, 'Andy', `${process.env.ANDY_USER_NAME}`, `${process.env.ANDY_USER_PASSWORD}`);
        await use(Andy);
    },
    Ute: async ({ browser, request }, use) => {
        const Ute = await createUser(browser, request, 'Ute', `${process.env.UTE_USER_NAME}`, `${process.env.UTE_USER_PASSWORD}`);
        await use(Ute);
    },
    Armin: async ({ browser, request }, use) => {
        const Armin = await createUser(browser, request, 'Armin', `${process.env.ARMIN_USER_NAME}`, `${process.env.ARMIN_USER_PASSWORD}`);
        await use(Armin);
    },
});

export { expect } from '@playwright/test';
```

## Using an actor

Just mention the `actor` in your test function argument, and test runner will take care of it. Fixtures are also available in hooks and other fixtures. If you use TypeScript, fixtures will have the right type.

Below we use the actor `Andy` defined above.

```typescript
test.describe('Login to application', () => {
    test('can login', async ({ Andy }) => {
        await Andy.attemptsTo(Login.toApp());
        await Andy.asks(Element.toBe.visible(HomeScreen.LOGGED_IN_INDICATOR));
    });
});
```

You can also use multiple actors from above in one test

```typescript
test.describe('Login to application', () => {
    test('can login', async ({ Andy, Armin }) => {
        await Andy.attemptsTo(Login.toApp());
        await Andy.asks(Element.toBe.visible(HomeScreen.LOGGED_IN_INDICATOR));

        await Armin.attemptsTo(Login.toApp());
        await Armin.asks(Element.toBe.visible(HomeScreen.LOGGED_IN_INDICATOR));
    });
});
```

[Back to overview](../guides.md)