[Back to overview](../guides.md)

# Writing tests

Testla tests are simple, they
- perform tasks, and
- ask about the state against expectations

There is no need to wait for anything prior to performing a task. 

You will learn:
- How to write the first test
- How to write the first test
- How to perform tasks and actions
- How to use questions

# First test
Take a look at the following example to see how to write a test. 

```typescript
test.describe('Check title', () => {
    // The test uses the defined Actor Andy from the fixture
    test('has title', async ({ Andy }) => {
        // Execute the action Navigate.to()
        await Andy.attemptsTo(Navigate.to('https://playwright.dev/'));
        // Ask for a specific element - validate title equals expected
        await Andy.asks(Element.toHave.text('h1', 'Playwright enables reliable end-to-end testing for modern web apps.'));
    });
});
```
[Back to overview](../guides.md)
