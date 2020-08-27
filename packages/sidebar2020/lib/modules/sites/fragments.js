import { registerFragment } from "meteor/vulcan:core";

registerFragment(/* GraphQL */ `
  fragment WebringSiteFragment on WebringSite {
    _id
    url
    feedUrl
    title
    twitterScreenName
    twitterName
    twitterAvatarUrl
    status
    userId
    user {
      ...UserFragment
    }
  }
`);
