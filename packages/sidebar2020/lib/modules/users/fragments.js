import { registerFragment, extendFragment } from "meteor/vulcan:core";

extendFragment(
  "UsersCurrent",
  /* GraphQL */ `
  webringSites{
      ...WebringSiteFields
    }
`
);

registerFragment(/* GraphQL */ `
  fragment UserFragment on User {
    _id
    slug
    username
    displayName
    emailHash
    avatarUrl
    pagePath
    pageUrl
    twitterScreenName
    twitterName
    email
  }
`);
