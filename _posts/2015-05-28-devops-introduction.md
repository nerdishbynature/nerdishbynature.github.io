---
layout: post
title: DevOps in the iOS World — Introduction
category: post
--- 

*DevOps* — You may have read this term in various links on HackerNews, job offers or conversations in your company and so did I. The sad thing is that I couldn't relate to the term and took it as a job title which combined development work and operations tasks in one person, but then @bjoernrochel introduced me to the book [The Phoenix project](http://www.amazon.com/The-Phoenix-Project-Helping-Business/dp/0988262592).

## The Phoenix project

The Phoenix project is a fictional novel about an IT manager in a car parts manufacturer called „Parts Unlimited“. This company is organized in the most old fashioned way you can imagine.
In the beginning of the book the protagonist gets promoted and faces the mess his predecessors left, naming a desolate IT infrastructure with systems failing every hour and more outages than you can count.
Shortly after his promotion he begins his renovation journey supported by an experienced mentor who used to manage production lines.
Long story short: he slowly comes across the DevOps mindset and introduces it in his company. Systems are getting more stable, developers spend their time on developing features not mitigating outages and people are getting happier.
I don't want to spoil all of it and if you are interested I highly encourage you to read it.

## What exactly is DevOps?

DevOps is coming from a time where you developed an application and had 3 months plus release cycles. You would hand your carefully crafted software with incomplete setup instructions to the operations team to deploy your project. But every second time the deployment would fail because your development, test and production environment wouldn't match. The final integration was never tested before. Deployments are a series of manual tasks you would run on your root server in order to provision it. Once in a while you forgot one and the application failed to run on the server correctly.

After seeing that for some decades some smart people came around and thought they could do better. They build cross functional teams namely: Developers, Operations, QA and product managers. But, they did not only bring everyone together, they also worked on automation.
They streamlined creation of development, test and production systems and checked everything into version control.
What has been a manual setup process for new employees taking days to get setup, now is a simple script. The same way you configured your computer, you would provision the server to match the packages, scripts and code. Tools like [Chef](https://www.chef.io/), [ansible](http://www.ansible.com/home) and [Capistrano](http://capistranorb.com/) where developed to help you even further.

Teams would take over responsibility for server provisioning and  deployment and go from 2 - 4 releases a year to 10 deployments a day. This reduced the feedback loop, features could be developed much faster and overall developer happiness increased.

## Thats all backend stuff why would I, as an iOS developer, care?

While working at my previous companies I have seen a lot of things go wrong and a lot of things go right. When reading my Twitter stream or talking to friends I hear things like:

> „Sorry, I can't join for beer tonight. I have to release a new version“ (Friday evening at 10 pm)

> „Code signing sucks, Apple should fix that.“

> „We build because our release configuration is different from our Beta config. Some files and images are missing. It sure worked on my old computer.“

Once you realize that you have the same problems as an iOS developer in 2015 like the backend folks had 5 years ago, you begin to think that we are not that different.
The one and only solution of this is to adapt your work to an DevOps like workflow: Build cross functional teams, streamline configurations and automate.

In the following weeks I will write blog posts about:

- Streamline Configurations in Xcode
- Continuous Testing
- Continuous Integration
- Continuous Deployment

I saw some great impact at @xing, once we increased the automation in our team, even when we where only 2 - 3 people.
We now do biweekly (App Store) release cycles and everything just became easier since we have automated the tasks we do over and over.
For us building an App Store release is nothing more than pushing to a branch and each step is automated afterwards:

- Tests are run
- Beta app is deployed to HockeyApp
- Live app is deployed to iTunes Connect.

All the automated testing and manual quality assurance of features took place continuously during development.

I would even go so far to say that even if you are a sole developer working on your part time project, automation can save you hours, if not days, of work.
It also reduces your stress level when you know that doing an App Store release is nothing more than a commit (yes, even code signing).

So stay tuned, follow me on Twitter [@pietbrauer](https://twitter.com/pietbrauer) or subscribe to the [RSS feed](http://nerdishbynature.com/feed.xml) to get the latest updates.