[Back to overview]()

# Sleep

The `Sleep` class is an action class designed for pausing further test execution for a specified duration within a testing framework built on top of the Screenplay pattern from the '@testla/screenplay' library. This class extends the `Action` class and is used to introduce delays in test scenarios.

## Table of Contents

- [Sleep](#sleep)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
  - [Properties](#properties)
    - [ms](#ms)
  - [Methods](#methods)
    - [performAs](#performas)
    - [for](#for)

## Class Overview

### Extends

This class extends the `Action` class, providing functionality for pausing test execution.

## Properties

### ms

```typescript
private ms: number;
```

- **Description:** The duration in milliseconds for which the test execution will be paused.
- **Type:** `number` - An integer representing the duration in milliseconds.

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

---

**Note:** This class is useful for introducing delays in test scenarios, allowing for better synchronization with the application under test. The `for` method is used to create a new instance of the `Sleep` class with the desired duration. The `performAs` method then performs the action of pausing the test execution for the specified interval.