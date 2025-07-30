---
published: false
title: A philosophy of software design
layout: post
tags: [book review]
read_date: 2025
---

The book it is an opinion piece about designing software based on the experience of John Ousterhout both professionally and on class. The best part of the book are the examples taken from class and how he explains the pitfalls from those designs, but there is a lot of good points and in general a very sensible way to understand software design.

The first two chapters are about the basic principles that are desirable in software design, this are the usual: simplicity, readability, correctness... To get simplicity you need to reduce coupling and increase cohesion. Abstractions as a way to hide complexity, obscurity when the abstraction leaks or the interface is not well defined... The usual concepts. But then he goes into very opinionated way on how software should "look" and a lot of recommended patterns and red flags to take into account.

## Red Flags from "A Philosophy of Software Design"

**1. Shallow Module** A shallow module is one whose interface is complicated relative to the functionality it provides. Shallow modules don't help much in the battle against complexity, because the benefit they provide (not having to learn about how they work internally) is negated by the cost of learning and using their interfaces.

**2. Information Leakage** According to Ousterhout, this red flag indicates a problem with the separation of classes. This occurs when design decisions are reflected in multiple modules.

**3. Temporal Decomposition** - This happens when the code structure is based on the order in which operations are executed rather than on information hiding principles.

**4. Overexposure** - When a module's interface forces callers to be aware of internal implementation details.

**5. Pass-Through Method** One way this problem manifests itself is in the form of pass-through methods. These are methods that do little except pass their arguments to another method.

**6. Repetition** - When the same piece of code appears repeatedly throughout the system.

**7. Special-General Mixture** - When a general-purpose mechanism contains code specialized for a particular use case.

**8. Conjoined Methods** - When methods that should be separate are implemented together, or when methods that should be together are implemented separately.

**9. Comment Repeats Code** Comments should not repeat the code. Could somebody who has never seen the code write your comment just by looking at the code?

**10. Implementation Documentation** - When interface documentation describes implementation details rather than abstractions.

**11. Vague Name** - When variable or method names are so generic that they don't provide useful information about what the entity does.

**12. Hard to Pick Name** - When it's difficult to come up with a name for a variable or method, often indicating that the underlying design isn't clean.

**13. Hard to Describe** If a method or variable describes a long comment, it is a red flag that you don't have a good abstraction.

**14. Nonobvious Code** If the meaning and behavior of code cannot be understood with a quick reading, it is a red flag. Often this means that there is important information that is not immediately clear to someone reading the code.
