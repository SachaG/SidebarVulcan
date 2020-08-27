import { addMissingDomains, addMissingChargeInfo, addMissingTwitterData, updateUserTwitterData, migrateUserTwitterScreenNames } from "./scripts";
import Posts from '../modules/posts/collection.js';
import { renameFieldMigration } from './migrations';
import { checkForScheduledPosts } from './posts/cronjobs';

import { importRSSFeeds } from './sites/rssimport.js';

Meteor.startup(async function () {
  // await addMissingDomains();
  // await renameFieldMigration(Posts, 'categories', 'categoriesIds');
  // await renameFieldMigration(Posts, 'sponsored', 'isSponsored');
  // await checkForScheduledPosts();
  // await addMissingChargeInfo();
  // await migrateUserTwitterScreenNames();



  // await addMissingTwitterData();
  // await updateUserTwitterData();

  // await importRSSFeeds();
});

