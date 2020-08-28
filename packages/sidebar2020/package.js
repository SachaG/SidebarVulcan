Package.describe({
  name: `sidebar2020`,
});

const version = `1.16.0`;

Package.onUse((api) => {
  api.use([
    `fourseven:scss@4.12.0`,

    // vulcan core
    `vulcan:core@${version}`,

    // vulcan packages
    `vulcan:debug@${version}`,
    `vulcan:ui-bootstrap@${version}`,
    `vulcan:email@${version}`,
    `vulcan:forms@${version}`,
    `vulcan:accounts@${version}`,
    `vulcan:payments@${version}`,
    `vulcan:admin@${version}`,

    `vulcan:events@${version}`,
    `vulcan:events-internal@${version}`,
    `vulcan:events-ga@${version}`,
    `vulcan:errors-sentry@${version}`,
  ]);

  api.addFiles([`lib/stylesheets/main.scss`], [`client`]);

  api.addAssets(
    [
      `lib/server/emails/common/wrapper2.handlebars`,
      `lib/server/emails/posts/postApproved2.handlebars`,
      `lib/server/emails/newsletter/newsletter2.handlebars`,
      `lib/server/emails/sponsored/sponsoredPaid2.handlebars`,
      `lib/server/emails/webring/webringSiteApproved.handlebars`,
    ],
    [`server`]
  );

  api.mainModule(`lib/server/main.js`, `server`);
  api.mainModule(`lib/client/main.js`, `client`);
});
