import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment ChargeFragment on Charge {
    _id
    createdAt
    createdAtFormatted(format: "dddd, MMMM Do YYYY")
    createdAtFormattedShort: createdAtFormatted(format: "YYYY/MM/DD, hh:mm")
    user{
      _id
      slug
      username
      displayName
      pageUrl
      pagePath
      emailHash
      avatarUrl
    }
    type
    source
    productKey
    test
    associatedCollection
    associatedId

    associatedDocument{
      ... on Post {
        ...PostFragment
      }
      ... on Job {
        ...JobFragment
      }
    }

    amount
    properties
    stripeId
    stripeChargeUrl
  }
`);