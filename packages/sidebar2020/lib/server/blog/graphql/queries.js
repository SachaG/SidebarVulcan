import {
  addGraphQLQuery,
  addGraphQLResolvers,
  nodeCache,
} from "meteor/vulcan:core";

const blogPost = async (root, { slug }, context) => {
  const posts = nodeCache.get("blogPosts");
  return posts.find((p) => p.slug === slug);
};

const blogPosts = async (root, args, context) => {
  const posts = nodeCache.get("blogPosts");
  return posts;
};

addGraphQLQuery(`blogPost(slug: String): BlogPost`);
addGraphQLQuery(`blogPosts: [BlogPost]`);
addGraphQLResolvers({ Query: { blogPost, blogPosts } });
