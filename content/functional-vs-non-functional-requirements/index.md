---
title: 'Functional vs Nonfunctional Requirements'
date: '2020-07-10'
tags:
  - sdlc
  - communication
  - software-design
  - software-architecture
song: https://music.apple.com/ru/album/july/1477633578?i=1477633693&l=en
image: ./hero.png
imageAlt: Me and Procreate
description: This post describes differences between functional and nonfunctional requirements and how they affect developers' working hours and software development lifecycle.
published: true
imageShare: './og-image.png'
---

Hey there!

We, developers, usually write code that makes lives easier. But how do we know that our things really help? Or, how to understand what to do in the first place? Of course, we could rely on common sense and our own expectations to predict what users want or like. But how far we can go? And how to make sure that we don't go in the opposite direction from users' desires?

👇 [**TL;DR**](#tldr)

The funny thing here is that it's almost impossible to produce a piece of software that will be either perfect or a completely obnoxious (I'll use this word as I am unaware of a good antonym for "perfect"). Thus, with every single release, we land somewhere in this multidimentional perfect-obnoxious universe. Needless to say that coordinates do not work there.

![Our software in the perfect-obnoxious universe](./understanding-desires.png)

The biggest challenge is that we don't really know where we are. It would be great to be able to make educated guesses on which direction we should take for our next step. Even better, if we could get nice and clean instructions.

## Requirement

We can envision many things regarding the code we produce (and we do), but there are people who are more qualified to decide what is needed and what is not. Users, of course. This is why so many websites and applications ask us if we like stuff or not, bombard us with feedback request emails, and, generally, do their best to get the most. The feedback drives improvement of the software, making it closer to what users would expect from it.

The feedback needs to be analysed and translated into a set of actionable items. The process and the people involved are out of the scope of this post. So, let's just imagine a black box that accepts information and returns a list of _requirements_.

To better understand, what a requirement is, let's refer to the [Wikipedia](https://wikipedia.org) definition:

> Requirement is a singular documented physical or functional need that a particular design, product or process aims to satisfy.

Although this definition defines, it is not as complete as it could be. If you need something to be defined, and it comes from the realm of software engineering, you should take a look at BABOK [^1] IEEE [^2] 160.12-1990 [^3]:

> Requirement is 1) a condition or capability needed by a stakeholder to solve a problem or achieve an objective, 2) a condition or capability that must be met or possessed by a solution component to satisfy a contract, standard specification or other formally imposed documents, 3) a documented representation of a condition or capability as in 1) or 2).

And this is closer to what I mean by requirement here. Requirement is what's needed. It makes things work. And it's documented. Marvel us.

It is worth mentioning that requirements in software development MAY be divided into types, most commonly by the area they affect. I say MAY, because grouping things is subject to the situation. Wikipedia suggests:

- architectural requirements
- business requirements
- stakeholder requirements
- functional requirements
- quality-of-service requirements (nonfunctional requirements)
- implementation requirements

Although it makes sense, I see a flaw in this grouping: there are **_functional_** requirements, and all the others can be referred to as nonfunctional, because they are not, well, functional. That's why I'll continue with the functional vs nonfunctional thing.

Now I suggest a high level overview of the two:

| Functional                          | Nonfunctional                                   |
| ----------------------------------- | ----------------------------------------------- |
| Mandatory                           | Usually Optional                                |
| Achieving them creates a feature    | Achieving them creates a property of the system |
| Define capabilities of the software | Define the experience of using the software     |
| Outline use cases                   | Outline quality                                 |
| Define what the system does         | Define how the system does what it does         |

The reason why this differentiation is important is that nonfunctional requirements are usually very difficult to capture. Moreover, they may significantly affect the design of the software. If they do, they are considered Architecturally Significant.

But first things first.

## Functional requirements (FRs)

Generally, FRs describe expectations of what should happen based on given input.

They are the best fit to be presented as user stories [^4]. Of course, not all users stories are about functional requirements, but, come on, not all user stories are **_user stories_** either.

A very basic example of a functional requirement could be:

```markdown
If you aim to feed the world, what you produce should be edible.
```

Being `tasty` does not fall into the same category, though.

## Nonfunctional Requirements (NFRs)

I once had a conversation with an experienced colleague, where we discovered an interesting notion of his that nonfunctional requirements are just non-documented requirements. Can't blame them for that (backreference to user stories that are not user stories). When we have a task that clearly states that our website must be usable with screenreaders, we get into the trap of thinking that it's the functionality that we are about to add. Another thought that you might come across is that if the website must, than it is not that non-functional.

