import { registerFragment } from "meteor/vulcan:core";

registerFragment(/* GraphQL */ `
  fragment UrlFragment on UrlMetadata {
    author
    title
    description
    image
    publisher
    url
    twitter
  }
`);

registerFragment(/* GraphQL */ `
  fragment PostFragment on Post {
    # posts
    _id
    title
    shortTitle
    url
    urlRedirect
    slug
    credit
    twitterAvatarUrl
    twitterName

    webringSiteId
    webringSite {
      title
    }

    postedAt
    postedAtFormatted(format: "YYYY/MM/DD")
    postedAtDate: postedAtFormatted(format: "YYYYMMDD")
    postedAtDateStamp: postedAtFormatted(format: "MM/DD")
    postedAtWeekdayStamp: postedAtFormatted(format: "dddd")
    postedAtMonth: postedAtFormatted(format: "MMMM")
    postedAtDayOfMonth: postedAtFormatted(format: "D")
    postedAtDayOfMonth2: postedAtFormatted(format: "Do")

    createdAt
    createdAtFormatted

    scheduledAt
    scheduledAtFormatted

    sentAt
    sentAtFormatted
    status

    pageUrl
    pagePath

    domain

    body
    htmlBody

    clickCount

    # sponsorships
    isSponsored
    discountCode
    discountAmount
    sponsorshipPrice
    paidAt
    paidAtFormatted

    # users
    userId
    user {
      ...UserFragment
    }

    # categories
    categoriesIds
    categories {
      ...CategoryFragment
    }

    newsletters {
      _id
      createdAt
      createdAtFormatted
      sentAt
      # sentAtFormatted
      subject
    }
  }
`);
