[Back to overview](../guides.md)

# Action

`Actions` are low-level activities that encapsulate a handful of instructions for an actor on how to use their abilities to perform an individual interaction with the given interface of the system under test.

## Define custom Action

Here, we define a simple reload action which can be performed by an actor.

```typescript
import { Actor, Action } from '@testla/screenplay-playwright';
import { BrowseTheWeb } from '@testla/screenplay-playwright/web';

export class Reload extends Action {
    public async performAs(actor: Actor): Promise<any> {
        const page = BrowseTheWeb.as(actor).getPage();
        return page.reload();
    }

    public static page(): Reload {
        return new Reload();
    }
}
```
### In Detail

Let us take a look at the code above. The `performAs` method is required to be implemented by any class extending the Action abstract class. It takes an `Actor` object as a parameter, representing the actor performing the action. It uses the `BrowseTheWeb` ability to retrieve the current page associated with the actor. It then calls the `reload` method on the page, which refreshes the current page. 
The static `page` method is a convenience method for creating an instance of the Reload class. It returns a new instance of the Reload class. 

[Back to overview](../guides.md)