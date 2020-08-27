import { Connectors, updateMutator } from "meteor/vulcan:core";
import moment from "moment";
import Posts from "../../modules/posts/collection";
import Discounts from "../../modules/discounts/collection";
import { postStatus } from "../../modules/data";
import get from "lodash/get";
import VulcanEmail from "meteor/vulcan:email";
import { getTwitterData } from "../helpers/twitter";

export const getTwitterMetadata = async (data) => {
  const twitterScreenName = data.twitterScreenName || data.credit;
  if (!twitterScreenName) {
    return data;
  } else {
    const twitterData = await getTwitterData(twitterScreenName);
    return { ...data, ...twitterData };
  }
};

export const checkForScheduledAt = async (validationErrors, { data }) => {
  if (data.isSponsored && !data.scheduledAt) {
    validationErrors.push({
      id: "app.missing_scheduled_at",
      path: "scheduledAt",
    });
  }
  return validationErrors;
};

export const checkForDuplicates = async (
  validationErrors,
  { document, data }
) => {
  const url = data.url;
  const _id = document._id || data._id;
  // if there is no URL, abort check
  if (!url) {
    return validationErrors;
  }
  // check that there are no previous published posts with the same link in the past 6 months
  const sixMonthsAgo = moment().subtract(6, "months").toDate();
  const selector = {
    url,
    status: postStatus.published,
    postedAt: { $gte: sixMonthsAgo },
  };

  // if we are updating a post, exclude itself from the check
  if (_id) {
    selector._id = { $ne: _id };
  }

  const duplicatePost = await Connectors.get(Posts, selector);
  if (duplicatePost) {
    validationErrors.push({
      id: "app.duplicate_post",
      path: "url",
      properties: {
        duplicatePostId: duplicatePost._id,
      },
    });
  }
  return validationErrors;
};

export const setDiscountAmount = async (data, { document }) => {
  const { discountCode, isSponsored } = data;
  if (isSponsored && discountCode) {
    const discount = await Connectors.get(Discounts, { code: discountCode });
    if (discount) {
      data.discountAmount = discount.amount || 0;
    }
  }
  return data;
};

export const setPostPaidAt = (data, { context }) => {
  // only trigger when we're in the process of creating a Stripe charge
  if (context.event === "stripe.process.sync") {
    data.paidAt = new Date();
    data.status = postStatus.scheduled; // mark as paid
    data.sponsorshipPrice = get(context, "chargeDoc.data.amount");
  }
  return data;
};

export const sendSponsorshipPaymentNotification = async ({
  document: post,
  context,
}) => {
  // only trigger when we're in the process of creating a Stripe charge
  if (context.event === "stripe.process.sync") {
    await VulcanEmail.buildAndSend({
      emailName: "postApproved",
      variables: { input: { id: post._id } },
    });
  }
};

// export const tweetLink = async ({ document: post }) => {
//   console.log('// tweetLink')
//   if (!post.tweetedAt) {

//     createTweet

//     await updateMutator({
//       collectton: Posts,
//       documentId: post._id,
//       data: { tweetedAt: new Date() }
//     });
//   }
// }
