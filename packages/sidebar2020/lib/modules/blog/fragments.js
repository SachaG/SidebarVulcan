import { registerFragment } from "meteor/vulcan:core";

registerFragment(`
  fragment BlogPostFragment on BlogPost {
    postedAt
    postedAtFormatted
    excerpt
    body
    slug
    title
    twitterScreenName
    userId
    user{
      ...UserFragment
    }
    pagePath
    pageUrl
    image
  }
`);
