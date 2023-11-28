[Back to overview](../guides.md)

# Task

The idea that underpins the Screenplay Pattern is to capture your domain language and use your acceptance tests as an opportunity to demonstrate how actors interacting with your system accomplish their goals.

Conceptually similar to functions, tasks offer an easy way to associate business meaning with sequences of activities and turn them into reusable building blocks.

## Define your task

Here, we create a simple login task which can be performed by an actor.

```typescript
import { Actor, Task } from '@testla/screenplay-playwright';
import { Navigate, Fill, Click, Wait } from '@testla/screenplay-playwright/web';
import { LoginScreen } from '../screen/login-screen';

export class Login extends Task {
    private constructor() {
        super();
    }

    public async performAs(actor: Actor): Promise<any> {
        return await actor.attemptsTo(
            Navigate.to(loginURL),
            Fill.in(LoginScreen.USER_NAME_INPUT, actor.states('username') || ''),
            Fill.in(LoginScreen.PASSWORD_INPUT, actor.states('password') || ''),            
            Click.on(LoginScreen.LOGIN_BUTTON),
            Wait.forLoadState('networkidle'),
        );
    }

    public static toApp(): Login {
            return new Login();
    }
}
```

[Back to overview](../guides.md)