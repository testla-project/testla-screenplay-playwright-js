[Back to overview](../guides.md)

# Handling Frame(s)

A webpage may be associated with multiple Frame objects. Each webpage possesses a primary frame, and interactions at the page level, 
such as clicking, are typically performed within this main frame. In addition to the main frame, a webpage can incorporate extra 
frames using the HTML 'iframe' tag. These supplementary frames can be targeted for interactions occurring within the specific frame.

## How to handling Frames

### Handling single Frames

You can access frame objects using the `inFrame()` API:

```typescript
    test('Handle iFrames', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/iframe'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toBe.visible('#tinymce', { hasText: 'Your content goes here.' }).inFrame('#mce_0_ifr'),
        )).toBe(true);
    });
```

### Handling nested Frames

You can also chain frame objects using the `inFrame()` API.
> [!IMPORTANT]
> Be aware the sequence starts at the top iframe and goes down to the lowest iframe

```typescript
    test('Handle nested Frames', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/nested_frames'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toBe.visible('#content', { hasText: 'MIDDLE' }).inFrame('[name="frame-top"]').inFrame('[name="frame-middle"]'),
        )).toBe(true);
    });
```

[Back to overview](../guides.md)