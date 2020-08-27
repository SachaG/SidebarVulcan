/*

Categories schema

*/

import { Utils } from "meteor/vulcan:core";
import { Categories } from "./collection.js";
import { getCategoryPageLink } from "./helpers";

// category schema
export const schema = {
  _id: {
    type: String,
    canRead: ["guests"],
    optional: true,
  },
  name: {
    type: String,
    canRead: ["guests"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
    searchable: true,
  },
  description: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
    searchable: true,
  },
  slug: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
    onCreate: ({ document: category }) => {
      // if no slug has been provided, generate one
      const slug = category.slug || Utils.slugify(category.name);
      return Utils.getUnusedSlug(Categories, slug);
    },
    onUpdate: ({ data, oldDocument: category }) => {
      // if slug is changing
      if (data.slug && data.slug !== category.slug) {
        return Utils.getUnusedSlug(Categories, data.slug);
      }
    },
  },
};

export const apiSchema = {
  pagePath: {
    typeName: "String",
    resolver: (category) => getCategoryPageLink(category, false),
  },

  pageUrl: {
    typeName: "String",
    resolver: (category) => getCategoryPageLink(category, true),
  },
};
