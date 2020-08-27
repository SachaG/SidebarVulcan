import { createMutator } from 'meteor/vulcan:core';
import WebringSites from "../../modules/sites/collection.js";
import Posts from "../../modules/posts/collection.js";
import { webringStatus } from "../../modules/data.js";
import Parser from "rss-parser";
import { getMetadata } from '../helpers/metadata.js';

const parser = new Parser();

export const importRSSFeeds = async () => {

  // get all approved webring sites
  const sites = WebringSites.find({ status: webringStatus.approved })
    .fetch()

  console.log(`// Importing ${sites.length} RSS feeds…`);
  console.log(sites);

  for (const site of sites) {
    const { feedUrl, userId, twitterScreenName } = site

    // fetch RSS feed contents
    const feed = await parser.parseURL(feedUrl);
    
    console.log(feed.title);
    
    for (const item of feed.items) {
      console.log(item);

      const { title, link: url, guid} = item;

      // get metadata to get "clean" description and twitter credit
      const metadata = await getMetadata(url);
      const { description: body, twitter } = metadata;
      const credit = twitter || twitterScreenName;
      
      console.log(metadata);
      
      const data = {
        title, url, guid, userId, body, credit
      };

      // check if post already exists
      const postExists = !!Posts.findOne({ guid });

      // create post
      createMutator({
        collection: Posts,
        data,
      });
      
    });
  }
};
