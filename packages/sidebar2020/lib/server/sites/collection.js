import { extendCollection } from "meteor/vulcan:core";
import WebringSites from "../../modules/sites/collection.js";
import { getTwitterMetadata } from "../posts/callbacks.js";

extendCollection(WebringSites, {
  callbacks: {
    create: {
      before: [getTwitterMetadata],
    },
    update: {
      before: [getTwitterMetadata],
    },
  },
});
