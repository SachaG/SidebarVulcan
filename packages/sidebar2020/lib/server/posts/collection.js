import { extendCollection } from "meteor/vulcan:core";
import Posts from "../../modules/posts/collection.js";
import {
  checkForScheduledAt,
  checkForDuplicates,
  getTwitterMetadata,
  setDiscountAmount,
  setPostPaidAt,
  sendSponsorshipPaymentNotification,
} from "./callbacks";
// import { byCategorySlug } from "./filters";

import { apiSchema } from "./apischema.js";

extendCollection(Posts, {
  apiSchema,

  // customFilters: [byCategorySlug],
  // callbacks
  callbacks: {
    create: {
      validate: [checkForDuplicates, checkForScheduledAt],
      before: [getTwitterMetadata, setDiscountAmount],
    },
    update: {
      validate: [checkForDuplicates, checkForScheduledAt],
      before: [getTwitterMetadata, setDiscountAmount, setPostPaidAt],
      async: [sendSponsorshipPaymentNotification],
    },
  },
});
