import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment CategoryFragment on Category {
    _id
    name
    slug
    pagePath
  }
`);