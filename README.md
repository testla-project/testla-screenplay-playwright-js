# Testla Screenplay-Playwright

## Introduction

The testla project is a collection of tools of different tools to help in the QA automation process.
This package contains uses the Testla screenplay core package to implement the screenplay pattern for Playwright.

## What is Screenplay Pattern and how does it work?

The Screenplay Pattern is a user-centred approach to writing high-quality automated tests. It steers you towards an effective use of layers of abstraction, helps your tests capture the business vernacular, and encourages good testing and software engineering habits.

Instead of focusing on low-level, interface-centric interactions, you describe your test scenarios in a similar way you'd describe them to a human being - an actor in Screenplay-speak. You write simple, readable and highly-reusable code that instructs the actors what activities to perform and what things to check. The domain-specific test language you create is used to express screenplays - the activities for the actors to perform in a given test scenario.

The Screenplay Pattern is beautiful in its simplicity. It's made up of five elements, five types of building blocks that Testla gives you to design any functional acceptance test you need, no matter how sophisticated or how simple.

The key elements of the pattern are: actors, abilities, tasks, actions and questions.

![Screenplay Pattern](/doc/screenplay.png)

## How to use this package?

This package comes with 1 ability, 1 question and 10 actions already implemented:

...

However, you can of course define your own actions, abilties, questions and tasks.

### Define a task

Tasks group actions into logical entities. Here is a task that uses the actions Navigate, Fill and Click from the @testla/screenplay-playwright package.

```js
import {
    Actor, Task, Click, Fill, Navigate, Wait,
} from '@testla/screenplay-playwright';

class Login extends Task {
    // a simple Login Task.
    public async performAs(actor: Actor): Promise<any> {
        return actor.attemptsTo(
            Navigate.to('https://www.my-fancy-url.com'),
            Fill.with('#username', actor.username || ''),
            Fill.with('#password', actor.password || ''),
            Click.on('#login-button'),
        );
    }

    // static member method to invoke the task
    public static toApp(): Login {
        return new Login();
    }
}
```

### Define a test case

The final step is to define a test case using the Task defined above.

```js
import { Actor, BrowseTheWeb } from '@testla/screenplay-playwright';

// Example test case with Playwright
test.describe('My Test', () => {
    test('My first test', async ({ page }) => {
        const actor = Actor.named('James').withCredentials('username', 'password');
        actor.can(BrowseTheWeb.using(page));

        await actor.attemptsTo(Login.toApp());

        expect(await actor.asks(Status.isEnabled('#logged-in-indicator'))).not.toBeNull();
    });
});
```