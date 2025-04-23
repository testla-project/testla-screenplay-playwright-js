[Back to overview](../../screenplay_elements.md)

# ARequest

The `ARequest` class is intended to be extended by specific HTTP request action classes, and it provides a common structure for handling headers and defining the behavior of HTTP requests. This class extends the `Action` class.

## Table of Contents

- [ARequest](#arequest)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
    - [Methods](#methods)
      - [performAs](#performas)

## Class Overview

### Extends

This class extends the `Action` class from the '@testla/screenplay' library, providing a foundation for defining HTTP request actions.

### Methods

#### performAs

```typescript
abstract performAs(actor: Actor): Promise<any>;
```

- **Description:** Abstract method to be implemented by subclasses. Defines the behavior of the HTTP request action.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<any>` - A promise resolving to the result of the action. The specific type may vary based on the implementation.

[Back to overview](../../screenplay_elements.md)