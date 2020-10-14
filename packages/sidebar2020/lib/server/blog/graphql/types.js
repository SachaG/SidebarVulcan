import {
  addGraphQLSchema,
} from "meteor/vulcan:core";

const blogPostType = `
type BlogPost {
  slug: String
  title: String
  postedAt: Date
  postedAtFormatted: String
  excerpt: String
  body: String
  bodyHtml: String
  twitterScreenName: String
  userId: String
  user: User
  pagePath: String
  pageUrl: String
  image: String
}`;

addGraphQLSchema(blogPostType);
