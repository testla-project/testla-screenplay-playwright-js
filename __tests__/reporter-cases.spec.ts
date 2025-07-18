import { Actor, Task } from '@testla/screenplay';
import {
    test as base,
    expect,
} from '@playwright/test';
import { BrowseTheWeb, Navigate } from '../src/web';

type MyActors = {
    actor: Actor;
};

const test = base.extend<MyActors>({
    actor: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const actor = Actor.named('TestActor').can(BrowseTheWeb.using(page));
        await use(actor);
    },
});

class NavigateInnerTask extends Task {
    public async performAs(actor: Actor): Promise<any> {
        return actor.attemptsTo(
            Navigate.to('xyz://google.com').orSkipOnFail,
            Navigate.to('https://google.com'),
        );
    }

    public static execute(): NavigateInnerTask {
        const instance = new NavigateInnerTask();
        instance.setCallStackInitializeCalledWith({});
        return instance;
    }
}

class NavigateTask extends Task {
    public async performAs(actor: Actor): Promise<any> {
        return actor.attemptsTo(
            NavigateInnerTask.execute(),
        );
    }

    public static execute(): NavigateTask {
        const instance = new NavigateTask();
        instance.setCallStackInitializeCalledWith({});
        return instance;
    }
}

test.describe('Testing screenplay-playwright-js web module', () => {
    test('Navigate', async ({ actor }) => {
        await test.step('Navigate to playwright page', async () => {
            await actor.attemptsTo(
                NavigateTask.execute(),
            );
            await expect(BrowseTheWeb.as(actor).getPage()).toHaveURL('https://www.google.com');
        });
    });
});
