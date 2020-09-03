import { extendCollection } from "meteor/vulcan:core";
import WebringSites from "../../modules/sites/collection.js";
import { getTwitterMetadata } from "../posts/callbacks.js";
import { sendSiteApprovedNotification } from "./callbacks.js";
import apiSchema from './apischema.js';

extendCollection(WebringSites, {

  apiSchema,
  
  callbacks: {
    create: {
      before: [getTwitterMetadata],
    },
    update: {
      before: [getTwitterMetadata],
      async: [sendSiteApprovedNotification],
    },
  },
});
