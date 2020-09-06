import { registerFragment } from "meteor/vulcan:core";

registerFragment(`
  fragment BlogPostFragment on BlogPost {
    postedAt
    postedAtFormatted
    body
    slug
    title
    twitterScreenName
    userId
    user
  }
`);
