[Back to overview](../guides.md)

# Handling Frame(s)

A webpage may be associated with multiple Frame objects. Each webpage possesses a primary frame and interactions at the page level 
such as clicking, are typically performed within this main frame. In addition to the main frame, a webpage can incorporate extra 
frames using the HTML 'iframe' tag. These supplementary frames can be targeted for interactions occurring within the specific frame.

## How to handle Frames

### Handling single Frames

You can access frame objects using the `inFrame()` API:

```typescript
Element.toBe.visible('#myLocator', { hasText: 'Your content goes here.' }).inFrame('#myFrameLocator');
```

### Handling nested Frames

You can also chain frame objects to go down to the inner most iframe using the `inFrame()` API.
> [!IMPORTANT]
> Be aware the sequence starts with outer most iframe and goes down to inner most iframe

```typescript
Element.toBe.visible('#content', { hasText: 'MIDDLE' }).inFrame('[name="frame-top"]').inFrame('[name="frame-middle"]');
```

[Back to overview](../guides.md)