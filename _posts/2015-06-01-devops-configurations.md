---
layout: post
title: DevOps in the iOS World — Streamline Configurations
category: post
author_twitter: pietbrauer
author_github: pietbrauer
---


In my previous article I gave a quick overview of the DevOps mindset in perspective to the iOS world. In this first article of the series, I want to go a bit deeper in how to align multiple configurations in your project.

## What is a configuration?

One problem developers in the pre-DevOps age where fighting with were the different environments your application runs in. Environments were not the same and bugs only occurred in QA or Live environments.

Possible environments are:

- **Development**, your daily working environment. Your project local machine and the machines of your colleagues.

- **Test** is the environment your quality assurance people run your applications that might be sandbox systems of your web application, your unit test configuration or even your Beta deployment.

- **Production** is the live environment that is the AppStore for most people. But could also be an internal AppStore or the distribution system your enterprise app is be distributed through.

The goal of streamlining your configurations is to get each stage of development as close as possible to each other. This makes sure you can reproduce bugs and your app is overall the same in all stages of development.
The only parts that should differ are the ones specific to the environment, such as URLs, authentication keys and other constants. The rule of thumb is: _The less, the better._

Things that should not differ:

- Files that are compiled

- Assets (images and text resources)

- Code Paths

## Targets vs. Configurations

When I started with iOS development under Xcode 3 it was common to use different targets for each stage of development. You would have a debug target, a beta target and a release target and if you work on a legacy project you might still see this. And I will give you my tip: **Delete them all**.

Targets make everything very hard. When adding a class or an asset you have to make sure each of the targets is checked (which it isn't by default). So it might occur that, when you compile in a different target, some classes and images are missing and you have no clue what happened.

_The solution is to replace targets with configurations._ You can add new configurations to your project in the projects settings in Xcode. Some valid configurations are

- **Debug** to develop your app and run unit and integration tests.

- **Beta** for beta distribution over HockeyApp or Fabric. You won't need that for Apples Testflight.

- **Release** for submission to the AppStore and Tesflight.

### Valid usage of targets

Of course there are some valid usages for targets and there is also a simple rule for that: Every extension has to be a target. That is Watch extensions, share extensions and today view extensions. For each of these cases Xcode is taking care of adding the targets.

## Differentiate between configurations

If you _have to_ differentiate between the different configurations do yourself a favor and use as little Preprocessor macros as possible. There are a few reasons against them

- Complex macros don't work well with Swift

- they are not unit testable and

- code enclosed is only compiled if the macro is active

At @xing we use different bundle identifiers for each stage. This also allows you to install multiple versions of the app at once. To see which stage we are running in at runtime, we use a simple method that gives back the current configuration. We only use these switches for different tracking suites and for the HockeyApp identifiers.

#### Adding different bundle identifiers

In your **projects build settings** add a `User-Defined Setting` and name it `BUNDLE_ID_SUFFIX`. Take the configurations as the value `.$(CONFIGURATION)`.

In your **projects Info.plist** edit the `CFBundleIdentifier` value to `com.YourCompany.AppName$(BUNDLE_ID_SUFFIX)` this results in a Bundle Identifier like `com.YourCompany.AppName.Debug`.

You can add a helper method for getting the current configuration:

<script src="https://gist.github.com/pietbrauer/0780ba0a9fd5f48661cc.js"></script>

This approach gives you the opportunity to test your code paths in unit tests by mocking the `infoDictionary`.

## Make it configurable

If you are in need for different API endpoints for each stage, it is best to make them choosable from within the app.
Use a small `UITableView` to list them and let your beta users choose the environment they want to test in. This makes sure you don't depend on a configuration and everything is exchangeable and it also leads to cleaner code as the options are clearly identified and documented.

## Conclusion

I hope you do most of the things listed above already and if you take over a project or start a new one it is best to grab a pen and paper and get a clear overview of the needed configurations.
Simply write them down and identify the differences. **Make parameters exchangeable** and use **Xcode configurations over targets**.
