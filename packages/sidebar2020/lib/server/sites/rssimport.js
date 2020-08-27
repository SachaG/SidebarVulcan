import { createMutator } from "meteor/vulcan:core";
import WebringSites from "../../modules/sites/collection.js";
import Posts from "../../modules/posts/collection.js";
import { webringStatus, postStatus } from "../../modules/data.js";
import Parser from "rss-parser";
import { getMetadata } from "../helpers/metadata.js";

const parser = new Parser();

// only keep the first 5 rss items at a time
const limitItems = (items) => items.slice(0, 5);

export const importRSSFeeds = async () => {
  // get all approved webring sites
  const sites = WebringSites.find({ status: webringStatus.approved }).fetch();
  let totalCount = 0;

  console.log(`[--- Importing ${sites.length} RSS feeds ---]`);

  for (const site of sites) {
    const { url, feedUrl, userId, twitterScreenName } = site;
    let count = 0;

    // fetch RSS feed contents
    const feed = await parser.parseURL(feedUrl);
    const items = limitItems(feed.items);

    console.log(`// Parsing feed for ${url}, ${items.length} items found`);

    for (const item of items) {
      const { title, link: url, isoDate } = item;

      // get metadata to get "clean" description and twitter credit
      const metadata = await getMetadata(url);
      const { description: body, twitter } = metadata;
      const credit = twitter || twitterScreenName;

      const data = {
        title,
        url,
        userId,
        body,
        credit,
        status: postStatus.pending,
        webringSiteId: site._id,
        scheduledAt: new Date(isoDate),
      };

      // check if post already exists
      const postExists = !!Posts.findOne({ url });

      if (!postExists) {
        console.log(`  - Importing post “${title}”…`);
        count++;
        // create post
        try {
          await createMutator({
            collection: Posts,
            data,
            validate: false,
            currentUser: { isAdmin: true },
          });
        } catch (e) {
          throw Error(e);
        }
      }
    }

    console.log(`  -> Imported ${count} new items.`);

    totalCount += count;
  }
  return { totalCount };
};
