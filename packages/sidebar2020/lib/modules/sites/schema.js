import { makeAutocomplete } from "meteor/vulcan:core";
import { webringStatusOptions } from '../../modules/data.js';

export default {
  _id: {
    type: String,
    canRead: ["guests"],
    optional: true,
  },

  title: {
    type: String,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners"],
  },

  url: {
    type: String,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners"],
  },

  feedUrl: {
    type: String,
    description: "The site's RSS feed URL",
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners"],
  },

  twitterScreenName: {
    type: String,
    optional: true,
    description: "The Twitter account associated with the site",
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners"],
  },

  userId: makeAutocomplete(
    {
      type: String,
      canRead: ["guests"],
      canCreate: ["members"],
      canUpdate: ["owners"],
      relation: {
        fieldName: "user",
        typeName: "User",
        kind: "hasOne",
      },
    },
    { autocompletePropertyName: "displayName" }
  ),

  status: {
    type: Number,
    optional: true,
    canRead: ["guests"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
    input: "radiogroup",
    defaultValue: webringStatusOptions.pending,
    options: webringStatusOptions,
  },

};
