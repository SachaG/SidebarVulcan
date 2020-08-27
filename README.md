# Sidebar

This is the codebase for [Sidebar](http://sidebar.io/), a daily newsletter of design-related links. It's built with [Vulcan.js](http://vulcanjs.org/), a full-stack React/GraphQL framework.

This app is used both to display links, accept link submission, and subscribe users to the mailing list; as well as to moderate the link queue and schedule newsletters.

## Should I Use This?

If you intend to use this codebase as a starting point for your own project, in addition to basic **HTML/CSS** knowledge you should already be familiar with **React** at the very least, and ideally have a basic understanding of how **GraphQL** works (or be willing to learn). Being familiar with **Node** is also a plus. 

Note that this is a production codebase for a real-world app, and as such being easy to customize or adapt is not its first priority. Be ready to have to get your hands dirty to change a lot of the design, content, behavior, etc. if you want to reuse this for your own project. 

## License

This codebase is provided mainly for educational purposes, but it is MIT-licensed meaning that you can freely reuse parts of all of it for your own projects, including commercial applications.

Note that this only applies to **code**. All graphic assets, color palettes, text content, images, logos, etc. are _not_ MIT-licensed and **should not** be reused. So if you do want to use the code, please take the time to remove or change these assets.

## Installation

#### 1. Two-Repo Install

Please follow the [Vuclan two-repo install](https://docs.vulcanjs.org/#Two-Repo-Install-Optional) to get the latest version of Vulcan's `devel` branch.

#### 2. Install NPM packages

Install NPM packages with `yarn` or `npm install`. 

#### 3. Create your `settings.json` file

Create a new `settings.json` file at the root of your project and copy over the contents of `settings-sample.json`. 

At minimum, you will need to configure the settings with a Twitter API key to enable Twitter login. Note that your settings will not be publicly accessible *unless* they are within the `public` block of the JSON object, in which case they *will* be published to the client. 

#### 4. Run the app

Run the app with:

```
npm start
```

## Settings

You will need your own `settings.json` file. You can check out the included `settings-sample.json` file and use it as a starting point.

## Main Features

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

## Screencasts

If you're looking for a quick overview of the codebase, [screencasts are available on YouTube](https://www.youtube.com/playlist?list=PLBoa_Q6hVeSzm3sMjcxImwu2uLTk5-WpT).

## Code Overview

All code for the Sidebar app is contained within the `sidebar2020` package. It's split into three sub-directories corresponding to the environment the code will run into: client, server, and both (the `modules` directory), plus a `components` directory (components also run in both environments).

The codebase generally follows a feature-first organization, meaning that all code related to a specific feature (posts, categories, users, etc.) is grouped together rather than grouping code by what it actually does (GraphQL code, cron jobs, models, etc.).

### File Types

The majority of files in this codebase follow the same naming convention. Here is a quick overview.

| **Name**   | **Description** | 
| ----------------- | ------------ |
| `main.js` | The entry point for the client or server bundle |
| `index.js` | Centralizes all the imports in a directory |
| `collection.js` | Create or extend a collection (a.k.a. model) |
| `schema.js` | A model's schema (list of fields) |
| `helpers.js` | Various helpers related to a model |
| `callbacks.js` | Server-side callbacks that should run before or after a given model's CRUD mutations |
| `apischema.js` | A model's API-only (i.e. not present in the database) fields |
| `fragments.js` | Fragments are a way to control what fields to load when requesting data |

### Feature Index

Here is a cross-reference of the various Vulcan features used in the app and where the corresponding code lives.

#### Components

| **Feature/API**   | **Location** |
| ----------------- | ------------ |
| useQuery | [PostHome.jsx](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/components/posts/PostHome.jsx#L37)          |
| Cell | [PostCell.jsx](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/components/posts/PostCell.jsx) |
| Datatable | [AdminPosts.jsx](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/components/admin/AdminPosts.jsx) |
| SmartForm | [PostSubmit.jsx](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/components/posts/PostSubmit.jsx), [SponsorSubmit](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/components/sponsor/SponsorSubmit.jsx)|


#### Modules (Client/Server)

| **Feature/API**                                  | **Location**                                                                                                                                                                                                                                                      |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Schema definition                                | [schema.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/modules/posts/schema.js)                                                                                                                                                 |
| Field-specific query                             | [schema.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/modules/posts/schema.js#L87-L95)                                                                                                                                         |
| onCreate, onUpdate callbacks                     | [schema.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/modules/posts/schema.js#L221-L230)                                                                                                                                       |
| Field decorator (makeAutocomplete)               | [schema.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/modules/posts/schema.js#L334)                                                                                                                                            |
| Field relations                                  | [schema.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/modules/posts/schema.js#L380-L384)                                                                                                                                       |
| Custom input                                     | [schema.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/modules/posts/schema.js#L85), [ScheduledAtInput.jsx](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/components/posts/ScheduledAtInput.jsx) |
| Fragment definition                              | [fragments.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/modules/posts/fragments.js)                                                                                                                                           |
| addToFragmentMatcher                             | [graphql.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/modules/graphql.js)                                                                                                                                                     |
| extendCollection                                 | [collection.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/modules/users/collection.js#L5)                                                                                                                                      |
| Routes (with layoutComponent and access control) | [routes.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/modules/routes.js)                                                                                                                                                       |

#### Server

| **Feature/API**    | **Location**                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Cache              | [cache.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/server/cache.js)                       |
| Cron               | [cron.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/server/cron.js)                         |
| DB Indexes         | [indexes.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/server/indexes.js)                   |
| apiSchema          | [apischema.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/server/posts/apischema.js)         |
| Callbacks          | [callbacks](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/server/posts/callbacks.js)            |
| Custom mutations   | [mutations.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/server/posts/graphql/mutations.js) |
| Custom queries     | [queries.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/server/posts/graphql/queries.js)     |
| RSS feed           | [rss.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/server/posts/rss.js)                     |
| REST API           | [api.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/server/posts/api.js)                     |
| Emails             | [emails.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/server/emails/emails.js)              |
| GraphQL Union Type | [graphql.js](https://github.com/SachaG/SidebarVulcan/blob/master/packages/sidebar2020/lib/server/charges/graphql.js#L5)        |

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
