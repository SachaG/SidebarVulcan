import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment UserFragment on User {
    _id
    slug
    username
    displayName
    emailHash
    avatarUrl
    pagePath
    pageUrl
    twitterScreenName
    twitterName
    email
  }
`);