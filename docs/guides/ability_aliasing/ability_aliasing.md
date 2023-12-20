[Back to overview](../guides.md)

# Ability Aliasing

It happens that there is the need to make use of the same ability but with different settings. A usecase for that could be to invoke 2 different APIs with different base URLs and authentication tokens.

The solution Testla offers is `Ability Aliasing`. With that multiple instances of an ability can be assigned to a user at the same time.

## How to use Ability Aliasing

### Assigning of Abilities to Actor

```javascript
    Actor
        .can(Ability.using(SETTINGS_1))
        .can(Ability.using(SETTINGS_2)).withAlias('aliased');
```

Puts 2 instances of an Ability with different configuration into the Actors internal ability map.

The first one is the default without alias, the second one gets an alias.

### Using aliased Abilities during test cycle

Once the abilities have been assigned they can be used independently but at the same time in the test flow.

The below example shows how to use Actions with default and aliased abilities. The same is for Tasks and Questions.

```javascript
    // actions
    await Actor.attemptsTo(
        // trigger action with default ability
        Action.execute(),
        // trigger action with aliased ability
        Action.execute().withAbilityAlias('aliased'),
    );

    // tasks
    await Actor.attemptsTo(
        // trigger task with default ability
        Task.execute(),
        // trigger task with aliased ability
        Task.execute().withAbilityAlias('aliased'),
    );

    // questions
    await Actor.asks(
        // ask question with default ability
        Question.toBe.truthy(),
        // ask question with aliased ability
        Question.toBe.truthy().withAbilityAlias('aliased'),
    );
```

To use the default ability without an alias the test codes do not need any special handling and are just written in the known format. To use Actions, Tasks or Questions with an aliased ability, the `.withAbilityAlias('alias name')` method needs to be used via chaining.

## How to support ability aliasing in custom elements

This section gives you an overview over the specific integration details needed to offer ability aliasing in custom elements. If you need further information please refer to the [Testla Screenplay Core Library](https://github.com/testla-project/testla-screenplay-core-js#readme).

### Actions

Actors attemptsTo method triggers the Action internal performAs method with the given Actor and the optionally defined ability alias.

The Actions performAs method then internally calls the Ability's "as" method to get the instanciated instance from the Actors ability map.
Therefore it is important that during the custom integration `this.abilityAlias` is passed to the Ability's `as` method as seen in the example below.

```javascript
    Action.performAs(actor: Actor): Promise<T> {
        // this.abilityAlias is provided to ability's as method
        const ability = await Ability.as(actor, this.abilityAlias);
        // ... now ability functionality can be used
        return ability.doSomething();
    };
```

### Tasks

By nature a Task is a collection of Actions or other Tasks. Therefore the Ability Alias likely needs to be forwarded to all internal Actions and Tasks. This can be achieved as shown below.

```javascript
    Task.performAs(actor: Actor): Promise<T> {
        // define the actions / subtasks to execute
        const activities: (Task | Action)[] = [
            Action.execute(),
            Task.execute(),
        ];

        // provide the ability alias to all activities
        this.activities.forEach(activity => {
            activity.withAbilityAlias(this.abilityAlias);
        });

        // execute the activities and return the result
        return actor.attemptsTo(
            ...this.activities,
        );
    };
```

In a second use case it might be desired to only pass down the Ability Alias to some Actions and Tasks. This can be achieved as follows.

```javascript
    Task.performAs(actor: Actor): Promise<T> {
        return actor.attemptsTo(
            // this.abilityAlias is passed in to the task
            // by calling it with its own withAbilityAlias method
            Action.execute().withAbilityAlias(this.abilityAlias),
            Task.execute(),
        );
    };
```

The last scenario is that we do want to pass down Ability Aliases completely independent from a potentially passed in alias. In this case the aliases are just specified via their direct string value.

```javascript
    Task.performAs(actor: Actor): Promise<T> {
        return actor.attemptsTo(
            Action.execute().withAbilityAlias('aliased'),
            Task.execute().withAbilityAlias('another alias'),
        );
    };
```

### Questions

Questions per se follow the same flow as actions/tasks.
The only difference is the names of internal methods.
So is attemptsTo substituted with asks and performAs with answeredBy.

```javascript
    Question.answeredBy(actor: Actor): Promise<T> {
        const ability = await Ability.as(actor, this.abilityAlias);
        // ... now ability functionality can be used
        expect(ability.doSomething()).toBe(true);
        return true;
    };
```

[Back to overview](../guides.md)