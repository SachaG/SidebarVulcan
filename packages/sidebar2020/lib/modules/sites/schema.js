import { makeAutocomplete } from "meteor/vulcan:core";
import { webringStatus, webringStatusOptions } from "../../modules/data.js";
import Users from "meteor/vulcan:users";
import get from "lodash/get";
import sample from "lodash/sample";
// import { addHash, stripHash } from "../helpers.js";

export const getDefaultStatus = (site, user) => {
  if (!user) {
    return webringStatus.pending;
  }
  if (Users.isAdmin(user)) {
    if (site.status) {
      return site.status;
    } else {
      return webringStatus.published;
    }
  } else {
    return webringStatus.pending;
  }
};

export const generateCode = (length = 4) => {
  const letters = [..."abcdefghijklmnopqrstuvwyxz"];
  const code = Array.from(Array(length))
    .map(() => sample(letters))
    .join("");
  return code;
};

export default {
  _id: {
    type: String,
    canRead: ["guests"],
    optional: true,
  },

  createdAt: {
    type: Date,
    optional: true,
    canRead: ["guests"],
    orderable: true,
    onCreate: () => {
      return new Date();
    },
    onUpdate: ({ document }) => {
      if (!document.createdAt) {
        return new Date();
      }
    },
  },

  url: {
    type: String,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    label: "Site URL",
  },

  title: {
    type: String,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    label: "Site Title",
  },

  description: {
    type: String,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    input: "textarea",
    max: 150,
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
    description:
      "The Twitter account associated with the site, used to display an avatar",
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
    defaultValue: webringStatus.pending,
    onCreate: ({ data, currentUser }) => getDefaultStatus(data, currentUser),
    options: webringStatusOptions,
  },

  code: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
    onCreate: () => generateCode(),
    onUpdate: ({ document }) =>
      document.code ? document.code : generateCode(),
  },

  // color: {
  //   type: String,
  //   label: "Banner Color",
  //   optional: true,
  //   canRead: ["guests"],
  //   canCreate: ["admins"],
  //   canUpdate: ["admins"],
  //   description:
  //     'HTML hexadecimal color code (including the "#"). Defaults to #f36c3d',
  //   onCreate: ({ data }) => addHash(data.color),
  //   onUpdate: ({ data }) => addHash(data.color),
  // },
};
