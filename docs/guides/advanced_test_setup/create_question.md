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

[Back to overview](../guides.md)