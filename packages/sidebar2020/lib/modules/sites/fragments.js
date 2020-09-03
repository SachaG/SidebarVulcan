import { registerFragment } from "meteor/vulcan:core";

registerFragment(/* GraphQL */ `
  fragment WebringSiteFields on WebringSite {
    _id
    url
    feedUrl
    title
    twitterScreenName
    twitterName
    twitterAvatarUrl
    status
    userId
    createdAt
    code
    # color
  }
`);


registerFragment(/* GraphQL */ `
  fragment WebringSiteFragment on WebringSite {
    ...WebringSiteFields
    user {
      ...UserFragment
    }
  }
`);



registerFragment(/* GraphQL */ `
  fragment WebringSiteFullFragment on WebringSite {
    ...WebringSiteFields

    posts {
      title
      url
      postedAt
      postedAtFormatted
    }

    user {
      ...UserFragment
    }
  }
`);
