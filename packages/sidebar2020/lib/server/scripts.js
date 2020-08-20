/* eslint-disable no-console */

import Posts from "../modules/posts/collection";
import { postStatus } from "../modules/data";
import { Utils } from "meteor/vulcan:core";
import { Charges } from "meteor/vulcan:payments";
import get from "lodash/get";
import Jobs from "../modules/jobs/collection";
import { getTwitterData } from "./helpers/twitter";
import { getMetadata } from "./helpers/metadata";
import { removeAtSymbol } from "../modules/posts/helpers";
import Users from "meteor/vulcan:users";

const limit = 2000;
const rateLimit = 5000;

export const addMissingDomains = () => {
  console.log(`// Running addMissingDomains script…`);
  const posts = Posts.find(
    { status: postStatus.published, domain: { $exists: false } },
    { sort: { postedAt: -1 }, limit }
  ).fetch();
  console.log(`-> Found at least ${posts.length} posts without a domain.`);
  posts.forEach((post) => {
    Posts.update(
      { _id: post._id },
      { $set: { domain: Utils.getDomain(post.url) } }
    );
  });
  console.log(`-> Done adding missing domains to ${posts.length} posts.`);
};

// TODO
export const addMissingCredit = () => {
  console.log(`// Running addMissingCredit script…`);
  const posts = Posts.find(
    { status: postStatus.published, domain: { $exists: false } },
    { sort: { postedAt: -1 }, limit }
  ).fetch();
  console.log(`-> Found at least ${posts.length} posts without a domain.`);
  posts.forEach((post) => {
    Posts.update(
      { _id: post._id },
      { $set: { domain: Utils.getDomain(post.url) } }
    );
  });
  console.log(`-> Done adding missing credit to ${posts.length} posts.`);
};

export const addMissingChargeInfo = async () => {
  console.log(`// Running addMissingChargeInfo script…`);
  const charges = Charges.find({
    $or: [
      { associatedId: { $exists: false } },
      { associatedCollection: { $exists: false } },
      { amount: { $exists: false } },
      { stripeId: { $exists: false } },
    ],
  }).fetch();
  console.log(`-> Found at least ${charges.length} charges with missing data.`);
  charges.forEach(async (charge) => {
    const data = {
      amount: get(charge, "data.amount"),
      stripeId: get(charge, "data.id"),
    };

    if (charge.productKey === "jobPosting") {
      const userId = get(charge, "data.metadata.userId");
      const job = await Jobs.findOne({ userId });
      data.associatedCollection = "jobs";
      data.associatedId = job._id;
    } else if (charge.productKey === "sponsorship") {
      const url = get(charge, "properties.url");
      const post = await Posts.findOne({ url });
      data.associatedCollection = "posts";
      data.associatedId = post._id;
    }

    await Charges.update({ _id: charge._id }, { $set: { ...data } });
  });
  console.log(`-> Done adding missing data to ${charges.length} charges.`);
};

export const addMissingTwitterData = async () => {
  console.log(`// Running addMissingTwitterData script…`);
  const posts = Posts.find(
    { status: postStatus.published, credit: { $exists: false } },
    { sort: { postedAt: -1 }, limit }
  ).fetch();
  console.log(
    `-> Found at least ${posts.length} posts with missing Twitter data.`
  );
  posts.forEach(async (post, i) => {
    const metadata = await getMetadata(post.url);
    const { twitter } = metadata;
    if (twitter && twitter.indexOf("@") !== -1) {
      Meteor.setTimeout(async () => {
        const twitterData = await getTwitterData(twitter);
        if (twitterData) {
          console.log(`Post ${post.title}: ${twitter}`)
          Posts.update(
            { _id: post._id },
            { $set: { credit: removeAtSymbol(twitter), ...twitterData } }
          );
        }
      }, rateLimit);
    }
  });
  console.log(`-> Done adding missing twitter data to ${posts.length} posts.`);
};

export const migrateUserTwitterScreenNames = async () => {
  console.log(`// Running migrateUserTwitterScreenNames script…`);
  const users = Users.find(
    {
      twitterScreenName: { $exists: false },
    },
    { sort: { createdAt: 1 }, limit }
  ).fetch();
  let count = 0;
  console.log(
    `-> Found at least ${users.length} users with missing twitter screen names.`
  );
  users.forEach(async (user, i) => {
    const twitterScreenName = get(user, "services.twitter.screenName");
    if (twitterScreenName) {
      console.log(`twitter: ${twitterScreenName}`);
      count++;
      await Users.update({ _id: user._id }, { $set: { twitterScreenName } });
    }
  });
  console.log(`-> Done adding missing twitter screen names to ${count} users.`);
};

export const updateUserTwitterData = async () => {
  console.log(`// Running updateUserTwitterData script…`);
  const users = Users.find(
    { avatarUrl: { $exists: false } },
    { sort: { createdAt: 1 }, limit }
  ).fetch();
  let count = 0;
  console.log(
    `-> Found at least ${users.length} users with missing twitter data.`
  );
  users.forEach(async (user, i) => {
    const twitterScreenName = get(user, "services.twitter.screenName");
    console.log(`twitter: ${twitterScreenName}`);
    if (twitterScreenName && twitterScreenName.indexOf("@") !== -1) {
      Meteor.setTimeout(async () => {
        const twitterData = await getTwitterData(twitterScreenName);
        if (twitterData) {
          console.log(twitterData);
          count++;
          const { twitterAvatarUrl: avatarUrl, twitterName } = twitterData;
          await Users.update(
            { _id: user._id },
            { $set: { avatarUrl, twitterName, twitterScreenName } }
          );
        }
      }, rateLimit);
    }
  });
  console.log(`-> Done adding missing twitter data to ${count} users.`);
};
