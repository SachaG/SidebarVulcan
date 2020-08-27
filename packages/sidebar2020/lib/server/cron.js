import moment from 'moment';
import { CronJob } from 'cron';
import { getSetting } from 'meteor/vulcan:core';
import { checkForScheduledPosts } from './posts/cronjobs';
import { importRSSFeeds } from './posts/webring.js';

const runCrons = getSetting('runCrons', true);

const allCrons = async () => {
  if (runCrons) {
    // eslint-disable-next-line no-console
    console.log(`[Running cron jobs at ${moment().format('YYYY/MM/DD, hh:mm')}]`);
    await checkForScheduledPosts();
    await importRSSFeeds();
  }
};

new CronJob(
  '0 * * * *', // run every hour
  Meteor.bindEnvironment(function() {
    allCrons();
  }),
  null,
  true,
  'Asia/Tokyo'
);
