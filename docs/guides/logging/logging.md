[Back to overview](../guides.md)

# Logging

Testla comes with logging which helps you to debug your test code. When logging is enabled all activities an actor triggers are logged in a comprehensive way to stdout. To enable logging set the DEBUG environment variable as follows:

```typescript
DEBUG=testla:sp
```

In addition it is possible to print structured logs to stdout. This can be achieved as follows.

```typescript
import { STRUCTURED_LOGS_ENVVAR_NAME } from '@testla/screenplay'

// activating structured logs to stdout
process.env[STRUCTURED_LOGS_ENVVAR_NAME] = 'true';
```

To understand how to enable logging in custom Actions and Questions please refer to the [logging guide](https://github.com/testla-project/testla-screenplay-core-js/blob/main/doc/logging.md) of Testla Screenplay Core.

[Back to overview](../guides.md)