import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment NewsletterFragment on Newsletter {

    _id
    createdAt
    createdAtFormatted
    sentAt
    message
    status
    
    postsIds
    posts{
      ...PostFragment
    }

    html
    data
    subject

    error

  }
`);

registerFragment(/* GraphQL */`
  fragment NewsletterResponseFragment on NewsletterResponse {
    email
    success
    error
  }
`)