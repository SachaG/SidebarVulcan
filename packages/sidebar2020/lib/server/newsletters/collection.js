import { extendCollection } from "meteor/vulcan:core";
import Newsletters from "../../modules/newsletters/collection.js";
import { generateNewsletter } from "./callbacks";

extendCollection(Newsletters, {

  // callbacks
  callbacks: {
    create: {
      before: [generateNewsletter],
    },
    update: {
      before: [generateNewsletter],
    },
  },
});
