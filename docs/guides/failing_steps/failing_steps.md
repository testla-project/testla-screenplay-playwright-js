[Back to overview](../guides.md)

# Handle Failing Steps

In general tests break when a step fails. This happens if an action or task is not successful or when a question cannot be answered positive.

But what if an action or tasks is allowed to fail based on the current state of the system under test or when you want to react conditionally on failing questions? Testla offers you the follwing options for this.

## Proceeding with the test when an action/task fails

You may have actions or tasks which might (expectedly) fail during the test. An example is to click an element if it is present while it is also fine to proceed with the test when the element is not available.

This can be achieved as follows:

```javascript
await actor.attemptsTo(
    // this action might fail but the test will continue
    Click.on('#eventually-available').orSkipOnFail,
    Click.on('#definitely-available'),
);
```

## Use failing questions for test flow controls

In some cases you may want to ask questions to find out about the status of the system under test to make decisions on how to move on with your test. In order to not fail a test but receive information about questions being answered negative you can use `failAsFalse` on a question which then returns a boolean value instead.

```javascript
// find out if question was answered with false
const wasLoggedIn = await actors.asks(
    Login.toBe.successful().failAsFalse,
);

// proceed based on answer from above
if (wasLoggedIn === false) {
    // some code to be executed on false case
}
```

[Back to overview](../guides.md)