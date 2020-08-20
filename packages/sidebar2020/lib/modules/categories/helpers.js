import { getSetting } from 'meteor/vulcan:core';

export const getCategoryPageLink = (category, isAbsolute = false) => {
  return `${isAbsolute ? getSetting("siteUrl") : ""}/category/${
    category.slug
  }/${category._id}`;
};
