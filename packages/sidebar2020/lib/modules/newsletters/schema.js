import { newsletterStatusOptions } from "../data.js";
import { makeAutocomplete } from "meteor/vulcan:core";

export const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ["guests"],
    onCreate: () => {
      return new Date();
    },
  },

  subject: {
    type: String,
    optional: false,
    canRead: ["guests"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
    input: "text",
    order: 20,
  },

  message: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
    input: "textarea",
    order: 30,
  },

  html: {
    type: String,
    optional: true,
    canRead: ["guests"],
    input: "textarea",
  },

  provider: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },

  data: {
    type: Object,
    optional: true,
    canRead: ["guests"],
    input: "textarea",
  },

  status: {
    type: Number,
    optional: true,
    canRead: ["guests"],
    // canCreate: ["admins"],
    canUpdate: ["admins"],
    input: "radiogroup",
    onCreate: ({ document }) => {
      if (!document.status) {
        return 1;
      }
    },
    options: newsletterStatusOptions,
  },

  sentAt: {
    type: Date,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    input: "datetime",
  },

  error: {
    type: Object,
    optional: true,
    canRead: ["admins"],
  },

  postsIds: makeAutocomplete(
    {
      type: Array,
      arrayItem: {
        type: String,
        optional: true,
      },
      label: "Posts",
      canRead: ["admins"],
      canCreate: ["admins"],
      canUpdate: ["admins"],
      optional: true,
      relation: {
        fieldName: "posts",
        typeName: "[Post]",
        kind: "hasMany",
      },
    },
    { autocompletePropertyName: "title" }
  ),
};

export const apiSchema = {};
