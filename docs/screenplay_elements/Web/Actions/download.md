[Back to overview](../../screenplay_elements.md)

# Download

*Introduced in: 1.5.0*

The `Download` class is an action class in the Screenplay pattern designed for use with the `@testla/screenplay` library. This class allows actors to download a file specified by a selector using the `BrowseTheWeb` ability provided by Testla.

## Table of Contents

- [Download](#download)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
    - [performAs](#performas)
    - [file](#file)
    - [inFrame](#inframe)
    - [withAbilityAlias](#withabilityalias)

## Class Overview

### Methods

### performAs

```typescript
public async performAs(actor: Actor): Promise<boolean>;
```

- **Description:** Finds the specified selector and clicks on it using the `BrowseTheWeb` ability and waits for download complete.
- **Parameters:**
  - `actor` - The actor performing this action.
- **Returns:** `Promise<boolean>` - Returns a promise of true after the download is complete.

### file

```typescript
public static file(selector: Selector, options?: SelectorOptions & { filepath?: string; filename?: string }): Download;
```

- **Description:** Creates a new instance of the `Download` class specifically for downloading a file behind a link element.
- **Parameters:**
  - `selector` - The Selector.
  - `options` (optional) - Advanced selector lookup options and filepath and filename configuration.
- **Returns:** `Downlaod` - Returns a new `Download` instance.

### inFrame

```typescript
public inFrame(frameSelector: FrameSelector): Download;
```

- **Description:** Finds the specified frame selector using the `BrowseTheWeb` ability.
- **Parameters:**
  - `frameSelector` - The FrameSelector.
- **Returns:** `Download` - Returns the current action.

### withAbilityAlias

```typescript
public withAbilityAlias(alias: string): Download;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Download` - Returns the current action.

[Back to overview](../../screenplay_elements.md)
