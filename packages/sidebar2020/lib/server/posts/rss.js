import RSS from "rss";
import {
  runGraphQL,
  getSetting,
  webAppConnectHandlersUse,
} from "meteor/vulcan:core";
import express from "express";
import get from "lodash/get";
import { postStatus } from "../../modules/data";

const feedUrl = "feed.xml";

const query = `
query rssPostsQuery($input: MultiPostInput) {
  posts(input: $input) {
    results {
      # posts
      _id
      title
      shortTitle
      url
      slug
      credit
      isSponsored
      twitterAvatarUrl
      twitterName

      postedAt

      pageUrl
      pagePath

      domain

      htmlBody

      # categories
      categories {
        _id
        name
        slug
        pagePath
      }
    }
  }
}
`;

const getMeta = () => {
  const siteUrl = getSetting("siteUrl", Meteor.absoluteUrl());
  return {
    title: getSetting("title"),
    description: getSetting("tagline"),
    feed_url: siteUrl + feedUrl,
    site_url: siteUrl,
    image_url: siteUrl + "img/favicon.png",
  };
};

export const servePostRSS = async () => {
  const feed = new RSS(getMeta());

  const results = await runGraphQL(
    query,
    {
      input: {
        filter: { status: { _eq: postStatus.published } },
        sort: { postedAt: "desc" },
        limit: 20,
      },
    },
    {},
    { useCache: true, key: 'rss' }
  );
  const posts = get(results, "data.posts.results", []);

  posts.forEach((post) => {
    const { title, htmlBody, credit, postedAt, _id, url } = post;
    const feedItem = {
      title,
      description: htmlBody + "<br/><br/>",
      date: postedAt,
      guid: _id,
      url,
    };
    if (credit) {
      feedItem.author = `@${credit}`;
    }
    feed.item(feedItem);
  });

  return feed.xml();
};

const app = express();

app.set("json spaces", 2); // number of spaces for indentation

app.get(`/${feedUrl}`, async function (req, res) {
  res.status(200).send(await servePostRSS());
});

webAppConnectHandlersUse(Meteor.bindEnvironment(app), {
  name: "inquiries_endpoint",
  order: 200,
});
