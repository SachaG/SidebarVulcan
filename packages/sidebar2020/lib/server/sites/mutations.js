import { addGraphQLMutation, addGraphQLResolvers } from "meteor/vulcan:core";
import { importRSSFeeds } from "./rssimport.js";

const importFromRSS = async (root, args, context) => {
  return await importRSSFeeds();
};

addGraphQLMutation(`importFromRSS: JSON`);
addGraphQLResolvers({ Mutation: { importFromRSS } });
