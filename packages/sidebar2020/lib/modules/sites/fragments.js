import { registerFragment } from "meteor/vulcan:core";

registerFragment(/* GraphQL */ `
  fragment WebringSiteFragment on WebringSite {
    _id
    url
    feedUrl
    title
    twitterScreenName
    status
    userId
    user {
      ...UserFragment
    }
  }
`);
