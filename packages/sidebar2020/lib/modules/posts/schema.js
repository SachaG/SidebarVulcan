/*

Posts schema

*/

import Users from "meteor/vulcan:users";
import { Utils, makeAutocomplete } from "meteor/vulcan:core";
import marked from "marked";
import { postStatusOptions } from "../data.js";
import { removeAtSymbol, getDefaultStatus } from "./helpers.js";
import get from "lodash/get";
import UrlInput from "../../components/posts/UrlInput";
import ScheduledAtInput from "../../components/posts/ScheduledAtInput";

const isOwnerOrAdmin = (user, document) =>
  Users.owns(user, document) || Users.isAdmin(user);

const formGroups = {
  sponsorship: {
    name: "sponsorship",
    order: 2,
  },
  admin: {
    name: "admin",
    order: 3,
  },
};

/**
 * @summary Posts schema
 * @type {Object}
 */
export const schema = {
  /*
    ID
  */
  _id: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },

  /*
    Timetstamp of post creation
  */
  createdAt: {
    type: Date,
    description: "Timetstamp of post creation",
    optional: true,
    canRead: ["guests"],
    orderable: true,
    onCreate: () => {
      return new Date();
    },
  },

  /*
    Timestamp of post being actually published
  */
  postedAt: {
    type: Date,
    description:
      "Timestamp of post first appearing on the site (i.e. being approved)",
    optional: true,
    canRead: ["guests"],
    // canCreate: ["admins"],
    canUpdate: ["admins"],
    input: "datetime",
    sortable: true,
    group: formGroups.admin,
    onCreate: ({ data }) =>
      data.scheduledAt ? data.scheduledAt : new Date(),
  },

  /**
    Used to keep track of when a sponsor would like a post to be published
  */
  scheduledAt: {
    type: Date,
    optional: true,
    canRead: ["owners", "admins"],
    canCreate: ["members", "admins"],
    canUpdate: ["owners", "admins"],
    input: ScheduledAtInput,
    label: "Scheduled For",
    query: `
    query AvailableDatesQuery {
      availableSponsorshipDates{
        value
        label
      }
    }
    `,
    options: (props) => get(props, "data.availableSponsorshipDates", []),
    order: 50,
    description:
      "Note: if no date displayed here works for you, please pick the closest suitable date and contact us afterwards to change it to your desired date.",
  },

  /**
    Used to keep track of when a post has been included in a newsletter
  */
  sentAt: {
    type: Date,
    optional: true,
    canRead: ["admins"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
    group: formGroups.admin,
  },

  /**
    URL
  */
  url: {
    type: String,
    optional: false,
    max: 200,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    input: UrlInput,
    label: "URL",
    order: 10,
    searchable: true,
  },

  domain: {
    type: String,
    optional: true,
    canRead: ["guests"],
    onCreate: ({ data }) => data.url && Utils.getDomain(data.url),
    onUpdate: ({ data }) => data.url && Utils.getDomain(data.url),
  },

  /**
    Title
  */
  title: {
    type: String,
    optional: false,
    max: 80,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    input: "text",
    order: 20,
    searchable: true,
  },
  /**
    Credit
  */
  credit: {
    type: String,
    optional: true,
    max: 20,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    input: "text",
    order: 35,
    searchable: true,
    onCreate: ({ data }) => data.credit && removeAtSymbol(data.credit),
    onUpdate: ({ data }) => data.credit && removeAtSymbol(data.credit),
    description:
      "The Twitter username of the individual (or organization) that will receive credit for the resource being linked to.",
  },

  twitterName: {
    type: String,
    optional: true,
    canRead: ["guests"],
    description: "The full Twitter display name of the credited user",
  },

  twitterAvatarUrl: {
    type: String,
    optional: true,
    canRead: ["guests"],
    description: "The Twitter avatar URL of the credited user",
  },

  /**
    Slug
  */
  slug: {
    type: String,
    optional: true,
    canRead: ["guests"],
    onCreate: ({ data }) => {
      return Utils.slugify(data.title);
    },
    onUpdate: ({ data }) => {
      if (data.title) {
        return Utils.slugify(data.title);
      }
    },
  },
  /**
    Post body (markdown)
  */
  body: {
    type: String,
    optional: false,
    max: 150,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    input: "textarea",
    description: "Markdown accepted.",
    order: 30,
  },
  /**
    HTML version of the post body
  */
  htmlBody: {
    type: String,
    optional: true,
    canRead: ["guests"],
    onCreate: ({ data }) => {
      if (data.body) {
        return Utils.sanitize(marked(data.body));
      }
    },
    onUpdate: ({ data }) => {
      if (data.body) {
        return Utils.sanitize(marked(data.body));
      }
    },
  },

  // /**
  //  Post Excerpt
  //  */
  // excerpt: {
  //   type: String,
  //   optional: true,
  //   canRead: ['guests'],
  //   searchable: true,
  //   onCreate: ({document: post}) => {
  //     if (post.body) {
  //       return Utils.trimHTML(Utils.sanitize(marked(post.body)), excerptLength);
  //     }
  //   },
  //   onUpdate: ({ data }) => {
  //     if (data.body) {
  //       return Utils.trimHTML(
  //         Utils.sanitize(marked(data.body)),
  //         excerptLength
  //       );
  //     }
  //   },
  // },

  /**
    Count of how many times the post's link was clicked
  */
  clickCount: {
    type: Number,
    optional: true,
    canRead: ["admins"],
    defaultValue: 0,
    sortable: true,
  },
  /**
    The post's status.
  */
  status: {
    type: Number,
    optional: true,
    canRead: ["guests"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
    input: "radiogroup",
    onCreate: ({ data, currentUser }) =>
      getDefaultStatus(data, currentUser),
    options: postStatusOptions,
    group: formGroups.admin,
  },
  /**
    Whether a post is scheduled in the future or not
  */
  isFuture: {
    type: Boolean,
    optional: true,
    canRead: ["guests"],
    onCreate: ({ data }) => {
      // Set the post's isFuture to true if necessary
      if (data.postedAt) {
        const postTime = new Date(data.postedAt).getTime();
        const currentTime = new Date().getTime() + 1000;
        return postTime > currentTime; // round up to the second
      }
    },
    onUpdate: ({ data, document: post }) => {
      // Set the post's isFuture to true if necessary
      if (data.postedAt) {
        const postTime = new Date(data.postedAt).getTime();
        const currentTime = new Date().getTime() + 1000;
        if (postTime > currentTime) {
          // if a post's postedAt date is in the future, set isFuture to true
          return true;
        } else if (post.isFuture) {
          // else if a post has isFuture to true but its date is in the past, set isFuture to false
          return false;
        }
      }
    },
  },

  /**
    Save info for later spam checking on a post. We will use this for the akismet package
  */
  userIP: {
    type: String,
    optional: true,
    canRead: ["admins"],
  },
  userAgent: {
    type: String,
    optional: true,
    canRead: ["admins"],
  },
  referrer: {
    type: String,
    optional: true,
    canRead: ["admins"],
  },

  /**
    The post author's `_id`.
  */
  userId: makeAutocomplete(
    {
      type: String,
      optional: true,
      input: "select",
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

  newsletters: {
    type: Object,
    optional: true,
    canRead: ["guests"],
    // see server field definition
  },

  shortTitle: {
    type: String,
    optional: true,
    canCreate: ["admins"],
    canUpdate: ["admins"],
    canRead: ["guests"],
    group: formGroups.admin,
    input: "text",
  },

  categoriesIds: makeAutocomplete(
    {
      type: Array,
      arrayItem: {
        type: String,
        optional: true,
      },
      label: "Categories",
      optional: true,
      canCreate: ["members"],
      canUpdate: ["owners", "admins"],
      canRead: ["guests"],
      relation: {
        fieldName: "categories",
        typeName: "[Category]",
        kind: "hasMany",
      },
      order: 45,
      description: "You can pick up to three categories.",
    },
    { autocompletePropertyName: "name" }
  ),

  /*

  Sponsorships

  */

  isSponsored: {
    type: Boolean,
    input: "checkbox",
    optional: true,
    defaultValue: false,
    canCreate: ["members"],
    canUpdate: ["admins"],
    canRead: ["guests"],
    group: formGroups.sponsorship,
    // defaultValue doesn't seem to work with "false" so use onCreate instead
    onCreate: ({ data }) => data.isSponsored || false,
  },

  discountCode: {
    type: String,
    label: "Discount Code",
    optional: true,
    canCreate: ["members"],
    canUpdate: ["admins"],
    canRead: isOwnerOrAdmin,
    input: "statictext",
    group: formGroups.sponsorship,
  },

  discountAmount: {
    type: String,
    label: "Discount Amount",
    optional: true,
    canRead: isOwnerOrAdmin,
    canUpdate: ["admins"],
    group: formGroups.sponsorship,
  },

  sponsorshipPrice: {
    type: Number,
    optional: true,
    canRead: isOwnerOrAdmin,
    canCreate: ["admins"],
    canUpdate: ["admins"],
    group: formGroups.sponsorship,
  },

  paidAt: {
    type: Date,
    optional: true,
    canRead: isOwnerOrAdmin,
    canUpdate: ["admins"],
    input: "datetime",
    group: formGroups.sponsorship,
  },

  tweetedAt: {
    type: Date,
    optional: true,
  },

  chargeIds: {
    type: Array,
    arrayItem: {
      type: String,
      optional: true,
    },
    optional: true,
  },

  webringSiteId: {
    type: String,
    optional: true,
    canRead: ["guests"],
    relation: {
      fieldName: "webringSite",
      typeName: "WebringSite",
      kind: "hasOne",
    }
  }

};
