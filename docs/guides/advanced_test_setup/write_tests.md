[Back to overview](../guides.md)

# Writing tests

Take a look at the following example to see how to write a test using a task. 

```typescript
test.describe('Use your defined task', () => {
    // The test uses the defined Actor Andy from the fixture
    test('execute task', async ({ Andy }) => {
        // Execute the task Login.toApp()
        await Andy.attemptsTo(Login.toApp());
        // Ask for a specific element is visible to validate that the login was successful
        await Andy.asks(Element.toBe.visible(HomeScreen.LOGGED_IN_INDICATOR));
    });
});
```

It is also possible to use multiple tasks in one `attemptsTo`.

```typescript
test.describe('Use your defined task', () => {
    // The test uses the defined Actor Andy from the fixture
    test('execute task', async ({ Andy }) => {
        // Execute the task Login.toApp()
        await Andy.attemptsTo(
            Login.toApp(), 
            TheSecondTask.doSomething(),
            TheThirdTask.doSomething(),
        );
    });
});
```

Here we use our custom question. 

```typescript
test.describe('Use your defined question', () => {
    // The test uses the defined Actor Andy from the fixture
    test('execute task and then the question', async ({ Andy }) => {
        // Execute the task Login.toApp()
        await Andy.attemptsTo(
            Login.toApp(), 
            TheSecondTask.doSomething(),
            TheThirdTask.doSomething(),
        );

        await Andy.asks(Entity.has.attributeValue(entityObj, this.attribute, this.value));
    });
});
```
[Back to overview](../guides.md)
