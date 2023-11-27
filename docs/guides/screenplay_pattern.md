# Screenplay Pattern Overview
The Screenplay Pattern is a user-centered approach to writing high-quality automated tests. It guides you to effective use of abstraction levels, helps you align tests with business language, and promotes good testing and software development practices.

Instead of focusing on low-level, interface-oriented interactions, you describe your test scenarios in a similar way to how you would explain them to a human - an actor in a screenplay sense. You write simple, readable and highly reusable code that instructs actors what activities to perform and what things to check. The domain-specific test language you create is used to express scripts - the activities you want the actors to perform in a particular test scenario.

Testlas implementation of the Screenplay Pattern enables developers to easily introduce this design approach even into existing test automation projects.

## The design principle
The design principle behind the Screenplay Pattern is simple but might forever change the way you look at test automation:
> [!IMPORTANT]
> Automated acceptance tests should use your domain language to clearly express what activities the actors interacting with your system need to perform in order to accomplish their goals.

Applying this design principle to your automated tests has a number of positive implications:
- Expressing your test scenarios in your domain language makes them easier to understand and accessible to a wider audience
- Focusing on actors and their goals makes it easy to correlate any test failures with the actual business impact
- Modelling actor workflows using sequences of business-focused, reusable activities reduces code duplication, improves flexibility of your test code base, and means that your team can quickly compose new test scenarios from existing steps

## The 5 elements of the Screenplay Pattern
The Screenplay Pattern is beautiful in its simplicity. It's made up of five elements, five types of building blocks that Testla gives you to design any functional acceptance test you need, no matter how sophisticated or how simple.

The key 5 key elements of the pattern are: 
- **Actors**, who represent people interacting with the system under test (SUT)
- **Abilities**, that act as thin wrapper around a client of a specific interface to interact with the system under test
- **Tasks**, used to model sequences of actions as meaningful steps of a business workflow in your domain
- **Actions**, which represents the low-level activities an actor can perform
- **Questions**, used to retrieve information from the SUT and the test execution environment

![Screenplay Pattern](./assets/screenplay_pattern.png)