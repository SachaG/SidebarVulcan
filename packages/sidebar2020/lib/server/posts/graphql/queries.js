import {
  addGraphQLSchema,
  addGraphQLQuery,
  addGraphQLResolvers,
  nodeCache,
  runGraphQL,
} from "meteor/vulcan:core";
import Posts from "../../../modules/posts/collection";
import moment from "moment";
import get from "lodash/get";
import { postStatus } from "../../../modules/data";

const numberOfDates = 10;

const availableDateType = `
type AvailableDate {
  label: String
  value: Date
}`;

const availableSponsorshipDates = async (root, args, context) => {
  const futureSponsoredPosts = Posts.find({
    sponsored: true,
    isFuture: true,
  }).fetch();
  const mSponsoredDates = futureSponsoredPosts.map(({ postedAt }) =>
    moment(postedAt)
  );

  // get next N available dates
  let weekNumber = 0;
  let mAvailableDates = [];
  while (mAvailableDates.length < numberOfDates) {
    // define bounds of the current week
    const mMonday = moment().day(1 + weekNumber * 7);
    const mSunday = moment().day(0 + weekNumber * 8);
    // get all sponsored posts for the current week
    const mWeekSponsoredDates = mSponsoredDates.filter(
      (date) => date >= mMonday.toDate() && date <= mSunday.toDate()
    );
    if (mWeekSponsoredDates.length === 0) {
      // if week is available, add Monday to availableDates array
      mAvailableDates.push(mMonday);
    }
    weekNumber++;
  }

  const availableDates = mAvailableDates.map((m) => ({
    label: m.format("MMMM D, YYYY"),
    value: m.toDate(),
  }));
  return availableDates;
};

addGraphQLSchema(availableDateType);
addGraphQLQuery(`availableSponsorshipDates: [AvailableDate]`);
addGraphQLResolvers({ Query: { availableSponsorshipDates } });

const leaderboards = async () => {
  let domains, users;

  const cachedDomains = nodeCache.get("domains");
  if (cachedDomains) {
    domains = cachedDomains;
  } else {
    domains = await Posts.rawCollection()
      .aggregate([
        {
          $match: {
            domain: { $ne: null },
            status: { $in: [postStatus.published] },
          },
        },
        {
          $group: {
            _id: "$domain",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 100 },
      ])
      .toArray();
    nodeCache.set("domains", domains);
  }

  const cachedUsers = nodeCache.get("users");
  if (cachedUsers) {
    users = cachedUsers;
  } else {
    users = await Posts.rawCollection()
      .aggregate([
        {
          $match: {
            userId: { $ne: null },
            status: { $in: [postStatus.published] },
          },
        },
        {
          $group: {
            _id: "$userId",
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $match: {
            user: { $exists: true, $ne: [] },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 100 },
      ])
      .toArray();

    nodeCache.set("users", users);
  }

  const usersArray = users.map((item) => {
    const user = item.user[0];
    return {
      count: item.count,
      displayName: user.displayName,
      twitterScreenName:
        user.twitterScreenName || get(user, "services.twitter.screenName"),
      avatarUrl:
        user.avatarUrl || get(user, "services.twitter.profile_image_url_https"),
    };
  });
  return {
    domains,
    users: usersArray,
  };
};

addGraphQLQuery(`leaderboards: JSON`);
addGraphQLResolvers({ Query: { leaderboards } });

const homepagePostsQuery = `
query homepagePosts($input: MultiPostInput) {
  posts(input: $input) {
    results {
      ...PostFragment
      __typename
    }
    totalCount
    __typename
  }
}
fragment PostFragment on Post {
  _id
  title
  shortTitle
  url
  urlRedirect
  slug
  credit
  twitterAvatarUrl
  twitterName
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
  isSponsored
  discountCode
  discountAmount
  sponsorshipPrice
  paidAt
  paidAtFormatted
  userId
  user {
    ...UserFragment
    __typename
  }
  categoriesIds
  categories {
    ...CategoryFragment
    __typename
  }
  newsletters {
    _id
    createdAt
    createdAtFormatted
    sentAt
    subject
    __typename
  }
  __typename
}
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
  __typename
}
fragment CategoryFragment on Category {
  _id
  name
  slug
  pagePath
  __typename
}
`;
const postCount = 35;

const homepagePosts = async (root, args, context) => {
  const input = {
    limit: postCount,
    filter: { status: { _in: [postStatus.published] } },
    sort: { postedAt: "desc" },
    enableCache: true,
  };
  const results = await runGraphQL(
    homepagePostsQuery,
    { input },
    {},
    { useCache: true, key: "homepage" }
  );
  return results.data.posts.results;
};

addGraphQLQuery(`homepagePosts: [JSON]`);
addGraphQLResolvers({ Query: { homepagePosts } });
