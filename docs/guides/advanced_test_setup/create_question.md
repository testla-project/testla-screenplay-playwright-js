[Back to overview](../guides.md)

# Questions and expectations

Testla helps you model your test scenarios from the perspective of actors performing activities to accomplish their goals. Assertions follow this same consistent approach, with any assertions expressed using the interaction to `ask`.


## Implementing custom questions

You can also implement custom questions when needed. To do that, take a look on the following code.

```typescript
import { expect } from '@playwright/test';
import { Question } from '@testla/screenplay-playwright';

export class Entity extends Question<boolean> {
    private payload: any;

    private checkMode: 'has' | 'hasNot';

    private constructor(checkMode: 'has' | 'hasNot') {
        super();
        this.checkMode = checkMode;
    }

    public async answeredBy(): Promise<boolean> {
        const { obj, attribute, value } = this.payload;
        const attributeFound = obj[attribute] === value;
        
        expect(attributeFound).toBe(this.checkMode === 'has');
        return Promise.resolve(true);
    }

    static get has() {
        return new Entity('has');
    }

    static get hasNot() {
        return new Entity('hasNot');
    }

    public attributeValue(obj: any, attribute: string, value: any): Entity {
        this.payload = { obj, attribute, value };
        return this;
    }
}
```

### In Detail

Let's break down the above code for implementing a custom question. The `Entity` class is a custom `question` that extends `Question<boolean>`. It's designed to check whether a specific attribute of an object has a certain value. 
The `Entity` class has a private constructor that takes a parameter `checkMode` (`has` or `hasNot`). This parameter determines whether the question is checking for a positive condition (`has`) or a negative condition (`hasNot`). 

The `answeredBy` method is an abstract method from the `Question` class that needs to be implemented. It performs the actual logic of the question. It checks whether the specified attribute of the object matches the expected value based on the `checkMode`. Under the hood we use Playwright's `expect` to assert if the condition is met. 

The `Entity` class has static factory methods called `has` and `hasNot` that create instances of `Entity` with the corresponding `checkMode`. 

The `attributeValue` method sets the payload with the `object`, `attribute` and `value` that will be used in the `answeredBy` method. This method allows setting the parameters for the question in a fluent manner. 

This custom question, demonstrates how you can implement reusable and expressive questions in the Screenplay Pattern. It provides a flexible way to check whether a certain attribute of an object has a specific value and supports both positive and negative assertions. 

[Back to overview](../guides.md)