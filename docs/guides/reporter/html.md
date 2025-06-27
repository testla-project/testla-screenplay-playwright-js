[Back to overview](../guides.md)

# HTML Reporter

> Introduced in: 1.8.0
>
> This feature is currently in experimental stage and might see bigger changes.

Testla comes with a HTML reporter which logs all activities in a file and gives insights about the overall test execution result.

To activate the reporter announce it in your `playwright.config.ts` as follows.

```typescript
reporter: [
    [
        // the reporter from testla
        '@testla/screenplay-playwright/reporter/html',
        // optional: the path to the output file, defaults to: screenplay-report
        { outputDir: 'results' },
    ],
    // other reporters
],
```

[Back to overview](../guides.md)