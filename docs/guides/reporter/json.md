[Back to overview](../guides.md)

# JSON Reporter

> Introduced in: 1.8.0
>
> This feature is currently in experimental stage and might see bigger changes.

Testla comes with a JSON reporter which logs all activities in a file and gives insights about the overall test execution result.

To activate the reporter announce it in your `playwright.config.ts` as follows.

```typescript
reporter: [
    [
        // the reporter from testla
        '@testla/screenplay-playwright/reporter/json',
        // optional: the path to the output file, defaults to: screenplay-report.json
        { outputFile: 'results.json' },
    ],
    // other reporters
],
```

[Back to overview](../guides.md)