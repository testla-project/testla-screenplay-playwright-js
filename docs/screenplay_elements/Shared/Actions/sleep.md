[Back to overview](../../screenplay_elements.md)

# Sleep

The `Sleep` class is an useful action for introducing delays in test scenarios, allowing for better synchronization with the system under test. This performs the action of pausing the test execution for the specified interval.

## Table of Contents

- [Sleep](#sleep)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
  - [Methods](#methods)
    - [performAs](#performas)
    - [for](#for)

## Class Overview

### Extends

This class extends the `Action` class, providing functionality for pausing test execution.

## Methods

### performAs

```typescript
public async performAs(): Promise<void>;
```

- **Description:** Pause the execution of further test steps for the specified interval in milliseconds.
- **Parameters:** None
- **Returns:** `Promise<void>` - A promise that resolves when the pause is complete.

### for

```typescript
public static for(ms: number): Sleep;
```

- **Description:** Create a new instance of the `Sleep` class with a specified duration.
- **Parameters:**
  - `ms` - The interval in milliseconds for which the test execution will be paused.
- **Returns:** `Sleep` - A new instance of the `Sleep` class.

[Back to overview](../../screenplay_elements.md)