# Writing tests

Testla tests are simple, they
    - perform tasks, and
    - ask about the state against expectations

There is no need to wait for anything prior to performing a task. 

You will learn:
    - How to write the first test
    - How to perform tasks and actions
    - How to use questions

# First test
Take a look at the following example to see how to write a test. 

```ts
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
```
# Tasks


# Actions
## 

# Questions
