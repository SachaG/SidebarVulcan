# Sidebar

This is the codebase for [Sidebar](http://sidebar.io/), a daily newsletter of design-related links. It's built with [Vulcan.js](http://vulcanjs.org/), a full-stack React/GraphQL framework.

This app is used both to display links, accept link submission, and subscribe users to the mailing list; as well as to moderate the link queue and schedule newsletters. 

## License

This codebase is provided mainly for educational purposes, but it is MIT-licensed meaning that you can freely reuse parts of all of it for your own projects, including commercial applications. 

Note that this only applies to **code**. All graphic assets, color palettes, content, images, logos, etc. are *not* MIT-licensed and **should not** be reused. So if you do want to use the code, please take the time to remove or change these assets. 

## Installation

Please follow the [Vuclan two-repo install](https://docs.vulcanjs.org/#Two-Repo-Install-Optional) to get the latest version of Vulcan's `devel` branch, and then run:

```
npm start
```

## Settings

You will need your own `settings.json` file. You can check out the included `settings-sample.json` file and use it as a starting point. 

## Features

The Sidebar app is divided into two main parts. 

### Public-Facing Site

This is what users have access to on [Sidebar](http://sidebar.io/). The main features include:

- A list of recent links on the homepage. 
- Link archives.
- Newsletter sign-up widget.
- Sponsorship sign-up flow. 
- Link submission page. 

### Admin Area

The admin area is used to moderate links and send out newsletters. It includes: 

- A link (a.k.a. posts) moderation dashboard. 
- A newsletter scheduling dashboard.
- Other dashboards for users, categories, discounts, etc.

## Codebase

All code for the Sidebar app is contained within the `sidebar2020` package. It's split into three sub-directories corresponding to the environment the code will run into: client, server, and both (the `modules` directory), plus a `components` directory (components also run in both environments).

The codebase generally follows a feature-first organization, meaning that all code related to a specific feature (posts, categories, users, etc.) is grouped together rather than grouping code by what it actually does (GraphQL code, cron jobs, models, etc.).

## Integrations

The app relies on a few external service providers: 

- [EmailOctopus](https://emailoctopus.com/) for newsletter sending. 
- [Stripe](https://stripe.com/) for payment processing. 
- [Sentry](https://sentry.io/) for error tracking. 
- [Twitter](http://twitter.com/) for fetching avatars. 
- [Google Analytics](https://analytics.google.com/) for analytics. 

Note that missing the API keys (in your `settings.json` file) for one or more of these services might lead to errors and/or warnings that might prevent you from running the app properly. 

## Support

Although this codebase is provided as-is without any guarantees of support, you can ask questions in the [Vulcan Slack](http://slack.telescopeapp.org/).