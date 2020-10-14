import {
  addGraphQLQuery,
  addGraphQLResolvers,
  nodeCache,
} from "meteor/vulcan:core";
import { loadPosts } from "../load_posts.js";

const blogPost = async (root, { slug }, context) => {
  const posts = nodeCache.get("blogPosts") || (await loadPosts());
  return posts && posts.find((p) => p.slug === slug);
};

const blogPosts = async (root, args, context) => {
  const posts = nodeCache.get("blogPosts") || (await loadPosts());
  return posts;
};

addGraphQLQuery(`blogPost(slug: String): BlogPost`);
addGraphQLQuery(`blogPosts: [BlogPost]`);
addGraphQLResolvers({ Query: { blogPost, blogPosts } });
