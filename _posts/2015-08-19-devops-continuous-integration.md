---
layout: post
title: DevOps in the iOS World - Continuous Integration
category: post
author_twitter: pietbrauer
author_github: pietbrauer
---

# DevOps in the iOS World - Continuous Integration

Continuous integration should be a crucial part in every developers daily workflow. Some time ago most iOS Developers never heard of it, except they came from another platform. That luckily changed but I still see exceptions.

Continuous Integration (CI) originated as part of extreme programming (XP). Originally web applications where integrated once a week or once a month and every time a new version was integrated it resulted in an Integration Hell. Features broke and functionality was lost. To circumvent this integrations were moved from a weekly or monthly schedule to a daily or hourly schedule.

Before seeing the benefits of CI we first have to recap the broken workflow and I will try my best to map it to the iOS world.

## A broken Workflow

Imagine you are a developer of a 3 person team at some large corporation in the 90s developing kick-ass iOS enterprise apps. You are spending your day developing a mind blowing visualisation of business data (really cool with pie charts and everything).
Your colleagues are working on the data layer and integration with the backend. There are no stand ups, sprint planning etc. (I mean, you are paid to code, why spent all day in some rubbish meetings?).

You also have a deadline which is approaching quickly but you are confident as your code runs very smooth. As soon as your deadline is reached you will merge your changes with your colleagues.

### Merge Day - Shit just got real.

Holy cow. What did happen? Your stupid colleagues changed the whole data layer that totally broke all your visualisations. Now your boss is getting angry at you and wants you guys to fix it as soon as possible.
Even after you fixed all your merge conflicts in your Xcode project you are still faced with some significant changes in the data layer. You will spend the whole day fixing all your problems and go home at 5 a.m. with more bugs in your software than you might imagine.

While a drastic example and an unrealistic one (iOS didn’t exist in the 90s) it shows how broken things were in this team.

## A stress free workflow

Imagine you are a developer of a 10 person team at some large corporation in 2015, developing a kick-ass iOS recipe app (your mom loves it). You are Head of Image caching in your team and you have an upcoming release. You are calm.

### Release day - Coffee someone?

You pushed all your changes multiple times daily, so were your colleagues, the server ran all unit and integration tests and your beta is online and tested by your QA. You get a coffee and head home early so you can enjoy the weather.

## How to get from Integration Hell to Developers Heaven

What we have seen are two extreme scenarios which show the big gap between Integration Hell and Developers Heaven.

Continuous Integration describes a workflow which is proven to lead to a less stressful working life. Instead of integrating in large intervals, you integrate multiple times daily. You might also wonder what integrating even means, because you are so used to it you never thought of a word for it.

Integration means merging your code with the code of the others. Doing this in small intervals means you can react on changes and adopt to them in the code base more frequently. Integration usually happens in your Source Code Management (SCM) system, e.g. Git. It can happen when merging a Pull Request or merging a branch.
All Integrations are stored on a central server, e.g. GitHub, Bitbucket or Gitlab and on your local machine.

A Build Server continuously reacts on new changes to the code base. After it is triggered it:
 * downloads the latest code
* installs any new dependencies
* builds your app
* runs your Unit Tests
* runs your Integration Tests (e.g. KIF, UI Tests)
* notifies you if any failures occurred

Because it is doing it so frequently you see failures immediately and are able to react to them.

Some popular CI services that support iOS and Mac devlelopment are:
* [Travis CI](http://travis-ci.org)
* [Circle CI](http://circleci.com)
* [Bitrise](http://bitrise.io)
* [Ship.io](http://ship.io)
* [Greenhouse](http://greenhouseci.com)
* [Jenkins](https://jenkins-ci.org), [Bamboo](https://de.atlassian.com/software/bamboo) (self hosted)

I encourage you to try some of these out and find the one that best suits your needs and budget.

If you found yourself in the broken workflow story, I highly recommend setting up a continuous integration service in your company, most start with an old computer of a coworker. Start testing your code or just build the codebase to spot some configuration errors and you will soon be in Developers Heaven.
