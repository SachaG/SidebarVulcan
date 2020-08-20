import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment JobFragment on Job {

    _id
    createdAt
    company
    url
    title
    body
    htmlBody
    thumbnailUrl
    paidAt
    archivedAt
    coupon

    # users
    user {
      ...UserFragment
    }

  }
`);