But things are a bit more complicated. An inarticulate definition of a NFR could be: `NFR outlines the operation of the system rather than specific capabilities`. It's a good array of words (I'd say it's a set but it has "the" repeated twice. #1 English word, so it goes). But it does not reflect the real meaning, so let's try looking from a different angle.

When it comes to things that you cannot test by doing, there must be other ways to test them anyway. As NFRs build up software properties, they have something to do with its quality. Luckily, both in broad and narrow terms. To gather metrics and analyze _**how**_ our system behaves, we can refer to so called **Quality Attributes** (QAs, or **ilities**) [^5]. Covering all of them is a long adventure so I'll make a dedicated series on that. I just leave the reference here for the future.

Identifying NFRs is hard as they are usually implied or even not considered at all. On the other hand, most NFRs are well known and can be applied to almost any project. But if we tried to create absolutely **robust**, **accessible**, **deployable**, **maintainable**, **secure**, **adaptable**, **testable**, `...`, **fault-tolerant** software, we would never live up to the day when that software is released. Fortunately, not all QAs (hence, NFRs) are equally important in different scenarios and we can play with trade-offs. If we create a blazing fast coffee-machine, performance is a priority. If we create a super-cheap one, performance can be compromised on.

This is why thinking about NFRs from the perspective of QAs makes their identification easier - you operate with generalized abstractions.

For each specific project, the most important QAs should be picked and decomposed into specific applicable NFRs. If you don't know which ones are important, filter out the obvious odds, and then ask the black box I mentioned before. Although NFRs seem to be non-important because of their squiggly and elusive nature, they can effectively render the hole project useless. And this is the time to talk about the main reason for this post.

## Architecturally significant requirements (ASRs)

NFRs are considered architecturally significant if their fullfilment is highly desired AND they require changes in the design of the system (a.k.a. architecture). The ugly truth is that, in most cases, either you need to find them yourself, or they come as a "small addition" during your tenth sprint [^6].

Let's just see some examples.

> There's a neccessity in an online store to read data from a file created by a third party service and put it to the database. But then, all of a sudden, it turns out that there might be many files from different services yet the structure is the same. And the data between files is referenced. And it may be repeated. And the ID field values are not unique because they were typed by hand. And the script reading those files will be executed in parallel to read many files at once. And there's only one database for all the files. And it's distributed. And it's Redis - yes, Redis. On two machines with 1Gb of RAM. In total. But only 10Mb are guaranteed to be free. And files are 1Gb on average.

As you can see, the simple script the developer has made no longer fits with those details in place. Not to mention the whole system. Or:

> A website for a futuristic dog show wants to attract more attention with photos of cute puppies on their website. To outline the unique setting, the photos should not be just ordinary photos, they should be ultra-modern AI-generated photos. The photos must have the "from puppies with love" capture in the bottom right corner. - OK, done. - Great. Now, are the photos in UltraHD? And they must definitely be served in less than a second. And we have 2 million requests per second, you know. By the way, we run the dog show in 50 countries worldwide. Also, is the "from puppies with love" translated into appropriate languages of the countries of our presence? Canada has two official languages, don't forget about that.

Of course, these examples are completely made up and cannot ever happen. Or can they? As you can see, NFRs can be a stumbling block. As I've said, ignoring them may have catastrophic consequences. And the nasty part is that, initially, no one even knows.

## TL;DR

```markdown
- Be cautious about "small additions" to requirements
- Stay in sync with the main sources of NFRs - business, stakeholders, architecture, and implementation
- Understand the context of the solution you are building
- Create a utility tree
- When working on fulfilling FRs, always keep NFRs in mind
- Be curious (**always be curious**)
```

[^7]

## What to do next

If you have any questions, feel free to tweet at me - [@orlovedev](https://twitter.com/orlovedev).

[^1]: **BABOK** - Business Analysis Body of Knowledge
[^2]: **IEEE** (pronounced I-triple-E) - Institute of Electrical and Electronics Engineers
[^3]: **IEEE 160.12-1990** - Standard Glosssary of Software Engineering Terminology
[^4]: **User Story** - an informal, natural language description of a feature of a software system
[^5]: **Quality Attributes** can be referred to as realized and categorized NFRs. They group NFRs together by... well, a quality attribute. And there are dozens of them: Accessibility, Deployability, Maintainability, Security, Robustness, Maintainability, Resilience, Fault Tolerance, Usability, Adaptability, Survivability, etc.
[^6]: **Sprint** (in Scrum) - a timeboxed iteration that has a goal and a set of objectives to be achieved by the team.
[^7]: **Utility Tree** - a thing I'll tell you about in a different post. If you can't wait, google it. 🙂
