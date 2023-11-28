[Back to overview](../guides.md)

# Action

`Actions` are low-level activities that encapsulate a handful of instructions for an actor on how to use their abilities to perform an individual interaction with the given interface of the system under test.

## Define custom Action

Here, we define a simple reload action which can be performed by an actor.

```typescript
import { Actor, Action } from '@testla/screenplay-playwright';
import { BrowseTheWeb } from '@testla/screenplay-playwright/web';

export class Reload extends Action {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async performAs(actor: Actor): Promise<any> {
        const page = BrowseTheWeb.as(actor).getPage();
        return page.reload();
    }

    public static page(): Reload {
        return new Reload();
    }
}
```

[Back to overview](../guides.md)