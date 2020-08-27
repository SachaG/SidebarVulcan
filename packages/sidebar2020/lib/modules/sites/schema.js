import { makeAutocomplete } from "meteor/vulcan:core";
import { webringStatusOptions } from "../../modules/data.js";

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
    canUpdate: ["owners", "admins"],
    label: "Site Title",
  },

  url: {
    type: String,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    label: "Site URL",
  },

  feedUrl: {
    type: String,
    description: "The site's RSS feed URL",
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    label: "Feed URL",
  },

  twitterScreenName: {
    type: String,
    optional: true,
    description: "The Twitter account associated with the site, used to display an avatar",
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
  },

  twitterName: {
    type: String,
    optional: true,
    canRead: ["guests"],
    description:
      "The full Twitter display name of the account associated with the site",
  },

  twitterAvatarUrl: {
    type: String,
    optional: true,
    canRead: ["guests"],
    description:
      "The Twitter avatar URL of the account associated with the site",
  },

  userId: makeAutocomplete(
    {
      type: String,
      optional: true,
      canRead: ["guests"],
      canCreate: ["admins"],
      canUpdate: ["admins"],
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
